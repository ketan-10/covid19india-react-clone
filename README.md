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

- [My Css Study](https://github.com/ketan-10/Testing/tree/master/pages)

- [How to prevent scrollbar from repositioning web page?](https://stackoverflow.com/a/60383125/10066692)

- [How to remove blue highlight when you hold on input buttons in css?](https://stackoverflow.com/questions/35832150/how-to-remove-blue-highlight-when-you-hold-on-input-buttons-in-css)

- [Z-Index Stacking Context by Kevin Powell](https://youtu.be/uS8l4YRXbaw)

- Side Navbar - Position:Fixed on navbar, and margin left on content.

**React**

- [My Findings](https://github.com/ketan-10/Testing/tree/master/react)

**gh-pages with ViteJs**

- [How to Deploy Your Vite App to Github Pages // Vue app deployment in 5 quick steps](https://youtu.be/yo2bMGnIKE8)

  - `yarn build`
  - `git add dist -f`
  - `git commit -m "next version"`
  - `git subtree push --prefix dist origin gh-pages`

- [css url is not replaced- issue](https://github.com/vitejs/vite/issues/3980#issuecomment-870422216)

- [solution using public directory](https://vitejs.dev/guide/assets.html#the-public-directory)

- [Git gh-pages branch and newly created subtree in dist directory does not match git-history](https://stackoverflow.com/questions/33172857/how-do-i-force-a-subtree-push-to-overwrite-remote-changes)

- [Solution Just use npm gh-pages](https://www.npmjs.com/package/gh-pages)

**gh-pages with React-router**

- When we provide a url in gh-pages, github considers it as actual url
  But if we are using a single page application, the url will be stored in the browser history.

- eg https://ketan-10.github.io/covid19india-react-clone/about/ github will try to find the exact location
  but actually the location is https://ketan-10.github.io/covid19india-react-clone and /about is in the browser history api.

- So we add 404.html page which, github will trigger if no url match,
  and the 404.html will then convert that url to query string and pass to index.html,
  index.html will decode that query string and append the /about path in history api.

- [question: React-router with gh-pages](https://stackoverflow.com/questions/58228017/react-router-v4-cant-load-page-on-github-pages)

- [solution: spa-github-pages](https://github.com/rafgraph/spa-github-pages#how-it-works)

- [404.html with gh-pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

**D3.js**

- [D3.js tutorial by andrew chen](https://www.youtube.com/watch?v=UYrJ4jukvig&list=PLPtgdQ4YE9cgdPwOKShhPHdVEseLPGd_t)

**Animation**

- A Component renders multiple times, but animation should not happen each time component render.
- Also when we want to remove the element from the DOM, we cant just remove as there will be no animations.
- So all this is handled by [`useTransition`](https://react-spring.io/hooks/use-transition) this hook constructs a function according to first input parameter on each render:
  - If first-time-render (mounted) return function to _animate-IN_ the element.
  - On re-render if Old input same as new input, do nothing it's just parent component re-render
  - If Old input different from new input, return function to _animate-OUT_ existing element and _animate-IN_ new element if any.
- After _animate-OUT_ the parent component will re-render and destroy animating-out element.

- [My project using react-spring](https://github.com/ketan-10/emoji-rain/blob/master/src/components/FloatingIcons.tsx)

**Dark Mode**

- [useDarkMode stop first time flash when page loads](https://www.npmjs.com/package/use-dark-mode#that-flash)

- use `useDarkMode` hook in your navbar, on toggle it adds css class `dark-mode` to `body`, we can use this class in css to change colors with `!important`

- will re-render just the components where it's used, it uses [`use-persisted-state`](https://www.npmjs.com/package/use-persisted-state) to achieve this, which intern uses DOM event listeners to call others components, and share update with multiple hooks.

**Miscellaneous**
