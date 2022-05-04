# Web messenger
## Первый проект курса "Мидл фронтенд-разработчик" от Яндекс.Практикум

Проект без использования фреймворков

## Некоторые особенности проекта

Не работают ссылки например на чат или обратно на логин, так как все сделано кнопками, для перехода, можно воспользоваться прямыми ссылками:
`/chat`
`/login`

Проект перенесен на компоненты, убраны `partials`

Все файлы Javascript заменены на Typescript, за исключением `server.js`

## Pull Request

[Pull request](https://github.com/nikitaomelyuhin/middle.messenger.praktikum.yandex/pull/3)

## Netlify

[Netlify](https://heuristic-kalam-85f874.netlify.app/)

## Ui

Лежит в папке `static/ui`

Образец брал [отсюда](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

## Node.js

В проекте используется [Node.js](https://nodejs.org/) v14.19.0

## Скрипты для запуска
Запуск __dev__ режима и __build__
```
npm run dev
npm run build
```
Запуск сервера на localhost:3000
```
npm run start
```