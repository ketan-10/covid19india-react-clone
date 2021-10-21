# covid19india-react-clone

A clone of [covid19india.org](https://www.covid19india.org/)

Original Codebase: [Github](https://github.com/covid19india/covid19india-react)

### Changes from original

1. Use TypeScript instead of JavaScript.
2. Use vitejs instead of create-react-app.
3. Make it flexible, so that the project can be extended to show many kind of statistics on india.

### Motivation

1. To learn how covid19india-react is architected.
2. To learn about the react-libraries used. (d3.js, react-spring, etc).
3. To learn about the design patterns used, and how they are implemented.
4. To learn about how to implement common patterns like dark-mode, multi-language support, data-fetching, lazy-loading etc.

### Steps

**Initialization** <br>

- created vite app with : `yarn create vite`

**lining and formatting**

- [Prettier integration with linters](https://prettier.io/docs/en/integrating-with-linters.html)
- [How eslint and prettier work together with plugins](https://stackoverflow.com/questions/44690308/whats-the-difference-between-prettier-eslint-eslint-plugin-prettier-and-eslint)
- [ESLint, Prettier & Airbnb Setup](https://gist.github.com/bradtraversy/aab26d1e8983d9f8d79be1a9ca894ab4)
- [(Wes Bos) ESLint + Prettier + VS Code — The Perfect Setup](https://youtu.be/lHAeK8t94as)

**Pre Commit Hooks To lint before commit**

- [Build a Modern JS Project - #4 Pre-commit with Husky & lint-staged](https://youtu.be/6u9gmwTl3bY)

- [StackOverflow Fix to `husky` not creating git hooks in `.git` directory](https://stackoverflow.com/questions/50048717/lint-staged-not-running-on-precommit)

**Optimization**

- ["Why Did You Render?" - Monitor React Performance](https://www.youtube.com/watch?v=eT00GGYHSSQ)

- [welldone-software/why-did-you-render](https://github.com/welldone-software/why-did-you-render)

- [Immer Tutorial | Immer and React Match Made in Heaven](https://youtu.be/8kC5fHlir4E)

- [REACT MEMO vs USECALLBACK vs USEMEMO](https://youtu.be/uojLJFt9SzY)

**CSS**

- [How to host your own fonts made simple](https://youtu.be/KzqQXDbDvus)

**React**

- [My Findings](https://github.com/ketan-10/Testing/tree/master/react)

**Vitejs with gh-pages**

- [How to Deploy Your Vite App to Github Pages // Vue app deployment in 5 quick steps](https://youtu.be/yo2bMGnIKE8)

  - `yarn build`
  - `yarn add dist -f`
  - `git commit -m "next version"`
  - `git subtree push --prefix dist origin gh-pages`

- [css url is not replaced- issue](https://github.com/vitejs/vite/issues/3980#issuecomment-870422216)

- [solution using public directory](https://vitejs.dev/guide/assets.html#the-public-directory)
