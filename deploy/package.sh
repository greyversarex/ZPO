#!/bin/bash

# =====================================================
# Скрипт упаковки для деплоя на TimeWeb
# Заводи протезию ортопедӣ
# =====================================================

echo "Упаковка файлов для деплоя..."

# Создаем директорию для пакета
PACKAGE_DIR="deploy/timeweb-package"
rm -rf $PACKAGE_DIR
mkdir -p $PACKAGE_DIR

# Копируем production сборку
echo "Копирование dist/..."
cp -r dist $PACKAGE_DIR/

# Копируем загруженные файлы
echo "Копирование uploads/..."
mkdir -p $PACKAGE_DIR/uploads
cp -r data/uploads/* $PACKAGE_DIR/uploads/

# Копируем конфигурацию
echo "Копирование конфигурационных файлов..."
cp package.json $PACKAGE_DIR/
cp package-lock.json $PACKAGE_DIR/
cp drizzle.config.ts $PACKAGE_DIR/
cp -r shared $PACKAGE_DIR/

# Копируем SQL экспорт
echo "Копирование SQL экспорта..."
cp deploy/data-export.sql $PACKAGE_DIR/

# Копируем seed скрипт для создания админа
mkdir -p $PACKAGE_DIR/server
cp server/seed-admin.ts $PACKAGE_DIR/server/
cp server/db.ts $PACKAGE_DIR/server/

# Создаем пример .env файла
echo "Создание .env.example..."
cat > $PACKAGE_DIR/.env.example << 'EOF'
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://prosthetics_user:your_password@localhost:5432/prosthetics_db
EOF

# Копируем инструкцию
cp deploy/TIMEWEB-DEPLOY.md $PACKAGE_DIR/README.md

# Создаем архив
echo "Создание архива..."
cd deploy
tar -czvf timeweb-package.tar.gz timeweb-package/
cd ..

echo ""
echo "================================================"
echo "Пакет готов!"
echo "================================================"
echo ""
echo "Файлы:"
echo "  - deploy/timeweb-package/       (директория)"
echo "  - deploy/timeweb-package.tar.gz (архив)"
echo ""
echo "Для загрузки на сервер:"
echo "  scp deploy/timeweb-package.tar.gz root@ваш-ip:/var/www/"
echo ""
echo "На сервере:"
echo "  cd /var/www && tar -xzvf timeweb-package.tar.gz"
echo "  mv timeweb-package prosthetics"
echo "  cd prosthetics && npm install --production"
echo ""
echo "Смотрите README.md для полной инструкции."
