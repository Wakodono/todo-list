# Todo list

A browser todo app from [The Odin Project](https://www.theodinproject.com/lessons/javascript-todo-list) JavaScript curriculum.

Todos live in **projects**. Logic (create, update, delete, localStorage) sits in modules; the DOM layer only renders and listens for clicks. Webpack bundles those modules into one file the browser can load.

## What it does

- Add, edit, and delete todos (title, description, due date, priority)
- Group todos into projects, including a default **General** project
- Colour-code priority in the list
- Keep data in `localStorage` so a refresh does not wipe the board

## What I set out to learn

- Splitting **data** (`todo.js`, `project.js`) from **UI** (`ui.js`)
- The **module pattern** (IIFEs with a public `create` / `getAll` / `update` / `delete` surface)
- Webpack entry, output, and `webpack serve`
- Reading and writing JSON in `localStorage` without crashing if the key is missing

## Technologies

- JavaScript (modules, factory-style IIFEs)
- Webpack 5
- `uuid` for ids, `date-fns` for dates
- HTML / CSS

## Run it

```bash
npm install
npm run dev
```

Then open the URL webpack prints (usually `http://localhost:8080`). Todos are stored in that browser’s `localStorage`.

```bash
npm run build
```

writes `dist/bundle.js`. The HTML in `public/` expects the dev server to serve `/bundle.js`.

## Project layout

```text
src/index.js     Wires the modules together
src/todo.js      Todo CRUD + localStorage
src/project.js   Projects and which todos they contain
src/ui.js        DOM: lists, forms, modals
public/          HTML and CSS
webpack.config.js
```
