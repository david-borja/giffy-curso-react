# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Useful commands React Project

npm create vite@latest my-vue-app -- --template vue

## Useful commands TDD

npm i -D vitest

npm i standard -D

"eslintConfig": {
"extends": "./node_modules/standard/eslintrc.json"
}

"scripts": {
"test": "vitest"
},

"type": "module", de este modo podemos utilizar los imports

npm i react react-dom -E
npm i @vitejs/plugin-react -D
npm i @testing-library/react happy-dom -D

Add this below to start the browser:
"dev": "vite"
"coverage": "vitest run --coverage"

for the matchers like .toBeInTheDocument() you do need to install @testing-library/jest-dom

ABOUT REACT

En su documentación, React comenta que es inteligente y que solo renderiza lo que cambia.
Esto es cierto solo en parte, porque existen dos renderizados. En el DOM y el el virtual DOM.
React sí renderiza en el DOM solo lo que cambia, pero muchas veces no evita el cálculo computacional en la parte de react (Virtual DOM)

## Next Steps

[] Add the option to change languages
[] Add a RESET_FILTERS action
