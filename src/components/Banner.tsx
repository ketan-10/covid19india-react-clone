import React from 'react';
import { AlertTriangle, ArrowRight } from 'react-feather';

const Banner: React.FC = () => (
  <div className="banner fadeInDownAnimation">
    <AlertTriangle size={16} />
    <p>
      (Work in progress 🚧) A complete rewrite of covid19india.org using
      Typescript and few other changes.
    </p>
    <a
      href="https://github.com/ketan-10/covid19india-react-clone"
      target="_blank"
      rel="noreferrer"
    >
      Read more
      <ArrowRight size={16} />
    </a>
  </div>
);

export default Banner;
