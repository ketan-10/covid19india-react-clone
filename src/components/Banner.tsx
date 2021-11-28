import React from 'react';
import { AlertTriangle, ArrowRight } from 'react-feather';

const Banner: React.FC = () => (
  <div className="banner fadeInDownAnimation">
    <AlertTriangle size={16} />
    <p>
      After 18 months of daily updates, we stopped our operations on 31st
      October, 2021. You can only view data from January 2020 to October 2021 on
      this website.
    </p>
    <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
      Read more
      <ArrowRight size={16} />
    </a>
  </div>
);

export default Banner;
