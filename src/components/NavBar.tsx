import React, { useState, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useLockBodyScroll, usePageLeave, useWindowSize } from 'react-use';
import { Book, HelpCircle, Home, Moon, Sun, Users } from 'react-feather';
import { useTransition, animated } from 'react-spring';
import useDarkMode, { DarkMode } from 'use-dark-mode';
import { useTranslation } from 'react-i18next';
import { Page } from '../types/Types';
import locales from '../i18/locales';
import {
  NAVBAR_SLID_IN,
  NAVBAR_SLID_OUT,
  NAVBAR_SLID_IN_MOBILE,
  NAVBAR_SLID_OUT_MOBILE,
} from '../animations';

interface NavBarProps {
  pages: Array<Page>;
  setShowLanguageSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ pages, setShowLanguageSwitcher }) => {
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

  const toggleLanguageSwitcher = useCallback(
    (_) => {
      setShowLanguageSwitcher((isShow) => !isShow);
    },
    [setShowLanguageSwitcher]
  );

  const darkMode = useDarkMode(false);

  const { t, i18n } = useTranslation();
  const currentLanguage = Object.keys(locales).includes(i18n.language)
    ? i18n.language
    : (i18n.options.fallbackLng as string[])[0];

  const navbarTransition = useTransition(isOpen, {
    ...(windowSize.width < 768
      ? {
          from: NAVBAR_SLID_IN_MOBILE,
          enter: NAVBAR_SLID_OUT_MOBILE,
          leave: NAVBAR_SLID_IN_MOBILE,
        }
      : {
          from: NAVBAR_SLID_IN,
          enter: NAVBAR_SLID_OUT,
          leave: NAVBAR_SLID_IN,
        }),
    config: { mass: 1, tension: 210, friction: 26 },
  });

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar__left" onClick={toggleLanguageSwitcher}>
          {locales[currentLanguage]}
        </div>
        <div className="navbar__middle">
          <Link to="/">
            Covid19<span className="space"> </span>
            <span className="blue">India</span>
          </Link>
        </div>
        <div
          className="navbar__right"
          {...(windowSize.width < 769 && {
            onClick: toggleMenu,
          })}
        >
          {windowSize.width < 769 ? ( // MOBILE
            <span>{!isOpen ? t('Menu') : t('Close')}</span>
          ) : (
            // DESKTOP
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
              <a onClick={darkMode.toggle}>
                {darkMode.value ? <Sun color="#ffc107" /> : <Moon />}
              </a>
            </div>
          )}
        </div>
      </div>
      {navbarTransition(
        (style, item) =>
          item && (
            <animated.div {...{ style }} className="nav-animated-menu">
              <Expand
                {...{ pages, setIsOpen, windowSize, darkMode }}
                pathName={location.pathname}
              />
            </animated.div>
          )
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
  darkMode: DarkMode;
}
const Expand: React.FC<ExpandProps> = ({
  pages,
  setIsOpen,
  windowSize,
  pathName,
  darkMode,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className="navbar__menu"
      {...(windowSize.width >= 769 && {
        onMouseLeave: setIsOpen.bind(null, false),
      })}
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
              {t(page.displayName)}
            </span>
          </Link>
        ))}
      {windowSize.width < 769 && (
        <a onClick={darkMode.toggle}>
          {darkMode.value ? <Sun color="#ffc107" /> : <Moon />}
        </a>
      )}
      <span className="expand-bottom">{t('A crowdsourced initiative.')}</span>
    </div>
  );
};

export default NavBar;

// if we define the function inside the component we will have to use 'useCallback'
// the disadvantage of using it outside that we cant use 'activeNavIcon.bind(location.pathname)'
const activeNavIcon = (pathName: string, path: string) => ({
  style: {
    stroke: pathName === path ? '#4c75f2' : '',
  },
});
