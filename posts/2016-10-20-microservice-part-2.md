---

title: Building a RESTful API in go
author: Ryan Neal
image: /img/blog/sleeping-jake.png
format: blog
short_title: Adding a RESTful API to a microservice
description: "RESTful APIs are great, adding them is simple too!"
thumbnail: /img/posts/thumbnails/sleeping-jake.png
cmsUserSlug: microservice-restful-api
date: 2016-10-20
tags:
  - tutorial
  - go
  - series
  - code
---
# Microservice series: RESTful API

This is a continuation of a series on building out a microservice in Golang. It builds on the [seltzer project](https://github.com/rybit/seltzer) created in [part 1](https://www.netlify.com/blog/2016/09/06/creating-a-microservice-boilerplate-in-go/) of this series. In part one, we laid in the code structure for commands, configuration and logging. For this article we are going to add a simple REST API that uses JWT tokens for authentication.


> Want to see what it looks like at the end? checkout https://github.com/rybit/seltzer

I will be using the [echo](https://github.com/labstack/echo) project for the web server and then adding some simple tests to validate my assumptions. I will be adding 3 endpoints:

    /info   - gives some information about the service
    /login  - issues a JWT token with the claims
    /echo   - validates the JWT token and dumps it back

We will be JSON for our exchange format. We will also add in a Dockerfile and Makefile that will make this easy to deploy.

# Adding in Echo

We use glide for dependency management so the first step is to add echo with glide.


    glide get github.com/labstack/echo

I choose to lock the version very tightly, so no ranges. We are using version 2.1.

Next, we are going to start building the `api` package. Naturally, the main class will called `API` and contain all the pertinent information the API might need later.

``` go
type API struct {
    log    *logrus.Entry
    config *conf.Config
    echo   *echo.Echo
}
```

We will also be adding a `NewAPI`, `Stop()`, and `Start()` methods. They do what you'd think they do. Start and stop are pass through methods to the internal `echo` instance which manages the http listener on our behalf.

# Setting up the API plumbing

We will be adding in endpoints, starting with a simple info endpoint. During this process we will solve problems around (1) traceability via logging and (2) error handling. After that we can easily add new endpoints.

``` go
func NewAPI(log *logrus.Entry, config *conf.Config) *API {
    // create the api
    api := &API{
        config: config,
        log:    log.WithField("component", "api"),
    }

    // add the endpoints
    e := echo.New()
    e.Get("/info", api.Info)

    api.echo = e

    return api
}
```

We added an `Info` method to the API to have it respond to the request properly. This method's job is to simply return a JSON map with a little meta information. We will be adding in the version information a little later.

``` go
func (api *API) Info(ctx echo.Context) error {
    return ctx.JSON(http.StatusOK, map[string]string{
        "description": "a boiler plate project",
        "name":        "seltzer",
    })
}
```

Echo uses a small wrapper around [golang's context](https://golang.org/pkg/context/). It mostly allows for returning error codes as appropriate. We will be adding a middleware that will populate the context a little later. We use the `ctx.JSON()` to return information because that will serialize the object and set the appropriate headers which will stop us from having to write that same simple method.

## Configuring request logging

Here is where we'll want to have a simple 'starting' and 'finished' statements for each request. We will do this via a custom middleware that generate a UUID for each request. This way we can easily grep the logs later. To do this we will write a custom middleware that will generate a UUID, set it on the logger and then add that to the context.

``` go
func (api *API) setupRequest(f echo.HandlerFunc) echo.HandlerFunc {
  // return a HandlerFunc
  return func(ctx echo.Context) error {
    req := ctx.Request()
    // add some default fields to the logger ~ on all messages
    logger := api.log.WithFields(logrus.Fields{
      "method":     req.Method(),
      "path":       req.URL().Path(),
      "request_id": uuid.NewRandom().String(),
    })
    ctx.Set(loggerKey, logger)
    startTime := time.Now()

    defer func() {
      rsp := ctx.Response()
      // at the end we will want to log a few more interesting fields
      logger.WithFields(logrus.Fields{
        "status_code":  rsp.Status(),
        "runtime_nano": time.Since(startTime).Nanoseconds(),
      }).Info("Finished request")
    }()

    // now we will log out that we have actually started the request
    logger.WithFields(logrus.Fields{
      "user_agent":     req.UserAgent(),
      "content_length": req.ContentLength(),
    }).Info("Starting request")

    err := f(ctx)
    if err != nil {
      ctx.Error(err)
    }

    return err
  }
}
```

In this method we will write a start message and defer a stop message after the function is called. We also pull the request and response directly from the context ~ assuring they're already set. Also, we put a logger into the context so that we can access it in the subsequent requests.

We are using logrus's logger over labstack's because of the hook capabilities and the `WithFields` semantics. We want to have access to these logs later, shipping them off the server directly. More on this in future pieces, or checkout the the [elastinats project](https://github.com/netlify/elastinats)!

We also want to have the echo generated logs, in order to couple the two logger implementations we have to add a simple wrapper struct. The only significant difference is that labstack's logger has methods like `Printj(log.JSON)`. These are convenience methods to log `map[string]interface{}`.

The wrapper simply re-routes those methods through the corresponding method as such:

``` go
func (w wrapper) Printj(json log.JSON) {
    w.Printf("%v", json)
}
```

and then in the `NewAPI` call we add the code below to install logrus into echo.

``` go
e.SetLogger(wrapper{api.log})
```

After writing the middleware we need to install it on a path. We are going to install it at the root so every request has access to the logger. In `NewAPI` we add:

``` go
e.Use(api.setupRequest)
```

## Custom Error Handler

We don't want to break from the JSON format in the API, so we will add a custom error handler that will wrap the errors in a simple error structure.

``` go
type HTTPError struct {
  Code int
  Message string
}
```

For simplicity, I will just use the `HTTPError` in echo. The job of my custom handler will be to take all errors and push them to this structure. If it is a known http error we will use the code, otherwise we will mark it with an internal server error and give it a generic error message. This is to stop leaking any internal information.

``` go
func (api *API) handleError(err error, ctx echo.Context) {
    httpErr, ok := err.(*echo.HTTPError)
    if ok {
        ctx.JSON(httpErr.Code, httpErr)
    } else {
        getLogger(ctx).WithError(err).Warn("Unexpected non http error")
        ctx.JSON(http.StatusInternalServerError, &echo.HTTPError{
            Code:    http.StatusInternalServerError,
            Message: "Internal server error",
        })
    }
}
```

If an endpoint wants to send an internal server error with a better method they can just return an error. Typically, those will be something using the convenience methods in the echo package:


    return echo.NewHTTPError(http.StatusBadRequest, "Must provide both email and password")
# Testing the server

Now that we have a simple single endpoint let's write the test framework that will let us, well, test our server. The strategy will be to use a `TestMain` to start a running instance of the server and then other tests can reliably access that server. This will let us test that we have the URLs configured properly, middleware in the right places, and parse the responses correctly. This means that we will have a convenient helper method `request`:

``` go
func request(t *testing.T, method, path string, body interface{}) (int, string) {
    req := test.NewRequest(method, path, nil)

    if body != nil {
        bs, err := json.Marshal(body)
        if err != nil {
            assert.FailNow(t, "failed to serialize request body: "+err.Error())
        }

        req = test.NewRequest(method, path, bytes.NewBuffer(bs))
    req.Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
    }

    rsp := test.NewResponseRecorder()
    api.echo.ServeHTTP(req, rsp)
    return rsp.Status(), rsp.Body.String()
}
```

This will help us to simply query the endpoints via echo. It enables writing our first test for the info endpoint.

``` go
func TestInfoEndpoint(t *testing.T) {
    code, body := request(t, "GET", "/info", nil)
    if assert.Equal(t, http.StatusOK, code) {
      raw := extractRawPayload(t, body) // pulls the body into a map[string]interface{}
      assert.NotEmpty(t, raw["version"])
      assert.NotEmpty(t, raw["description"])
      assert.NotEmpty(t, raw["name"])
  }
}
```

Now that this works, we can reliably move onto adding more endpoints and middleware knowing we have a sane starting point. If you look in the `api_test.go` you'll see there are a few other sanity check tests added (e.g. `TestMissingEndpoint`).

The downside is that it introduces shared state amongst tests. In this simple project that isn't an issue, but it is something you'll want to consider as you add complexity. It is possible to start and shutdown the server each time, but I find that tedious and slow.

If you're going to use a DB connection with the API, it is best to setup and teardown state with each test. That way you contain your expectations (e.g. this user exists) within the same scope of the test. This can be a pain, but it is just about building up a good collection of helper methods. If you're curious what this looks like in production checkout the [netlify-subscriptions test suite](https://github.com/netlify/netlify-subscriptions/blob/master/api/api_test.go).

# Interacting with the JWT token

We are going to write two endpoints, one to create a JWT token and the other to just print that token. The second one will require the token to be present. Usually the endpoint to issue the token (e.g. /login) will do a lookup to validate the user/password. That is left as an exercise for the user.
JWT tokens operate on a json body that you can configure. In our case we will use [dgrijalva's library](https://github.com/dgrijalva/jwt-go) and extend the standard claims.

``` go
type JWTClaims struct {
    jwt.StandardClaims
    UserID string   `json:"user_id"`
    Email  string   `json:"email"`
    Groups []string `json:"groups"`
}

func (c JWTClaims) Valid() error {
    if err := c.StandardClaims.Valid(); err != nil {
        return err
    }

    if c.UserID == "" {
        return errors.New("Must provide a user ID")
    }

    return nil
}
```

Then we need to add the secret key to the configuration.

``` go
//  in conf/config.go
type Config struct {
  JWTSecret string        `json:"jwt_secret"`
  // ...
}
```

## Using the JWT middleware

Echo has a simple to use [JWT middleware](https://echo.labstack.com/middleware/jwt). We are going to configure this with our private key, to put it in a known location in the context, and then to create our `JWTClaims`.

``` go
requireClaims := middleware.JWTWithConfig(middleware.JWTConfig{
  SigningMethod: jwt.SigningMethodHS256.Name,
  ContextKey:    tokenKey,
  Claims:        &JWTClaims{},
  SigningKey:    []byte(config.JWTSecret),
})
```

We will then create the two endpoints for interacting with the JWT token.

``` go
// in NewAPI
e.Post("/login", api.generateToken)
e.Get("/echo", api.dumpToken, requireClaims)
```

Next, let's look into implementing those two methods `generateToken` and `dumpToken`. Both of them use the same signature as the `Info` method: `func(ctx echo.Context) error`.

## Generating a new JWT token

To generate a token we will need access to the private key, this lives in the config on the API. We will require a JSON payload of the user email and some password. This endpoint is meant *only* to be used as an example. It will issue arbitrary tokens for your system.

``` go
type TokenRequest struct {
    Email string `json:"email"`
    Pass  string `json:"pass"`
}
```

First we will use the `Bind` method from echo to try and parse out the payload. It will check the Content-Type header and then the tags from the struct. We only support JSON. The steps for creating a token are pretty straight forward. We also tossed some good debug logging in there too.

``` go
func (api *API) generateToken(ctx echo.Context) error {
    payload := new(TokenRequest)
    if err := ctx.Bind(payload); err != nil {
        return err
    }
  log := getLogger(ctx)

    // validate the payload
    if payload.Email == "" || payload.Pass == "" {
    log.WithFields(logrus.Fields{
      "missing_password": payload.Pass == "",
      "missing_email": payload.Email == "",
    }).Info("Missing parameters in request")
        return echo.NewHTTPError(http.StatusBadRequest, "Must provide both email and password")
    }
    log.Debug("Starting to issue a new token for a valid request")

    // we have a good payload ~ generate a token
    claims := &JWTClaims{
        UserID: uuid.NewRandom().String(),
        Email:  payload.Email,
    }

    // create a token with our secret key
    signed, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(api.config.JWTSecret))
    if err != nil {
      log.WithError(err).Warn("Failed to create a token")
        return echo.NewHTTPError(http.StatusInternalServerError, "Failed to create a token")
    }

    log.Debug("Created a token successfully")
    return ctx.JSON(http.StatusCreated, &TokenResponse{Key: signed})
}
```

Now when you hit this endpoint you'll get back a valid token.

``` sh
$ curl  -X POST -H "Content-Type: application/json" \
        -d '{"email": "marp@marp.com", "pass": "this-is-a-secret"}' \
        localhost:9000/login
{"key":"long-encoded-string"}
```

Again, that endpoint is a reference implementation. **Please, please****,**** please, don't put that in production**.

Checkout [this little cli tool](https://github.com/rybit/jwt-generator) I tossed together for generating tokens for testing.

## Using the token

Now that we have a way to generate a tokens, it is time to see if we can parse them well. We installed the `requireClaims` middleware on the `/echo` endpoint. So it should be as simple as just curling with that token in the `Authorization` header.

The method to read and dump the claims is simple, but where your logic will actually end up living.

``` go
func (api *API) dumpToken(ctx echo.Context) error {
    log := getLogger(ctx)

    token := getToken(ctx)
    claims := token.Claims.(*JWTClaims)

  // dump some fields
    log.WithFields(logrus.Fields{
        "valid_token":      token.Valid,
        "id":               claims.Id,
        "user_id":          claims.UserID,
        "user_email":       claims.Email,
        "user_groups":      claims.Groups,
        "expires_at":       claims.ExpiresAt,
        "expires_at_human": time.Unix(claims.ExpiresAt, 0).String(),
    }).Info("JWT Token")

    log.Debug("Finished dumping token successfully")
    return nil
}
```

Then to test it you can use the token generated above.

``` sh
$ curl -H "Authorization: Bearer $token" localhost:9000/echo
```

If you look at the log you can see a corresponding message. This is a totally contrived example, but shows how you'd get access to the token. Once you have the claims you can add more methods to them to check for group membership, valid emails, etc.

# To TLS or not to TLS

You'll notice that this doesn't work over HTTPS. This is intentional for the moment. It makes it life way easier in development. For instance, using a middleware that will auto provision certs through Let's Encrypt is simple enough, but it can't use your local domain for certs. It won't work if you're building offline. The complexity of certs is something that I am choosing to use a proxy like nginx or caddy for while in production. There are definite trade-offs on performance, but they are fine for a simple API.

This should be enough to get a simple RESTful API off the ground. In the next two parts I will build on this project to add a messaging bus (nats.io) and websockets. Check out [part 1 ](https://www.netlify.com/blog/2016/09/06/creating-a-microservice-boilerplate-in-go/)for more information about setting up configuration!

Like the project? Find a bug? Join the discussion on [github](https://github.com/rybit/seltzer)!

