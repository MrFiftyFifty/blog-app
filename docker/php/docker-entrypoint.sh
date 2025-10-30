#!/bin/sh
set -e

# Создание необходимых директорий
mkdir -p /var/www/storage /var/www/bootstrap/cache

# Установка прав перед composer install
chmod -R 775 /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true

# Установка composer-зависимостей если их нет
if [ ! -d "/var/www/vendor" ]; then
    echo "Installing composer dependencies..."
    composer install --no-interaction --optimize-autoloader
fi

# Запуск php-fpm
exec php-fpm
