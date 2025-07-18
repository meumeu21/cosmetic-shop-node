# Сайт для онлайн-магазина косметики


![главная страница](./readme/main-page.png)


Создан с помощью Node.js, база данных на MySQL, использовались EJS, фреймворки Bootstrap и Tailwind CSS. Присутствует панель администратора по адресу /admin. Вёрстка производилась по [шаблону в Figma](https://www.figma.com/design/pWO4aLIcrRv4syZeewb0Xy/skincare?node-id=0-1&m=dev&t=5uCm5ewaETfEF7YF-1).


## Инструкция к запуску
1. Скачать репозиторий;
2. Скачать зависимости через npm install;
3. Создать базу данных в MySQL;
4. Импортировать дамп базы данных через mysql -u [user] -p cosmetic_shop < cosmetic_shop_dump.sql;
5. Заполнить .env (пример в .env.example);
6. Запустить через npm run dev.

Логин и пароль от изначального администратора в файле initAdmin.js (вход по логину производится через почту).


## Скриншоты сайта:


#### Главная страница

![главная страница 1](./readme/main-page-1.png)
![главная страница 2](./readme/main-page-2.png)


#### Каталог товаров

![каталог товаров](./readme/catalogue.png)


#### Страница товара

![страница товара](./readme/catalogue-product-info.png)


#### Страница «Skincare»

![страница skincare](./readme/skincare.png)


#### Страница «О нас»

![страница skincare](./readme/about.png)


#### Попап авторизации

![попап авторизации](./readme/popup-login.png)


#### Попап регистрации

![попап регистрации](./readme/popup-register.png)


#### Профиль пользователя

![профиль пользователя](./readme/user-info.png)


#### Редактирование профиля пользователя

![редактирование профиля пользователя](./readme/user-edit.png)


#### Заказы пользователя

![заказы пользователя](./readme/user-orders.png)


#### Корзина

![корзина](./readme/cart.png)
