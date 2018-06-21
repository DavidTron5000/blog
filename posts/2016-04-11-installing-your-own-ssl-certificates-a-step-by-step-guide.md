---

title: "Installing Your Own SSL Certificates: A Step-by-Step Guide"
author: Aaron Autrand
image: /img/blog/ssl-certificate.jpg
image_caption: null
format: blog
short_title: Install Custom SSL Certs
description: A step-by-step guide to securing your site with a custom SSL certificate.
thumbnail: thumbnails/ssllock.png
cmsUserSlug: ""
date: 2016-04-11T00:00:00.000Z
tags:
  - tutorial
  - ssl
---

Netlify offers [free 1-click SSL](https://www.youtube.com/watch?v=k-9T0FYd-QU) with LetsEncrypt. It's the very definition of easy.

But some of our customers have reasons for using their own certificates procured from an SSL Certificate Authority. If you are one of those customers, we'll show you how to install your own certificate here.

<!-- excerpt -->

Log in to [app.netlify.com](https://app.netlify.com) and choose your site.

First, make sure that your custom domain has been set. The domain name of your site must match the domain name on the SSL certificate.

![ssldomain.png](/img/blog/ssldomain.png)

Next click `SSL` at the top of your page. Then click the button labeled `Provide Your Own Certificate`.

![sslprovidebutton.png](/img/blog/sslprovidebutton.png)

A window will pop up that looks like this:

![sslmanual.png](/img/blog/sslmanual.png)

In the top box, you'll paste in the contents of your PEM formatted certificate. PEM format is the format most widely used by Certificate authorities, and will usually have extensions of `.pem`, `.crt`, `.cer` or `.key`. The file will look like something like this:

![PEM Certificate Example](/img/blog/illust_pemfile.gif)

Copy the bottom portion, beginning with the first dash of the `Begin Certificate` line and ending after the last dash of the `End Certificate` line. Paste the selection in the `Certificate` box at the top of the popup.

Next, copy your Private Key. Begin with the first dash of the `Begin RSA Private Key` line and ending after the last dash of the `End RSA Private Key` line. Paste the selection in the `Private Key` box.

Finally, you'll need to paste in your intermediate certificate chains. The availability of these chains depend on certificate provider you've chosen. If you choose to install your certificate without adding in the Intermediate Certs, be aware that while it may appear to work in your browser, it could break when trying to access your site through a mobile interface.

### **WildCard**

It's worth noting that if you install a certificate on your domain, with wildcards, for example `*.example.com`, you will be the only one with the ability to install a separate certificate for a subdomain. Other users on your admin account will be unable to add certificates or set custom domains for subdomains without specific authorization.


Once you've filled all the fields in the popup, just click `Install Your Certificate`, and your site is secure.
