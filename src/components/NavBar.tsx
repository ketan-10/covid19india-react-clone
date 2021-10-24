import React, { useState, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useLockBodyScroll, usePageLeave, useWindowSize } from 'react-use';
import { Book, HelpCircle, Home, Moon, Sun, Users } from 'react-feather';
import { Page } from '../types/Types';

interface NavBarProps {
  pages: Array<Page>;
}

const NavBar: React.FC<NavBarProps> = ({ pages }) => {
  const [isOpen, setIsOpen] = useState(false);
  useLockBodyScroll(isOpen);
  // const history = useHistory(); // does not re-render on route change
  const location = useLocation(); // re-renders on route change unlike useHistory

  const windowSize = useWindowSize(); // this hook will re-render every time the window size changes, but user usually doesn't resize the window so it's not a big deal.

  usePageLeave(() => {
    setIsOpen(false);
  }); // Triggers on mouseout from HTML element :- https://github.com/streamich/react-use/blob/3dc2dc3aff3b9b7dffc81b4409aad80265579664/src/usePageLeave.ts

  const toggleMenu = useCallback(
    (_) => {
      setIsOpen(!isOpen);
    },
    [setIsOpen, isOpen]
  );

  console.log('re-rendering.... NavBar');

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar__left" onClick={toggleMenu}>
          English
        </div>
        <div className="navbar__middle">
          <Link to="/">
            Covid19<span className="space"> </span>
            <span className="blue">India</span>
          </Link>
        </div>
        <div
          className="navbar__right"
          {...{
            onClick: windowSize.width <= 768 ? toggleMenu : undefined,
          }}
        >
          {windowSize.width <= 768 ? (
            <span>{!isOpen ? 'Menu' : 'Close'}</span>
          ) : (
            <div
              className="nav-icons"
              onMouseEnter={setIsOpen.bind(null, true)}
            >
              <Link to="/">
                <Home {...activeNavIcon(location.pathname, '/')} />
              </Link>
              <Link to="/blog">
                <Book {...activeNavIcon(location.pathname, '/blog')} />
              </Link>
              <Link to="/volunteers">
                <Users {...activeNavIcon(location.pathname, '/volunteers')} />
              </Link>
              <Link to="/about">
                <HelpCircle {...activeNavIcon(location.pathname, '/about')} />
              </Link>
              <Link to="/">
                <Moon />
              </Link>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <Expand
          pages={pages}
          setIsOpen={setIsOpen}
          windowSize={windowSize}
          pathName={location.pathname}
        />
      )}
    </div>
  );
};

interface ExpandProps {
  pages: Page[];
  setIsOpen: (isOpen: boolean) => void;
  // windowSize: { width: number };
  windowSize: ReturnType<typeof useWindowSize>;
  pathName: string;
}
const Expand: React.FC<ExpandProps> = ({
  pages,
  setIsOpen,
  windowSize,
  pathName,
}) => (
  <div
    className="navbar__menu"
    {...{
      onMouseLeave:
        windowSize.width > 768 ? setIsOpen.bind(null, false) : undefined,
    }}
  >
    {pages
      .filter((p) => p.showInNavbar)
      .map((page) => (
        <Link
          key={page.displayName}
          to={page.pageLink}
          onClick={() => setIsOpen(false)}
        >
          <span className={pathName === page.pageLink ? 'selected' : ''}>
            {page.displayName}
          </span>
        </Link>
      ))}
    <span className="expand-bottom">A crowdsourced initiative</span>
  </div>
);

export default NavBar;

// if we define the function inside the component we will have to use 'useCallback'
// the disadvantage of using it outside that we cant use 'activeNavIcon.bind(location.pathname)'
const activeNavIcon = (pathName: string, path: string) => ({
  style: {
    stroke: pathName === path ? '#4c75f2' : '',
  },
});
