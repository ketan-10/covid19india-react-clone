import classnames from 'classnames';
import React from 'react';
import {
  GitHub,
  Database,
  Send,
  Twitter,
  Instagram,
  Mail,
} from 'react-feather';

const Icons = {
  github: {
    icon: <GitHub />,
    url: '',
  },
  database: {
    icon: <Database />,
    url: '',
  },
  send: {
    icon: <Send />,
    url: '',
  },
  twitter: {
    icon: <Twitter />,
    url: '',
  },
  instagram: {
    icon: <Instagram />,
    url: '',
  },
  mail: {
    icon: <Mail />,
    url: '',
  },
};

const Footer: React.FC = () => (
  <footer className="footer__container">
    <p className="footer__title">covid19india</p>
    <h5>We stand with everyone fighting on the frontlines</h5>
    <div className="footer__links">
      {Object.entries(Icons).map(([key, value]) => (
        <a
          key={key}
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className={classnames('icon', key)}
        >
          {value.icon}
        </a>
      ))}
    </div>
  </footer>
);

// export
export default Footer;
