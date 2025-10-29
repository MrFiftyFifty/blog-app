# Блог с комментариями

Веб-приложение блога на Laravel (backend) и React (frontend) с Docker.

## Технологии

- **Backend:** Laravel 12, MySQL 8.0, PHP 8.4
- **Frontend:** React 19, Vite 6, React Router 7
- **Infrastructure:** Docker, Nginx

## Запуск

1. Запустите контейнеры:
```bash
docker-compose up -d --build
```

2. Настройте backend (только при первом запуске):
```bash
# Скопируйте .env файл
docker exec -it blog_php cp .env.example .env

# Сгенерируйте ключ приложения
docker exec -it blog_php php artisan key:generate

# Подождите пока MySQL запустится (около 10-15 секунд)
sleep 15

# Выполните миграции и загрузите тестовые данные
docker exec -it blog_php php artisan migrate:fresh --seed
```

> **Важно:** Приложение использует MySQL из Docker контейнера. Права на папки storage и cache устанавливаются автоматически.

**Приложение будет доступно через 1-2 минуты.**

### Технические детали

- Права на папки `storage` и `bootstrap/cache` устанавливаются автоматически при запуске PHP-контейнера через `docker-entrypoint.sh`
- Владелец: `www-data:www-data`, права: `775`

## Доступ

- Frontend: http://localhost:5173
- API: http://localhost:8000/api

## API

- `GET /api/articles` - Список статей
- `GET /api/articles/{id}` - Одна статья с комментариями
- `POST /api/articles` - Создать статью
- `POST /api/articles/{id}/comments` - Добавить комментарий

## База данных

**Подключение:**
- Host: localhost:3306
- Database: blog_db
- User: blog_user
- Password: blog_password

**Таблицы:**
- `articles` (id, title, content, created_at)
- `comments` (id, article_id, author_name, content, created_at)

## Дополнительные команды

```bash
# Остановить контейнеры
docker-compose down

# Пересоздать базу с тестовыми данными
docker exec -it blog_php php artisan migrate:fresh --seed

# Просмотр логов
docker-compose logs -f

# Полное пересоздание (удаляет все данные)
docker-compose down -v
docker-compose up -d --build
```
