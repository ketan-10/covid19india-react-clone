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

- [When should you NOT use React memo?](https://stackoverflow.com/questions/53074551/when-should-you-not-use-react-memo)

**CSS**

- [How to host your own fonts made simple](https://youtu.be/KzqQXDbDvus)

- [My Css Study](https://github.com/ketan-10/Testing/tree/master/pages)

- [How to prevent scrollbar from repositioning web page?](https://stackoverflow.com/a/60383125/10066692)

- [How to remove blue highlight when you hold on input buttons in css?](https://stackoverflow.com/questions/35832150/how-to-remove-blue-highlight-when-you-hold-on-input-buttons-in-css)

- [Z-Index Stacking Context by Kevin Powell](https://youtu.be/uS8l4YRXbaw)

- Side Navbar Desktop - `Position:Fixed` on navbar, and `margin left` on content.<br>
  For animation `left: -10rem`, Z-index stacking context as it should look coming from behind.

- Side Navbar Mobile - `Position:Fixed` on navbar. <br>
  For animation `hight:0vh` to `height:100vh`, `margin bottom` for extra height, `overflow: auto` so content does not overflow while animation.

- [Cleanest way to disable CSS transition effects temporarily](https://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily/16575811#16575811)

- Non Block elements like img, svg have default space in bottom as they were used to show text and some characters like 'g', 'y' go bellow text-baseline. [We have to remove that](https://stackoverflow.com/questions/24626908/how-to-get-rid-of-extra-space-below-svg-in-div-element).

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

**i18next**

- [Localise React Applications Using I18Next](https://youtu.be/txHU6lrsa3o)

- Configurations:

  - List of i18next [Configuration Options](https://www.i18next.com/overview/configuration-options)
  - http-backend [Configurations](https://github.com/i18next/i18next-http-backend)

- i18next works with plugins to support multiple frameworks, data sources types and language detections. <br>
  Code from [`i18next.js`](https://github.com/i18next/i18next/blob/master/src/i18next.js)

```js
const use = (module) => {
  if (module.type === 'backend') {
    this.modules.backend = module;
  }

  if (module.type === 'logger' || (module.log && module.warn && module.error)) {
    this.modules.logger = module;
  }

  if (module.type === 'languageDetector') {
    this.modules.languageDetector = module;
  }

  if (module.type === 'i18nFormat') {
    this.modules.i18nFormat = module;
  }

  if (module.type === 'postProcessor') {
    postProcessor.addPostProcessor(module);
  }

  if (module.type === '3rdParty') {
    this.modules.external.push(module);
  }

  return this;
};
```

- [Backend](https://www.i18next.com/overview/plugins-and-utils#backends) : how to fetch the translations from a server or file. <br> We can also specify multiple backends for fallback.

- [Language Detector](https://www.i18next.com/overview/plugins-and-utils#language-detector) : how to detect current language <br> Considers client location, cookies and query string.

- i18next provides functionality to register a callback to be called when the language changes. <br>
  But we want to re-render react components on language change, and want to use easy hooks to do that. <br>
  For that we use [i18next-react](https://react.i18next.com/guides/quick-start) a plugin categorized in `3rdParty` plugin.

  > by `i18n.use(initReactI18next)` we pass the i18n instance to react-i18next<br> which will make it available for all the components via the context api.

- i18next-react uses context API to pass the i18n configurations to the i18next form component and vice versa. But we have used `locales.ts` file for that.<br>
  To Detect changes for re-render i18next-react uses `useTranslation` hook which will internally registers the current hook to `i18n.on('languageChanged', (t) => setT(t))`.

**Suspense**

- With i18next App component is wrapped with `Suspense` component. : [A React component suspended while rendering, but no fallback UI was specified](https://stackoverflow.com/questions/54432861/a-react-component-suspended-while-rendering-but-no-fallback-ui-was-specified)

- [Lazy loading (and preloading) components in React 16.6](https://medium.com/hackernoon/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d)

- Future of Suspense [Data Fetching With Suspense In Relay | Joe Savona](https://youtu.be/Tl0S7QkxFE4)

**Miscellaneous**
