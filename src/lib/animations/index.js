// @flow
import { chain, tween, easing, stagger } from 'popmotion';
import { percent } from 'style-value-types';

type Styler = Object;

type Dimension = 'x' | 'y';

type Config = {
  styler: Styler,
  to?: number,
  ease?: any,
  delay?: number,
  duration?: number,
  dimension?: Dimension,
};

function slideIn({
  styler,
  to = -100,
  delay = 100,
  dimension = 'x',
}: Config) {
  return stagger(
    [
      translate({ styler, dimension, to }),
      opacity({ styler, to: 1 }),
    ],
    delay,
  ).pipe(([translate, op = { opacity: styler.get('opacity') }]) => ({
    translate: translate[dimension],
    opacity: op.opacity,
  }));
}

function slideOut({
  styler,
  to = -100,
  delay = 100,
  dimension = 'x',
}: Config) {
  return stagger(
    [
      opacity({ styler, to: 0 }),
      translate({ styler, dimension, to }),
    ],
    delay,
  ).pipe(
    ([
      { opacity },
      dim = { [dimension]: percent.parse(styler.get(dimension)) },
    ]) => ({
      opacity,
      translate: dim[dimension],
    }),
  );
}

function pop({ styler, duration = 100, to = 2 }: Config) {
  return chain(
    tween({ from: styler.get('scale'), to: { scale: to }, duration }),
    tween({ from: { scale: to }, to: { scale: 1 } }),
  );
}

function translate({
  styler,
  to,
  dimension = 'x',
  ease = easing.linear,
}: Config) {
  return tween({
    from: { [dimension]: percent.parse(styler.get(dimension)) },
    to: { [dimension]: to },
    duration: 300,
    easing: ease,
  });
}

function opacity({ styler, to, ease = easing.backIn }: Config) {
  return tween({
    from: {
      opacity: styler.get('opacity'),
    },
    to: { opacity: to },
    easing: ease,
  });
}

export { slideIn, slideOut, pop, translate, opacity };
