import {
  r as i,
  R as e,
  L as c,
  u as m,
  B as u,
  S as d,
  a as p,
  b as v,
} from './vendor.8d0deebb.js';
const f = function () {
  const a = document.createElement('link').relList;
  if (a && a.supports && a.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) n(t);
  new MutationObserver((t) => {
    for (const r of t)
      if (r.type === 'childList')
        for (const o of r.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(t) {
    const r = {};
    return (
      t.integrity && (r.integrity = t.integrity),
      t.referrerpolicy && (r.referrerPolicy = t.referrerpolicy),
      t.crossorigin === 'use-credentials'
        ? (r.credentials = 'include')
        : t.crossorigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function n(t) {
    if (t.ep) return;
    t.ep = !0;
    const r = s(t);
    fetch(t.href, r);
  }
};
f();
const E = ({ pages: l }) => {
    const [a, s] = i.exports.useState(!1),
      n = i.exports.useCallback(
        (t) => {
          s(!a);
        },
        [s, a]
      );
    return e.createElement(
      'div',
      { className: 'navbar' },
      e.createElement(
        'div',
        { className: 'navbar-container' },
        e.createElement(
          'div',
          { className: 'navbar__left', onClick: n },
          'English'
        ),
        e.createElement(
          'div',
          { className: 'navbar__middle' },
          e.createElement(
            c,
            { to: '/' },
            'Covid19',
            e.createElement('span', null, 'India')
          )
        ),
        e.createElement(
          'div',
          { className: 'navbar__right', onClick: n },
          a ? 'Close' : 'Menu'
        )
      ),
      a && e.createElement(g, { pages: l, setIsOpen: s })
    );
  },
  g = ({ pages: l, setIsOpen: a }) => {
    const s = m();
    return e.createElement(
      'div',
      { className: 'navbar__menu' },
      l
        .filter((n) => n.showInNavbar)
        .map((n) =>
          e.createElement(
            c,
            { key: n.displayName, to: n.pageLink, onClick: () => a(!1) },
            e.createElement(
              'span',
              { className: s.pathname === n.pageLink ? 'selected' : '' },
              n.displayName
            )
          )
        )
    );
  },
  N = () => {
    const l = [
      {
        pageLink: '/',
        view: e.createElement(e.Fragment, null, 'Home'),
        displayName: 'Home',
        showInNavbar: !0,
      },
      {
        pageLink: '/blog',
        view: e.createElement(e.Fragment, null, 'Blog'),
        displayName: 'Blog',
        showInNavbar: !0,
      },
      {
        pageLink: '/volunteers',
        view: e.createElement(e.Fragment, null, 'Volunteers'),
        displayName: 'Volunteers',
        showInNavbar: !0,
      },
      {
        pageLink: '/about',
        view: e.createElement(e.Fragment, null, 'About'),
        displayName: 'About',
        showInNavbar: !0,
      },
      {
        pageLink: '/state/:stateCode',
        view: e.createElement(e.Fragment, null, 'State'),
        displayName: 'State',
        showInNavbar: !1,
      },
    ];
    return e.createElement(
      'div',
      { className: 'app' },
      e.createElement(
        u,
        null,
        e.createElement(E, { pages: l }),
        e.createElement(
          d,
          null,
          l.map((a) =>
            e.createElement(
              p,
              { exact: !0, path: a.pageLink, key: a.pageLink },
              a.view
            )
          )
        )
      )
    );
  };
v.render(
  e.createElement(e.StrictMode, null, e.createElement(N, null)),
  document.getElementById('root')
);
