# Инструкция по развёртыванию на TimeWeb VPS

## Заводи протезию ортопедӣ - Deployment Guide

---

## Требования

- TimeWeb VPS (Ubuntu 22.04 LTS рекомендуется)
- Node.js 20.x
- PostgreSQL 15+
- Nginx
- PM2
- Минимум 1 GB RAM, 20 GB SSD

---

## Шаг 1: Подготовка VPS

### 1.1 Подключитесь к серверу
```bash
ssh root@ваш-ip-адрес
```

### 1.2 Обновите систему
```bash
apt update && apt upgrade -y
```

### 1.3 Установите Node.js через NVM
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
node -v  # Должно показать v20.x.x
```

---

## Шаг 2: Установка PostgreSQL

### 2.1 Установите PostgreSQL
```bash
apt install postgresql postgresql-contrib -y
systemctl start postgresql
systemctl enable postgresql
```

### 2.2 Создайте базу данных
```bash
sudo -u postgres psql
```

В консоли PostgreSQL:
```sql
CREATE DATABASE prosthetics_db;
CREATE USER prosthetics_user WITH PASSWORD 'ваш_сложный_пароль';
GRANT ALL PRIVILEGES ON DATABASE prosthetics_db TO prosthetics_user;
\c prosthetics_db
GRANT ALL ON SCHEMA public TO prosthetics_user;
\q
```

---

## Шаг 3: Загрузка приложения

### 3.1 Создайте директорию
```bash
mkdir -p /var/www/prosthetics
cd /var/www/prosthetics
```

### 3.2 Загрузите файлы (с вашего компьютера)
```bash
# На вашем компьютере выполните:
scp -r dist/ root@ваш-ip:/var/www/prosthetics/
scp -r data/uploads/ root@ваш-ip:/var/www/prosthetics/uploads/
scp package.json root@ваш-ip:/var/www/prosthetics/
scp package-lock.json root@ваш-ip:/var/www/prosthetics/
scp -r shared/ root@ваш-ip:/var/www/prosthetics/
scp drizzle.config.ts root@ваш-ip:/var/www/prosthetics/
scp deploy/data-export.sql root@ваш-ip:/var/www/prosthetics/
```

### 3.3 Установите зависимости
```bash
cd /var/www/prosthetics
npm install --production
```

---

## Шаг 4: Настройка переменных окружения

### 4.1 Создайте файл .env
```bash
nano /var/www/prosthetics/.env
```

Добавьте содержимое:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://prosthetics_user:ваш_сложный_пароль@localhost:5432/prosthetics_db

# Для хранения файлов (опционально, если используете облачное хранилище)
# GCS_BUCKET_NAME=your-bucket-name
# GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
```

---

## Шаг 5: Инициализация базы данных

### 5.1 Создайте таблицы
```bash
cd /var/www/prosthetics
npx drizzle-kit push
```

### 5.2 Импортируйте данные
```bash
psql -U prosthetics_user -d prosthetics_db -f data-export.sql
```

### 5.3 Создайте администратора
```bash
npx tsx server/seed-admin.ts
```

---

## Шаг 6: Запуск через PM2

### 6.1 Установите PM2
```bash
npm install -g pm2
```

### 6.2 Запустите приложение
```bash
cd /var/www/prosthetics
pm2 start dist/index.js --name "prosthetics-api"
```

### 6.3 Настройте автозапуск
```bash
pm2 startup
pm2 save
```

### 6.4 Полезные команды PM2
```bash
pm2 list              # Список процессов
pm2 logs              # Просмотр логов
pm2 restart all       # Перезапуск
pm2 stop all          # Остановка
```

---

## Шаг 7: Настройка Nginx

### 7.1 Установите Nginx
```bash
apt install nginx -y
```

### 7.2 Создайте конфигурацию
```bash
nano /etc/nginx/sites-available/prosthetics
```

Добавьте:
```nginx
server {
    listen 80;
    server_name ваш-домен.com www.ваш-домен.com;

    # Лимиты загрузки файлов
    client_max_body_size 50M;

    # Статические файлы
    location /uploads/ {
        alias /var/www/prosthetics/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Статические ассеты фронтенда
    location /assets/ {
        alias /var/www/prosthetics/dist/public/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Favicon и статика
    location ~* \.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$ {
        root /var/www/prosthetics/dist/public;
        expires 30d;
        add_header Cache-Control "public";
    }

    # Проксирование на Node.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
}
```

### 7.3 Активируйте сайт
```bash
ln -s /etc/nginx/sites-available/prosthetics /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default  # Удалите дефолтный сайт
nginx -t  # Проверка конфигурации
systemctl restart nginx
```

---

## Шаг 8: SSL-сертификат (Let's Encrypt)

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d ваш-домен.com -d www.ваш-домен.com

# Автообновление
certbot renew --dry-run
```

---

## Шаг 9: Файрвол

```bash
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
ufw status
```

---

## Структура файлов на сервере

```
/var/www/prosthetics/
├── dist/
│   ├── index.js          # Серверный код
│   └── public/           # Статические файлы фронтенда
│       ├── index.html
│       └── assets/
├── uploads/              # Загруженные файлы (баннеры, новости)
│   ├── banner1.jpg
│   ├── banner2.jpg
│   ├── banner3.jpg
│   ├── news_disability_day.jpg
│   ├── news_equipment.jpg
│   ├── news_seminar.jpg
│   ├── news_khujand.jpg
│   └── news_who.jpg
├── shared/
│   └── schema.ts
├── node_modules/
├── package.json
├── .env
└── data-export.sql
```

---

## Проверка работы

1. Откройте в браузере: `http://ваш-домен.com`
2. Проверьте API: `http://ваш-домен.com/api/banners`
3. Проверьте логи: `pm2 logs`

---

## Обновление сайта

```bash
cd /var/www/prosthetics

# Загрузите новые файлы
scp -r dist/ root@ваш-ip:/var/www/prosthetics/

# Перезапустите приложение
pm2 restart prosthetics-api
```

---

## Решение проблем

### Приложение не запускается
```bash
pm2 logs  # Проверьте ошибки
node dist/index.js  # Запустите напрямую для отладки
```

### Ошибка подключения к БД
```bash
# Проверьте PostgreSQL
systemctl status postgresql

# Проверьте подключение
psql -U prosthetics_user -d prosthetics_db -h localhost
```

### 502 Bad Gateway
```bash
# Убедитесь, что приложение запущено
pm2 list

# Проверьте порт
netstat -tlnp | grep 5000
```

### Ошибки загрузки файлов
```bash
# Проверьте права доступа
chown -R www-data:www-data /var/www/prosthetics/uploads
chmod -R 755 /var/www/prosthetics/uploads
```

---

## Контакты

При возникновении проблем обращайтесь к разработчику.
