#!/bin/sh
set -e

# Установка прав на storage и cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

# Запуск php-fpm
exec php-fpm
