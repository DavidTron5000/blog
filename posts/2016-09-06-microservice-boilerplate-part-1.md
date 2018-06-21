---

title: Creating a Microservice Boilerplate in Go
author: Ryan Neal
image: /img/blog/lock.jpg
format: blog
short_title: Creating a Microservice Boilerplate in Go
description: "Microservices are great, they required a lot of rote code. Here is the template we use"
thumbnail: /img/posts/thumbnails/lock.jpg
cmsUserSlug: creating-a-boilerplate-for-for-a-microservice
date: 2016-09-06
tags:
  - tutorial
  - go
  - series
  - code
---
# Microservice series: Configuration

Microservice architectures have become a common way to design systems; they just require some rote code.

Following that single purpose model allows the system to grow organically, adding features as they make sense. These services often have a common structure; it is a lot of boiler plate code. In Go there are some frameworks, but generally they're very complicated. I am going to run through building up and using the boiler plate we use for our services.

The boiler plate is going to run through at a high level how we do configuration, commands, and logging. We will be leveraging [logrus](https://github.com/Sirupsen/logrus), [cobra](https://github.com/spf13/cobra), and [viper](https://github.com/spf13/viper) to build out an extensible template for a service.

> Wanna skip to the end? Check it out at https://github.com/rybit/config_example

The first step is to get the main going. We are going to do the difficult task of printing the config when we're all done. This will leave us in a good place when we're ready to make the service _actually_ do something!

The libraries you'll need are:

  - go get [github.com/spf13/cobra](https://github.com/spf13/cobra)
  - go get [github.com/spf13/viper](https://github.com/spf13/cobra)
  - go get [github.com/Sirupsen/logrus](https://github.com/Sirupsen/logrus)

## Starting at the Beginning

Lets first consider how we are going to structure this simple app. Generally, I use this structure:

``` shell
  - main.go            // the entry point of the app
  - conf/
    - config.go // where we will configure env vars, and the config file
    - logging.go       // where we will configure logging
  - cmd/
    - root_cmd.go      // where we will have the actual brains
    - // .... other commands ...
```

So let's go with that. Starting with main.go:

``` go
package main

import (
  "log"

  "github.com/rybit/config_example/cmd"
)

func main() {
  if err := cmd.RootCommand().Execute(); err != nil {
    log.Fatal(err)
  }
}
```

You'll notice that I made a call to the method `RootCommand()`. This is where I will setup the root command, adding in any subcommands that come up, and gathering the configuration. Next lets put a little placeholder in for that method.

``` go
package cmd

// this is cmd/root_cmd.go

import (
  "fmt"
  "log"

  "github.com/rybit/config_example/conf"
  "github.com/spf13/cobra"
)

// RootCommand will setup and return the root command
func RootCommand() *cobra.Command {
  rootCmd := cobra.Command{
    Use: "example",
    Run: run,
  }

  // this is where we will configure everything!
  rootCmd.Flags().IntP("port", "p", 0, "the port to do things on")

  return &rootCmd
}

func run(cmd *cobra.Command, args []string) {
  fmt.Println("--- here ---")
}
```

Now this should be enough to get us started. Just run `go run main.go` from your terminal.

## Adding in Some Configuation

The next phase will be to add in configuration. We are going to want to use a config file, command line args, and then environment variables. We want them to have that hierarchy as well. Luckily, the cobra and viper libraries are made to do this exact thing. We are going to want that configuration in a struct, but that will be the last step.

Let's start by creating and calling a method to load that configuration.

``` go
func LoadConfig(cmd *cobra.Command) error {
  // TODO
  return nil
}

// in cmd/root_cmd.go
func run(cmd *cobra.Command, args []string) {
  err := conf.LoadConfig(cmd)
  if err != nil {
    log.Fatal("Failed to load config: " + err.Error())
  }

  fmt.Printf("+%v\n", config)
}
```

Now we need to do the heavy lifting. We are going to add a few pieces to the load method.

``` go
// NOTE: the order of these blocks doesn't matter, the hierarchy is handled by the viper library

// from the command itself
if err := viper.BindPFlags(cmd.Flags()); err != nil {
  return nil, err
}

// from the environment
viper.SetEnvPrefix("NETLIFY")
viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
viper.AutomaticEnv()

// from a config file
viper.SetConfigName("config")
viper.AddConfigPath("./")
viper.AddConfigPath("$HOME/.example")

// NOTE: this will require that you have config file somewhere in the paths specified. It can be reading from JSON, TOML, YAML, HCL, and Java properties files.
if err := viper.ReadInConfig(); err != nil {
    return nil, err
}
```

This will add all the levels of configuration that we're expecting. Let's run a few checks by adding in a print statement at the end.
``` go
fmt.Printf("port: %d\n", viper.GetInt("port"))
```

## Checking the Results

With an empty _config.json_ file:
``` shell
$ cat config.json
{}
$ go run main.go
port: 0
```

With a populated _config.json_ file:
``` shell
$ cat config.json
{"port" : 9000}
$ go run main.go
port: 9000
```

With an environment variable:
``` shell
$ cat config.json
{"port" : 9000}
$ NETLIFY_PORT=8000 go run main.go
port: 8000
```

With a command line param:
``` shell
$ cat config.json
{"port" : 9000}
$ NETLIFY_PORT=8000 go run main.go -p 7000
port: 7000
```

### Using a Custom Configuration file
I don't like being tied to a single configuration file. Even if it can live in 1 of 1000 places. I like to be able to explicitly say which file to use. This means I add these lines to my boiler plate:

In the `cmd/root_cmd.go # RootCommand()`
``` go
rootCmd.StringP("config", "c", "", "An explicit config file to use")
```

And in the `conf/config.go # LoadConfig()`
``` go
configFile, err := cmd.Flags().GetString("config")
if err != nil {
  return err
}
if configFile != "" {
  viper.SetConfigFile(configFile)
} else {
  // do the other stuff
}
```

It lets you do this:
``` shell
$ cat dev.json
{"port": 1000}
$ go run main.go -c dev.json
port: 1000
```

It isn't necessary, but it is part of the boiler plate we use at Netlify.

## Unmarshaling a Config struct

A single port is fine to use accessing via `viper`, but I don't want to liter my code with calls to it. I want to contain and check my configuration immediately. Viper has the ability to marshal into a struct and we can just return that.

``` go
// in conf/config.go
type Config struct {
  Port string
}

func LoadConfig(cmd *cobra.Command)(*Config, error) {
  // all the other loading code

  config := new(Config)
  if err := viper.Unmarshal(config); err != nil {
    return nil, err
  }

  // all the error signatures above had to change to nil, err
  return config, nil
}
```

This will give you a way to serialize the object into a very useful form. Often I will write a function `validate(config *Config)(*Config, error)` and use that to validate some sane parts, but it isn't necessary. I will leave that as an exercise for the user.

## Adding Logging

Most services need to have logging. It is fine for a while to just use stdout, but that quickly becomes inadequate. I have found that [logrus](https://github.com/Sirupsen/logrus) is very useful. It is based around the idea of adding fields to your log message. This is really handy because we have all written lines where we embed the data in the message.

``` go
log.Info(fmt.Sprintf("the topic %s has %d messages waiting", topicName, topicCount))
```

Instead in logrus you'd add them as fields.
``` go
logrus.WithFields(logrus.Fields{
  "topic": topicName,
  "msg_coung": topicCount,
}).Info("Checking how full the topic is")
```

It is often useful to have it in both places; the `Infof()` functions are there for that exact reason. You may be asking "what do I gain by doing it this way?" The answer comes when you start to look at the different ways that you can output in logrus (e.g. [the json formatter](https://github.com/Sirupsen/logrus/blob/master/json_formatter.go#L8)). You can also add hooks and custom formatters. By using fields you no longer have to write really custom parsers for your data when you're parsing your own logs. You can now output it as json for your computer world, and text for your human world.

## Tying it All Together

The real trick comes when you add the configuration and logging together. In the boiler plate this is done in _conf/logging.go_. It is intended to take a config and give you back a root logger to use. This is where you can add more dimensions and such to each log message. This is especially useful if you are piping the logs into an aggregator and need to filter later.

``` go
// LoggingConfig specifies all the parameters needed for logging
type LoggingConfig struct {
  Level string
  File  string
}

// ConfigureLogging will take the logging configuration and also adds
// a few default parameters
func ConfigureLogging(config *LoggingConfig) (*logrus.Entry, error) {
  hostname, err := os.Hostname()
  if err != nil {
    return nil, err
  }

  // use a file if you want
  if config.File != "" {
    f, errOpen := os.OpenFile(config.File, os.O_RDWR|os.O_APPEND, 0660)
    if errOpen != nil {
      return nil, errOpen
    }
    logrus.SetOutput(bufio.NewWriter(f))
  }

  level, err := logrus.ParseLevel(strings.ToUpper(config.Level))
  if err != nil {
    return nil, err
  }
  logrus.SetLevel(level)

  // always use the fulltimestamp
  logrus.SetFormatter(&logrus.TextFormatter{
    FullTimestamp:    true,
    DisableTimestamp: false,
  })

  return logrus.StandardLogger().WithField("hostname", hostname), nil
}
```

Also, doing it this way you can configure other [hooks](https://github.com/Sirupsen/logrus#hooks) or other connection points.

### Nested Config Values

Let's talk a little about nested structures. Viper will automatically resolve values that are nested. For instance if you have an object like so:

``` go
type Config struct {
  Port int
  LogConfig LoggingConfig
}
```

It will properly marshal from a JSON config that looks like this:

``` JSON
{
  "logconfig": {
    "level": "debug"
  },
  "port": 1000
}
```

But will break if the key was `log_config`. To get that to work, you need to provide some tags on the struct. In particular add the `mapstructure:"log_config"` and it will work. Underlying the marshaling is the [mapstructure](https://github.com/mitchellh/mapstructure) project. There is no way I can find to specify what tag is used (that I can find), so viper just falls back to the default `mapstructure` tag.

We can also access the nested value directly with
``` go
viper.GetString("log_config.level")
```

If you're looking to set a nested value from the environment, you'll have to look at the line we added about an [env key replacer](https://github.com/spf13/viper/blob/346299ea79e446ebdddb834371ceba2e5926b732/viper.go#L856).

``` go
viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
```

This will take all the dots and make them underscores. So to set the log level via environment variables we have to do:

``` shell
$ NETLIFY_LOG_CONFIG_LEVEL=warn go run main.go
```

This should work, but currently there are outstanding issues (&[PR](https://github.com/spf13/viper/pull/195)!) in the viper project. For now I have been writing [terrible methods](https://github.com/rybit/config_example/blob/master/conf/reflect.go#L13) that will do `viper.GetXXX` methods and stuff them onto the object. It is not great, but it should be resolved soon.

Overall, this is the template I we at Netlify use to start our services. It lets us take care of the rote operations needed in starting a service. It helps us focus on the hard parts of the service; actually doing things, not printing configuration values.

Stay tuned as we take this boiler plate service and keep adding features!

Disagree? Find a mistake? Want more explanation? [Let me know on GitHub!](https://github.com/rybit/config_example)!


