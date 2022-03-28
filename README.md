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

**esbuild && vitejs** <br>

- created vite app with : `yarn create vite`
- [WTF are Babel and Webpack 😵 ? Explained in 2 mins.](https://dev.to/getd/wtf-are-babel-and-webpack-explained-in-2-mins-43be)
  - We are using `tsc` insted of `babel` and `esbuild` insted of `webpack`
- [Let's Learn esbuild! (with Sunil Pai) — Learn With Jason](https://youtu.be/KLdF1yu_bmI)

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


**Immer with useReducer**

- [Using Immer with Reducers and React Hooks](https://youtu.be/FmKjwh34Rn8)

- [Carrier Produce](https://immerjs.github.io/immer/curried-produce) i.e. `produce` function which takes a function as a single parameter. <br>
- In `produce(reducer)` immer will convert the function where <br> first argument will be replaced with mutable <br>
We can override the `useReducer` hook like following
```js
const useImmerProducer = (reducer, initState) =>  {
  return React.useReducer(produce(reducer), initState)
}
```
- So instead of writing actions like following <br>
Before: 
```js
const actionReducer = (state, action) => {
  switch(action.type) {
    case SET_COUNT:
      return produce(state, (mutableState) => {
        mutableState.count = action.count
      })
  }
}
```
After:
```js
const actionReducer = (state, action) => {
  switch(action.type) {
    case SET_COUNT:
      state.count = action.count
      return;
  }
}
```
- Inner Implementation:
```js
const produceFunc = (myFun) => {
  return (args) => {
    return produce(args[0], (mutable) => {
      myFun(mutable, args[1:])
    })
  }
}
```

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

- Transition vs Animation:

  - `transition` requires some trigger like `:hover`
  - `animation` can self start.
  - `transition` binds to a specific css attribute which can animate like `opacity` or `transform`
    <br> So whenever that field is changed by trigger or by addition or removal of some css class from javascript, it will be automatically animated from old to new value, after css parsing is completed.
  - `transition` have only 2 state where as `animation` can have any number of `keyframes`
  - [How to play an animation on hover and pause when hover is not active](https://stackoverflow.com/questions/38888453/how-to-play-an-animation-on-hover-and-pause-when-hover-is-not-active)

- [What is difference between justify-self, justify-items and justify-content in CSS grid?](https://stackoverflow.com/questions/48535585/what-is-difference-between-justify-self-justify-items-and-justify-content-in-cs)

- Flex vs Grid:
  - I got a 💝 form Kevin Powell : [No justify-self in Flexbox? No problem!](https://www.youtube.com/watch?v=q08BbYNG8h0&lc=z225ujzz1n2pwdnae04t1aokgqagymbaqol0d52l1yvhrk0h00410)
  - Notice the '6' didn't got pushed up to below '1'.
  - In flex rows align perfectly. but column does not.
  - (side note: `flex-warp` works kind of like `grid`, <br> but you cant set something like `fr` unit or `flex-grow` in flex on vertical direction i.e on flex-wrap direction )
  - So to wiggle the cell up and down within the row, we have `align-items` property.
  - But as the columns don't lineup like rows do, we don't have `justify-items` property in flex
  - Though we have `align-content` property with `flex-wrap` to control all rows as a complete content.
  - In `Grid` we have `justify-item` property as in grid unlike flex columns also lineup perfectly.

| Justify                                                                                                     | Align                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![1](https://user-images.githubusercontent.com/35309821/145279500-bf5dedf9-3438-4155-aaee-1a2b066ad60b.png) | ![2](https://user-images.githubusercontent.com/35309821/145279542-f791c906-2328-403f-87c6-71f41632c390.png) |


**React**

- [My Findings](https://github.com/ketan-10/Testing/tree/master/react)

- React useEffect can't have async function: [React Hook Warnings for async function in useEffect: useEffect function must return a cleanup function or nothing](https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret)

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

- React Router 6 : [React Router 6 - What Changed & Upgrading Guide](https://www.youtube.com/watch?v=zEQiNFAwDGo)

**D3.js**

- SVG: [What are SVG viewport and viewBox? [ A beginners guide to SVG part 3 ]](https://www.youtube.com/watch?v=TBYJ2V1jAlA&list=PL4-IK0AVhVjP0EeV513_b30lhGRTfMbYd&index=3)

- [D3.js tutorial by andrew chen](https://www.youtube.com/watch?v=UYrJ4jukvig&list=PLPtgdQ4YE9cgdPwOKShhPHdVEseLPGd_t)

- [My D3 Projects](https://github.com/ketan-10/Testing/tree/master/pages/d3)
- TODO: 
  - https://observablehq.com/@d3/selection-join
  - https://observablehq.com/@d3/general-update-pattern
  - Thinking with join : https://bost.ocks.org/mike/join/
  - https://www.intothevoid.io/data-visualization/understanding-d3-data-vs-datum/

**Animation**

- A Component renders multiple times, but animation should not happen each time component render.
- Also when we want to remove the element from the DOM, we cant just remove as there will be no animations.
- So all this is handled by [`useTransition`](https://react-spring.io/hooks/use-transition) this hook constructs a function according to first input parameter on each render:
  - If first-time-render (mounted) return function to _animate-IN_ the element.
  - On re-render if Old input same as new input, do nothing it's just parent component re-render
  - If Old input different from new input, return function to _animate-OUT_ existing element and _animate-IN_ new element if any.<br>
    `useRef` is used to store the previous _animate-OUT_ components.
- After _animate-OUT_ the parent component will re-render and destroy animating-out element.
- useTransition hooks job is **not** to actually render the animation, but it is as follows:

  - The first input parameter convert it into an array if not already(will discuss next) <br>
    [and save it in useRef for later use.](https://github.com/pmndrs/react-spring/blob/master/packages/core/src/hooks/useTransition.tsx#L97) save it inside `useLayoutEffect` so it's saved when the function is complete, i.e at end. (like defer in golang)
  - Check the previous value of first input parameter. it there add it to the `transition` array with `TransitionPhase.LEAVE`.
  - There are following transition-phases:
    - `TransitionPhase.ENTER`
    - `TransitionPhase.LEAVE`
    - `TransitionPhase.UPDATE`
    - `TransitionPhase.UNMOUNT`
  - Read the second input, which is configuration object, and calculate animation object from that(using physics 😄)
  - With the animation object of new and old element data (`TransitionPhase.ENTER` and `TransitionPhase.LEAVE`) <br>
    and actual new and old data, stored in array call the [`renderTransitions` function](https://github.com/pmndrs/react-spring/blob/master/packages/core/src/hooks/useTransition.tsx#L356) two times, for both old and new element. <br>
  - If the first input value has not changed. Due to component re-render for another update or first time render.<br>
    It will be just one (same) element. so useTransition will not detect any changes. <br>
    and the animation object will have no animations.

- animation object created by `useTransition` is only understood by `animated.<div|h1|p|...>` component. <br>
  and it can even be used multiple times inside the function.
- `animated` component `does not re-render the react-component` while animating. <br>
  It uses something called [`react forwardRef`](https://reactjs.org/docs/forwarding-refs.html) <br>
  to set/update css style value directly by bypassing react renderer. [withAnimated source-code](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/withAnimated.tsx#L25) <br>

- Use Transition for Array of Elements:
  - If we have `n-number` of animation targets. Like in this case we have array of `Volunteers` to animate. <br>
    They could be added or removed.
  - We have to make sure we don't just un-mount the removed element from the array. <br>
    As this will mean no _transition-out_ animation.
  - So `useTransition` supports animate the array of elements. <br>
    We pass the data array to the useTransition first parameter and also pass the key to identify the element. <br>
    Now `useTransition` determine using key and pervious-input (from use-ref), if the element is new or old. <br>
    and determine the transition-phase for each-data(element) in the array. <br>
  - For each data(element) the function is called with style(animation-object) and element-data from the array.
  - [Volunteers Github Gist](https://gist.github.com/ketan-10/81977644846fed3d31596d33fd928487)
  - To test this try to call transition function in the component, when we log the return value it is the ReactFragment containing 2 children. one rendering in and one rendering out.
  ```jsx
  const components = navbarTransition((style, item) => {
    console.log('rendering: ', style, item);
    return (
      <animated.div {...{ style }} className="nav-animated-menu">
        Hello
      </animated.div>
    );
  });
  console.log('COMPONENT: ', components);
  ```
- [My project using react-spring](https://github.com/ketan-10/emoji-rain/blob/master/src/components/FloatingIcons.tsx)
- [**UseSpring**](https://react-spring.io/basics)

  - Consider following example

  ```jsx
  const TestAnimation: React.FC = () => {
    const [clicked, setClicked] = useState(false);
    const [flip, set] = useState(false);

    const { x } = useSpring({
      reverse: flip,
      from: { x: 0 },
      to: { x: 200 },
      x: 1,
      delay: 200,
      config: { duration: 2000 },
      onRest: () => set((flip) => !flip),
    });

    const getNumber = () =>
      x.to((n) => (clicked ? n.toFixed(0) : n.toFixed(2)));

    return (
      <>
        <animated.div style={{ x }}>{x.to((n) => n.toFixed(1))}</animated.div>
        <animated.div style={{ x }}>{getNumber()}</animated.div>
        <button type="button" onClick={() => setClicked((c) => !c)}>
          {clicked.toString()}
        </button>
      </>
    );
  };

  export default TestAnimation;
  ```

  - Which creates following output:

  ![CPT2203012016-432x60](https://user-images.githubusercontent.com/35309821/156204192-ffb8491b-4c24-47bd-a50e-1783c5243f56.gif)

  - **Objectives:**

    - When Parent Component re-render it should not affect animation state.
    - Parent Component should **not** re-render on each animation frame.

  - I think of `useSpring` as building block for `useTransition`.<br>
  - UseTransition works with data or data array, using data binding. <br>By keeping track of pervious data and add or remove animation accordingly <br>
  - Where as in `useSpring` we can define when animation to start and stop.
  - Use Spring hook returns an `SpringValue` object. <br>
    Which is memoized, so does not change on re-render. <br>
    and we can add multiple observers to it, for animation.

  - If you check when `x` value changes, it does not change on re-render.
    ```js
    useEffect(() => {
      console.log('X is changed : ', x);
    }, [x]);
    ```

- **Animation.[div|h1|...] Component**

  - When using animations we have to use react component like `animated.div` or `animated.h1` etc. <br>
  - In JSX the following syntax is converted to [Following](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=DwPgUAkMAmCWBuIDeSAWBTANpg9gLgAIAiAa3QBcBDAOyIF87gB6ORMAgqG2AW0vPTQAdKxAAJLLmbc-A4aLDNwQA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.17.6&externalPlugins=&assumptions=%7B%7D) <br>
    So basically `div`, `h1`, `p`, are all react components\* on Object `animated` <br>
    [Here it is](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/createHost.ts#L60) added in react-spring source code, And [Here it is](https://github.com/pmndrs/react-spring/blob/master/targets/web/src/primitives.ts) the list of all primitives
  - In source `animated.div` is created with [this code](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/withAnimated.tsx) in `withAnimated` Function. Which is called by above code `animated('div')`<br>
  - **NOTE:** All the primitives as Components are created on `animated` Object when we import `react-spring` regardless of will use it or not. <br>
    Those are created by `createHost` in [index file](https://github.com/pmndrs/react-spring/blob/master/targets/web/src/index.ts#L16) only.
  - All this components are [created as a Forward Ref](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/withAnimated.tsx#L30)
    so we can access the direct reference of html element to animate.

- **`Animation.div` inputs and Interpolation object**

  - As in the example we have multiple animation for same `x` object.
  - `x.to((n) => n.toFixed(1))` this line returns an Interpolation object. <br> It is an Observer which will observer on `x` and create animation by updating current component using [`givenRef`](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/withAnimated.tsx#L30).
  - If we notice, we are directly passing `{ x }` to `style` props. <br>
    The `style` prop is considered special react-spring will automatically create Interpolation for it. <br>
    it's done by creating `AnimationStyle` object by calling [`host.createAnimatedStyle(props.style)`](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/withAnimated.tsx#L114) on each render.
  - In The example we are passing `x.to((n) => n.toFixed(1))` directly as a children. <br> If we pass Object as a child to Custom Component, it goes to `props.children`. Which react-spring will use to create animation.
  - On each render, new Observers will be attached and previous Observers will be unsubscribed. It is done by keeping the `lastObserver` in ref, and useEffect for each render. [Source Code](https://github.com/pmndrs/react-spring/blob/master/packages/animated/src/withAnimated.tsx#L69)

- Note:

  - As per example Following works

  ```jsx
  <animated.div>{x.to((n) => n.toFixed(1))}</animated.div>
  ```

  - But the following does not:

  ```jsx
  <animated.div> Hello {x.to((n) => n.toFixed(1))}</animated.div>
  <animated.div></div>{x.to((n) => n.toFixed(1))}</div></animated.div>
  ```

  As the Interpolation object outside the `style` prop, <br>
  will only work if it is set directly as an object on `prop` for this example `prop.children`.

- **Takeaways in Objectives:**
  - When Parent Component re-render it should not affect animation state.
    - As we return the same `x` object (SpringValue) each time, the object will not change so does the animation state.
    - The Interpolation Observers (`x.to((n) => n.toFixed(1))`) are created from the **current state** of SpringValue(`x`) **Each render**, <br> And the previous observers are un-subscribed each render.
  - Parent Component should **not** re-render on each animation frame.
    - The when Interpolation object will observe the change, <br> It has the `givenRef` of forwarded ref, so it will directly change the HTML using ref.

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

- [Suspense with SWR](https://swr.vercel.app/docs/suspense)

- TODO: experimental will be useless/updated in react18 [Concurrent UI Patterns](https://reactjs.org/docs/concurrent-mode-patterns.html)

**Data Fetching**

- [SWR](https://swr.vercel.app/) (_state-with-rehydration_) is a data data fetching and caching library which uses `cache invalidation` strategy. <br>
  SWR first returns the data from cache (stale), then sends the request (revalidate), and finally comes with the up-to-date data again.

- When link change keep the old result and don't return undefine: [Keep previous result while revalidating](https://github.com/vercel/swr/issues/192)

**Position: Sticky**

- About `position: sticky` by kevin powell : [A couple of cool things you can do with CSS position sticky](https://youtu.be/8TyoihVGErI)

- Not work with `overflow` property set [How to fix Issues with css position sticky Not Working](https://www.designcise.com/web/tutorial/how-to-fix-issues-with-css-position-sticky-not-working)

- Github issue on w3c: [[css3 positioning] support position:sticky inside an overflow:hidden|auto on general parents](https://github.com/w3c/csswg-drafts/issues/865)

- Javascript solution: [Position: stuck; — and a way to fix it](https://uxdesign.cc/position-stuck-96c9f55d9526)

**Typescript**

- [My Typescript Notes](https://github.com/ketan-10/Testing/tree/master/Typescript)

- Typescript checks are all only compile time <br>
  It's easy to know at first glance but also easy to forget <br>
  i.e we cant have variables in type we have to use typeof

- Utility types: [Extract](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union) <br>
  [Custom union type](https://stackoverflow.com/questions/55773761/converting-object-to-union-type)

```ts
type ObjectUnionType<T> = T[keyof T];

const one = {
  a: 1,
  b: 'ketan',
  c: true,
};

const two = one as { [P in 'a' | 'c']: typeof one[P] }; // pick -> https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys

// typeof two
const two: {
  a: number;
  c: boolean;
};

const myVar = 'a' as keyof typeof one;
// typeof myVar
const myVar: 'a' | 'c' | 'b';

// following are same:
const three = one[myVar] as typeof one[keyof typeof one];
const four = one[myVar] as ObjectUnionType<typeof one>;

// typeof three
const three: string | number | boolean;
// typeof four
const four: ObjectUnionType<{
  a: number;
  b: string;
  c: boolean;
}>;
```

- VS-Code show expanded type: [How can I see the full expanded contract of a Typescript type?](https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type)

```ts
type test = SomeFunction;
type test = Expand<SomeFunction>;
// expands object types one level deep
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// expands object types recursively
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;
```

- [TypeScript: How to get types from arrays](https://steveholgado.com/typescript-types-from-arrays/)

```ts
const animals = ['cat', 'dog', 'mouse'] as const;
type Animal = typeof animals[number];
```

**Reflow-Event & Critical-Rendering-Path & UseLayoutEffect - Updating the DOM element size without the flicker**

- [Learn useLayoutEffect In 5 Minutes](https://www.youtube.com/watch?v=wU57kvYOxT4)

- `useEffect` runs `after` DOM is rendered on the page or in parallel, <br>
  Due to this if we `update DOM element` in useEffect there we see a `flicker` and old position is displayed for a sec.<br>
  So `useLayoutEffect` runs before Render, so there will be no flicker. <br>

- If `useLayoutEffect` runs before render. How we able to read the element size?<br>
  [How does React measure DOM Elements in useLayoutEffect hook correctly before browser gets a chance to paint?](https://stackoverflow.com/questions/60769022/how-does-react-measure-dom-elements-in-uselayouteffect-hook-correctly-before-bro)<br>
  Basically useLayoutEffect runs after Dom have been parsed by the browser but not rendered. <br>
  This same Feature is used with native javascript when we update the dom layout, and then read it. <br>
  This is called `reflow event`: [My findings on `reflow-event` and `critical-rendering-path`](https://github.com/ketan-10/Testing/tree/master/BrowserCriticalRenderingPath)

**Miscellaneous**

- [Retry Promise](https://github.com/ketan-10/Testing/blob/master/coroutine-async-await/retry-promise.js)

```js
  {"ketan":"this",...(true == true && {"hello":"hi"})}
```
