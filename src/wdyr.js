/* eslint-disable */
import * as React from 'react';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = await import(
    '@welldone-software/why-did-you-render'
  ).then((x) => x.default);
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
