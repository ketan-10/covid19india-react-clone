import './App.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Page } from './types/Types';

const App: React.FC = () => {
  const pages: Array<Page> = [
    {
      pageLink: '/',
      view: <>Home 1</>,
      displayName: 'Home',
      showInNavbar: true,
    },
    {
      pageLink: '/blog',
      view: <>Blog</>,
      displayName: 'Blog',
      showInNavbar: true,
    },
    {
      pageLink: '/volunteers',
      view: <>Volunteers</>,
      displayName: 'Volunteers',
      showInNavbar: true,
    },
    {
      pageLink: '/about',
      view: <>About</>,
      displayName: 'About',
      showInNavbar: true,
    },
    {
      pageLink: '/state/:stateCode',
      view: <>State</>,
      displayName: 'State',
      showInNavbar: false,
    },
  ];
  return (
    <div className="app">
      <Router>
        <NavBar pages={pages} />
        <Switch>
          {pages.map((page) => (
            <Route exact path={page.pageLink} key={page.pageLink}>
              {page.view}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
