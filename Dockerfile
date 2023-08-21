# Utilisez une image basée sur php avec Apache plus légère
FROM php:8.1-apache-bullseye

# Installez les packages nécessaires
RUN apt-get update \
    && apt-get install -y --no-install-recommends

# Enable mod_rewrite
RUN a2enmod rewrite

# Install PDO
RUN docker-php-ext-install pdo_mysql

# Install msqli
RUN docker-php-ext-install mysqli