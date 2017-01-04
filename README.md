
<p align="center">
  <a href="https://github.com/reimertz/anolog">
    <img src="public/anolog.png" width="500">
  </a>
</p>

<p align="center">
  the anonymous, fully encrypted and open-sourced blogging platform.
</p>

<p align="center">
  <a href="https://travis-ci.org/reimertz/anolog">
    <img src="https://travis-ci.org/reimertz/anolog.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://gitter.im/reimertz/anolog">
    <img src="https://badges.gitter.im/reimertz/anolog.svg" alt="Join gitter channel">
  </a>
</p>

## Features
**Anolog** requires no registration or authentication.

**Anolog** posts are immutable. if you want to do an edit, fork it.

**Anolog** posts are encrypted client-side with AES-GCM-256 before being persisted, so if you don't have the url, you won't be able to read the post.[1]

**Anolog** currently stores all content and images anonymously on gist.github.com and imgur.com. The idea is to slowly progress over to IPFS once it's production ready.

**Anolog** is hosted on Github, served over HTTPS and distributed through Cloudflares CDN for maximum performance and DDoS resilience.[2]

**Anolog** is 100% open-sourced, soon to be backed by a non-profit oranization[3].


1. Uploaded images is currently not encrypted before being persisted to imgur.com.
2. Connection between Cloudflare <-> Github Pages could be vulnerable to MITM-attacks. Currently investigating using Gitlab Pages + Let's Encrypt.
3. I am currently exploring the best setup for this soon-to-be organization.

## Use anolog

Go to [https://anolog.org](https://anolog.org).