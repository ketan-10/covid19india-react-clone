import classNames from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, useTransition, animated } from 'react-spring';
import { PRIMARY_STATISTICS } from '../../Constants';

const Hey = (props) => {
  console.log(props);
  return <>Hello</>;
};

const hello = (Component: any) => {
  const displayName = 'Anonymous';
  console.log('COMPONENT: ', Component);
  // Component = hello[Component] = <div />;
  // if (typeof Component === 'string') {
  //   Component =
  //     animated[Component] ||
  //     (animated[Component] = withAnimated(Component, hostConfig));
  // } else {
  //   Component =
  //     Component[cacheKey] ||
  //     (Component[cacheKey] = withAnimated(Component, hostConfig));
  // }

  // Component.displayName = `Animated(${displayName})`;
  // return Component;
};

const MapSwitcher: React.FC = () => {
  // useTransition(items, key, { ... })

  const [flip, set] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { x } = useSpring({
    reverse: flip,
    from: { x: 0 },
    to: { x: 200 },
    x: 1,
    delay: 200,
    config: { duration: 2000 },
    onRest: () => set((flip) => !flip),
  });

  useEffect(() => {
    console.log('X is changed : ', x);
  }, [x]);

  const getNumber = () =>
    // console.log('HELLO :)');
    // If each time to is called, does that mean new Interpolation object is created on each render.

    x.to((n) => {
      console.log('NUMBER : ');
      return clicked ? n.toFixed(2) : n.toFixed(4);
    });
  console.log('RENDERING MAP SWITCHER : ', x, getNumber());
  // console.log('ANIMATED: ', Object.keys(animated));
  return (
    <div>
      {/* <animated.div>{{ hello: 'hello' }}</animated.div> */}
      {/* <hello.div>Hello</hello.div> */}
      <animated.div style={{ x }}>{x.to((n) => n.toFixed(1))}</animated.div>
      <animated.div style={{ x }}>{getNumber()}</animated.div>
      {/* <div>{getNumber()}</div> */}
      {/* <Hey ref={(value) => {}}>{{ name: 'ketan' }}</Hey> */}
      {/* <div className="map-switcher">
        {PRIMARY_STATISTICS.map((stat) => (
          <div key={stat} className={classNames('clickable', `is-${stat}`)} />
        ))}
      </div> */}
      <button type="button" onClick={() => setClicked((c) => !c)}>
        {clicked.toString()}
      </button>
    </div>
  );
};

export default MapSwitcher;
