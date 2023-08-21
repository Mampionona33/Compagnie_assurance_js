FROM php:8.1-apache-bullseye

# Installez les packages nécessaires
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    htop \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Install phpMyAdmin
ENV PHPMYADMIN_VERSION=5.1.1
RUN curl -L -o phpmyadmin.tar.gz https://files.phpmyadmin.net/phpMyAdmin/$PHPMYADMIN_VERSION/phpMyAdmin-$PHPMYADMIN_VERSION-all-languages.tar.gz \
    && tar -xzf phpmyadmin.tar.gz -C /var/www/html --strip-components=1 \
    && rm phpmyadmin.tar.gz

RUN mkdir -p /var/log/apache2 && chown -R www-data:www-data /var/log/apache2


# Enable mod_rewrite
RUN a2enmod rewrite

# Install PDO
RUN docker-php-ext-install pdo_mysql

# Install msqli
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Expose port 80
EXPOSE 80

# Start Apache server
# CMD ["apache2-foreground"]