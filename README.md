# Chatoweb

* node 9.10.1

* npm 5.6.0

* ruby-haml 5.0.4

* gulp 3.9.1

* bower 1.8.4

## Setup

### Get the code

Clone the project with git, which you should have installed by default:

`git clone https://github.com/chatomud/chatoweb`

`cd chatoweb`

### Node

First install Node (https://nodejs.org/en/):

`curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -`

`sudo apt-get install -y nodejs`

Node comes with npm (node package manager).

### Bower

Install bower system-wide:

`sudo npm install -g bower`

### haml

Install haml, globally as an option:

`sudo npm install -g haml` (global)

`npm install ruby-haml`

### Install dependencies

`bower install`

`npm install`

### Gulp

Install gulp, same as before:

`sudo npm install -g gulp` (global)

`npm install gulp`

There are some deprecations here I may fix someday.

### Build and run the app

`gulp build`

`gulp &`

You can now access the web interface on your browser, port 9000.


## Apache

We can use Apache to serve ChatoWeb. Jump into your console and do:

`sudo apt-get install apache2`

Now edit the apache configuration file:

`sudo vim /etc/apache2/apache2.conf`

At the end of the file, add the following, where [server_domain_or_ip] is example.com, or xxx.xxx.xxx.xxx, wherever you are hosting:

`ServerName [server_domain_or_ip]`

We can get away with using Apache's default site, which looks for files under `/var/www/html`. So everytime you want to publish, do `gulp build` as usual but don't run `gulp`, but instead:

`gulp build`

`sudo rm -rf /var/www/html/*`

`sudo mv dist/* /var/www/html`

Note that dist is the folder ChatoWeb gets bundled into after `gulp build`.

Here comes a tricky part - by default the portal fetches resources by specifying directly the path, `/path/to/thing.html`, `/another/path/to/stuff.js`, etc. However, paths beginning with `/api` need to be treated differently as they are meant for ChatoMud, the backend supporting the frontend. We need to instruct Apache to act as a proxy, so whenever a request with `/api` prepended comes in, it is redirected to ChatoMud. So open up the default site's config file, and add a few lines nested within `VirtualHost`:

 `sudo vim /etc/apache2/sites-enabled/000-default.conf`

```
<VirtualHost *:80>
  ProxyPreserveHost On
  ProxyPass /api http://127.0.0.1:3000/
  ProxyPassReverse /api http://127.0.0.1:3000/

  ...more stuff that was already here...
</VirtualHost>

```

As you can see, this code assumes that ChatoMud is listening for API requests on port 3000. You do not need to open it as the requests will be coming from the host itself, not from outside, thanks to Apache's proxying (ChatoWeb and ChatoMud both run on the same machine in this scenario).

Also, for the proxying to work, a couple of apache modules need to be enabled:

`a2enmod proxy`

`a2enmod proxy_http`

After they are enabled and the config is in place, do a quick test:

`sudo apache2ctl configtest`

That should output that everything is fine. Just restart apache now and you're set:

`sudo systemctl restart apache2`
