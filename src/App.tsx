import './App.scss';
import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Page } from './types/Types';
import { BASE_URL } from './Constants';
import { retry } from './utils/commonFunctions';
import Footer from './components/Footer';
import Banner from './components/Banner';

// lazy and retry take function as argument instead of promise, as they can initiate the promise.
const Volunteers = lazy(() => retry(() => import('./components/Volunteers')));
const Main = lazy(() => retry(() => import('./components/Main')));

// import LanguageSwitcher from './components/LanguageSwitcher';
const LanguageSwitcher = lazy(() =>
  retry(() => import('./components/LanguageSwitcher'))
);

const About = () => {
  window.location.replace(
    'https://ketan-10.github.io/markdown-printer/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fketan-10%2Fcovid19india-react-clone%2Fmaster%2FREADME.md'
  );
  return <></>;
};

const App: React.FC = () => {
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
  const pages: Array<Page> = [
    {
      pageLink: '/',
      view: <Main />,
      displayName: 'Home',
      showInNavbar: true,
    },
    {
      pageLink: '/blog',
      view: <Volunteers />,
      displayName: 'Blog',
      showInNavbar: true,
    },
    {
      pageLink: '/volunteers',
      view: <Volunteers />,
      displayName: 'Volunteers',
      showInNavbar: true,
    },
    {
      pageLink: '/about',
      view: <About />,
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
      <Router basename={BASE_URL}>
        <Suspense fallback={<div />}>
          <LanguageSwitcher
            {...{ showLanguageSwitcher, setShowLanguageSwitcher }}
          />
        </Suspense>
        <NavBar
          pages={pages}
          setShowLanguageSwitcher={setShowLanguageSwitcher}
        />
        <Banner />
        <Suspense fallback={<div />}>
          <div className="page">
            <Routes>
              {/* <Suspense fallback={<h2>Loading.</h2>}> */}
              {/* <- If suspense was used here footer will be shown until the Volunteers useSWR data loads */}
              {pages.map((page) => (
                <Route
                  path={page.pageLink}
                  key={page.pageLink}
                  element={page.view}
                />
              ))}
              {/* </Suspense> */}
            </Routes>
          </div>
          <Footer /> {/* Footer is used inside the suspense so, */}
          {/* it will be rendered on concurrent mode, until the Volunteers data loads */}
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
