FROM gitpod/workspace-full:latest

# optional: use a custom apache config.
COPY apache-config.conf /etc/apache2/apache2.conf

# COPY ./app /var/www/html

# optional: change document root folder. It's relative to your git working copy.
ENV APACHE_DOCROOT_IN_REPO="www"