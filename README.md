## Introduction

**Note: This repository contains experimental work from 2016 implementing HTTP 402 with Solid. We are now exploring modern HTTP 402 implementations and standards for R&D purposes.**

For today's hackday I am going to try and start to build an access controlled "route" in solid-server, which grants access to a resource based on a credit system.  If you have credits, it will show you the resource.  If not you will get a 402.  This builds a bit more functionality on the code written for the previous [hack day](http://melvincarvalho.github.io/markdown-editor/?uri=https://melvin.databox.me/.markdown/hackday/route.txt).  I'll try and incorporate the work from the web payments WG [http://w3c.github.io/webpayments-http-api/](http://w3c.github.io/webpayments-http-api/).

## Modern HTTP 402 Implementations (2025)

The HTTP 402 "Payment Required" status code, long dormant since HTTP/1.1, has seen significant adoption in 2025. Here are notable projects and standards:

### x402 Protocol
- **Description**: Open protocol by Coinbase that enables blockchain-based payments over HTTP
- **Partners**: Cloudflare, Visa, Google, AWS, Anthropic, Circle, Vercel
- **Documentation**: https://x402.gitbook.io/x402/core-concepts/client-server
- **Foundation**: x402 Foundation (Coinbase + Cloudflare)
- **Use Cases**: AI agent payments, API monetization, autonomous commerce
- **Stats**: 1.38M+ transactions, $1.48M+ volume (as of Oct 2025)

### Cloudflare Pay Per Crawl
- **Description**: HTTP 402 implementation for AI crawler monetization
- **Documentation**: https://developers.cloudflare.com/agents/x402/
- **Features**: Per-request pricing for AI bots accessing web content
- **Scale**: 1 billion+ HTTP 402 responses daily

### L402 Protocol (Lightning Labs)
- **Description**: Lightning Network-based HTTP 402 implementation (formerly LSAT)
- **GitHub**: https://github.com/lightninglabs/L402
- **Documentation**: https://docs.lightning.engineering/the-lightning-network/l402
- **Tools**: Aperture (reverse proxy), LangChainL402 (AI integration)
- **Use Cases**: Pay-per-use APIs, micropayments, Lightning Loop/Pool

### Related Projects
- **Aperture**: L402 reverse HTTP proxy for paid APIs
- **@bus402/x402-sandbox**: NPM package for local x402 testing
- **Visa TAP**: Trusted Agent Protocol supporting x402
- **PING Token**: First token experiment on x402 protocol (Base chain)

### Resources
- MDN HTTP 402 Documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/402
- awesome-L402: https://github.com/Fewsats/awesome-L402  


## Components

The demo contains 4 components

* /pay -- the resource that costs 25 credits to view
* /balance -- shows your balance
* /faucet -- a small app that will see your balance
* /home -- navigation and instructions

Each was deployed as a custom route with its own handler.  

## Installation

Installation is via

    git clone https://github.com/melvincarvalho/402.git

Then run

    npm install


```bash
$ bin/server.js  --port 8443 --ssl-key path/to/ssl-key.pem --ssl-cert path/to/ssl-cert.pem
# server running on https://localhost:8443/
```

##### How do I get the --ssl-key and the --ssl-cert?
You need an SSL certificate you get this from your domain provider or for free from [Let's Encrypt!](https://letsencrypt.org/getting-started/).

If you don't have one yet, or you just want to test `solid`, generate a certificate
```
$ openssl genrsa 2048 > ../localhost.key
$ openssl req -new -x509 -nodes -sha256 -days 3650 -key ../localhost.key -subj '/CN=*.localhost' > ../localhost.cert
```

## Faucet

Using [webcredits](https://webcredits.org/) it is possible to set up a faucet using

    credit create

    credit genesis

    credit insert https://w3id.org/cc#coinbase 50000 '' https://w3id.org/cc#faucet


## Demo

[Demo](https://webcredits.org:3000/)
