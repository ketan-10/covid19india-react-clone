import React, { useRef, useEffect } from 'react';
import { ArrowUp } from 'react-feather';
import { useTransition, animated } from 'react-spring';
import { useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';
import locales from '../i18/locales';
import { DomEvent } from '../types/Types';

interface Props {
  showLanguageSwitcher: boolean;
  setShowLanguageSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
}

const LanguageSwitcher: React.FC<Props> = ({
  showLanguageSwitcher,
  setShowLanguageSwitcher,
}) => {
  const { t, i18n } = useTranslation();

  // handle click away
  const clickAwayDiv = useRef(null);
  useClickAway(clickAwayDiv, (e: DomEvent) => {
    if (e.target?.className === 'navbar__left') return; // if the click is on the language switcher, do nothing
    setShowLanguageSwitcher(false);
  });

  // scroll to top when language switcher is clicked
  useEffect(() => {
    if (showLanguageSwitcher) {
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      // For Safari
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showLanguageSwitcher]);

  const showSwitcherTransition = useTransition(showLanguageSwitcher, {
    from: { opacity: 0, marginTop: '0px', marginBottom: '0px' },
    enter: { opacity: 1, marginTop: '100px', marginBottom: '400px' },
    leave: { opacity: 0, marginTop: '0px', marginBottom: '0px' },
    config: { mass: 1, tension: 100, friction: 15 },
  });

  return showSwitcherTransition(
    (style, shouldShow) =>
      shouldShow && (
        <animated.div className="ls-container" {...{ style }}>
          <p>{t('We speak the following languages')}</p>
          <div className="ls-list" ref={clickAwayDiv}>
            {Object.keys(locales).map((languageKey) => (
              <div
                key={languageKey}
                className={`ls-languages ${
                  i18n.language === languageKey ? 'ls-active ' : ''
                }`}
                onClick={() => {
                  i18n.changeLanguage(languageKey);
                  setShowLanguageSwitcher(false);
                }}
              >
                {locales[languageKey]}
              </div>
            ))}
          </div>
          <div
            className="ls-arrow"
            onClick={() => setShowLanguageSwitcher(false)}
          >
            <ArrowUp size="17" />
          </div>
        </animated.div>
      )
  );
};

export default React.memo(LanguageSwitcher);
