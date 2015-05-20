# Base Email Template

## Quickly start a fresh project?

Here is the code...

```
curl -Lk https://github.com/balihoo-aharl/email-standard/archive/master.tar.gz | tar -xzv --strip-components=1
```

## What else is going on?

This is the base template for Balihoo form builder emails. It is designed to work with the [balihoo-creative](https://github.com/balihoo/balihoo-creative) tool.

* install gulp, premailer, nokogiri and local npm packages
* create config/mailgun.js with mailgun credentials and email addresses
* gulp watch
* gulp build
* gulp sendmail

## Todo

Add Gemfile for premailer and nokogiri/hpricot
