---

title: August 22nd DDoS Learning Review
author: Matt Biilmann
format: blog
short_title: Load balancer DDoS learning review
description: Last August 22nd our main load balancer was impacted by a DDoS attack. This is what happened and what we learned from it.
cmsUserSlug: ""
date: 2016-08-23
tags:
- ddos
- learning review
---

Currently Netlify will serve sites in two ways that are very different and worth being aware of:


1. Netlify CDN - this is a global infrastructure with PoPs all over the world and the dynamic traffic direction system that routes users to the closest geographical location.
2. Central Load balancer - this is an IP we make available so people have a target for A records when configuring their DNS. Until this Monday, Aug 22nd, this Load Balancer was provisioned in Rackspace’s Chicago datacenter.


## The events before August 22nd

On a quiet Saturday night, Aug 20th, we started noticing some worrisome traffic patterns on our central load balancer:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_98B086435B52302BE5B5F661A18FE544450FD9A9C1F00866F66F3E11E98B2503_1471903352201_Screen+Shot+2016-08-20+at+11.41.57+PM.png)

Above, you can see the drastic surge in incoming transfer with no corresponding increase in outgoing requests. We hurried up and added extra capacity behind the load balancer and contacted Rackspace to check if this looked like legitimate traffic or the beginning of a DDoS attack.

According to Rackspace the level of traffic was not something to worry about, and we asked them to contact us if there were any signs of this changing.


## The events during August 22nd

Monday, Aug 22nd, early morning at 8am PST, we got alerts that the central load balancer had stopped responding. We contacted Rackspace and found that they had null routed the load balancer, meaning that all traffic to our public IP would simply hang before reaching our servers.

We contacted Rackspace to try to get ETA on this, data on the size and type of attack, etc, but even when escalating to our Account Manager, we were unable to get any concrete information.

This affected all users with an A record pointed to the IP address of our load balancer. It’s important to understand that we always encourage users to use our full blown CDN instead, by pointing a CNAME at our services. This typically means using www as your primary domain rather than the naked domain, and is critical to get the best level of performance and uptime on your CDN servers.


The main reason we expose our load balancer IP is because most DNS providers can’t set a CNAME on the naked domain. Following the DNS spec, you can’t have any MX records (for mail) or the like on a naked domain if you set a CNAME.

Exposing an IP address means that Netlify’s users can setup an A record for their naked domain when their DNS provider doesn’t support features like CNAME flattening, ANAMEs or ALIAS records. This is really useful if you want Netlify to handle the redirects from naked domain to www. However, some users use it to make their primary domain a naked domain, even if it means loosing the performance and uptime of Netlify CDN while sending all traffic to our load balancer instead.

All clients with an A record pointed at Netlify were affected to some degree when the load balancer got overwhelmed by the DDoS traffic, and dealing with the DDoS was out of our hands as with any managed load balancer.

Clients using their naked domain with an A record as their primary domain, were hit the hardest. We've covered this before in [an earlier blog post](https://www.netlify.com/blog/2016/01/12/this-weekends-ddos-attack-and-whats-in-a-cname/), but this is why we always advice people to use the www domain as their primary domain, instead of relying on a single IP address.


## Mitigation

Since we could not rely on any timeline for getting the Rackspace balancer back up, we immediately started looking into better solutions for handling A records pointed at Netlify.

Simultaneously with trying to escalate the issue with Rackspace, we started spinning up a new cluster of CDN machines in Google Compute.

Google has launched a network load balancer based on [Maglev](http://research.google.com/pubs/pub44824.html) and claims being able to scale to serve a million requests per second with no pre-warming. As soon as our new CDN cluster was in place, we contacted all clients that had written in through our various support channels and shared a new public IP pointing at a Google network balancer, and instructed them to change their A records in order to get their naked domains back online.

Once we were confident that this would be a robust solution, we updated our documentation page and announced the new IP on Twitter, Gitter and [our status page](http://netlifystatus.com).


## Long term solutions

We’re committed to keeping the new Google based network IP running and from everything we’ve seen so far their load balancer product is a much better fit for us than Rackspace’s Load Balancer. We originally picked Rackspace because they have a reputation for high uptime, stability and support, but our experience have shown that their Load Balancer is too vulnerable to DDoS attack and their processes around DDoS attacks are simply not up to par with any of the other cloud providers we work with.

We believe Google’s Maglev based load balancer will be more resilient to these kind of attacks, both because of the size of Google infrastructure, and because it’s based on anycast IP addresses which gives Google more layers of abstraction when dealing with DDoS attacks. But eventually the only way to guard a domain against DDoS related outages, is to completely avoid exposing any fixed IP address for the domain.

This is why we’re working on releasing our own DNS hosting that will be closely integrated with Netlify’s CDN. For the very curious, our API already exposes the DNS functionality. It’s documented in our [Swagger spec](https://github.com/netlify/open-api/blob/master/swagger.yml#L764) and we've done [some successful experiments](https://www.youtube.com/watch?v=IfFenanuRnc&feature=youtu.be) that demonstrate a complete DNS setup for a Netlify site straight from the command line.

When using Netlify DNS for your site, our system will route users directly to the closest active CDN node without any intermediate CNAME or A record. It works equally well for both naked domains, www or other subdomains and adds the needed level of abstraction that will allow us to deal with DDoS attacks, route around localized outages and bring the ideal performance and uptime.


## Improving Communication

Apart from building out lasting solutions to the A record issue, we’ve also been looking at what we can do to improve communication when something bad happens.

The first thing we’ve been improving is the flow around our [Status Page](http://netlifystatus.com). The status page is built with the same setup that used to build our webpage (Gulp + Jekyll - the new site we launched a few weeks ago is built with Hugo). However, we obviously can’t use Netlify to power our status page, so we’ve had to setup a different publishing system around an external CI provider + S3 + Cloudfront, and it turned out to be rather fragile when we needed it the most, which meant it took much longer than it should have before our status page was up to date.

We’ve made some fixes to this process and our status page should be updated straight away in case of an issue in the future. Apart from that we use [Twitter](https://twitter.com/netlify) heavily whenever there’s an issue.

We’re also working on a mailer that will let us quickly send targeted mails to all paying clients in case of any outage, so anyone on a paid plan can be notified immediately if they’re affected by an issue.


## Conclusion

Outages, whether they are partial or complete, are always something we take extremely seriously and we’re working hard to take the lessons learned from yesterday’s A record issues and improve both our infrastructure and our processes. We’re terribly sorry for any effects this outage might have had on your site, your app or your business and will be working hard to regain any trust lost.

We will continue analyzing the issues that lead to this outage, and we’re going to prioritize the solutions we talked about in this review. This work will help us improve the service that Netlify offers to thousands of people every day.
