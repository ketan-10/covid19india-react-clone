import React, { useState, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Page } from '../types/Types';

interface NavBarProps {
  pages: Array<Page>;
}

const NavBar: React.FC<NavBarProps> = ({ pages }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const history = useHistory(); // does not re-render on route change

  // console.log(history.location.pathname);
  const toggleMenu = useCallback(
    (_) => {
      setIsOpen(!isOpen);
    },
    [setIsOpen, isOpen]
  );

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar__left" onClick={toggleMenu}>
          English
        </div>
        <div className="navbar__middle">
          <Link to="/">
            Covid19<span>India</span>
          </Link>
        </div>
        <div className="navbar__right" onClick={toggleMenu}>
          {!isOpen ? 'Menu' : 'Close'}
        </div>
      </div>
      {isOpen && <Expand pages={pages} setIsOpen={setIsOpen} />}
    </div>
  );
};

interface ExpandProps {
  pages: Page[];
  setIsOpen: (isOpen: boolean) => void;
}
const Expand: React.FC<ExpandProps> = ({ pages, setIsOpen }) => {
  const location = useLocation(); // re-renders on route change unlike useHistory
  // const { location } = useHistory();
  return (
    <div className="navbar__menu">
      {pages
        .filter((p) => p.showInNavbar)
        .map((page) => (
          <Link
            key={page.displayName}
            to={page.pageLink}
            onClick={() => setIsOpen(false)}
          >
            <span
              className={location.pathname === page.pageLink ? 'selected' : ''}
            >
              {page.displayName}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default NavBar;
