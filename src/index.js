import {
  useRef, useEffect, useState, useCallback, useMemo,
} from 'react';
import { TweenSelf, TweenWaypoints } from 'tween-titan';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import getWaypointNodes from './utils/getWaypointNodes';

export function useTween({
  mode,
  margin,
  stepFunction = () => {},
  waypoints: rawWaypoints,
  dependencies = [],
}) {
  let tween = { store: '', destroy: () => {} };
  const onServer = typeof document === 'undefined';
  const ref = useRef();
  // const [tweenStyle, setStyle] = useState({});
  const [tweenProps, setTweenProps] = useState({});

  useEffect(() => {
    const waypoints = mode === 'waypoints' && !onServer
      ? getWaypointNodes(rawWaypoints)
      : rawWaypoints;

    const tweenFunction = mode === 'waypoints'
      ? TweenWaypoints
      : TweenSelf;

    const combinedStepFunction = (percent, style, target) => {
      const results = stepFunction(percent, style, target);
      const newProps = {
        style: cloneDeep(style),
        ...results,
      };

      if (!isEqual(tweenProps, newProps)) {
        setTweenProps(newProps);
      }
    };

    if (!onServer) {
      tween = tweenFunction.create({
        target: ref.current,
        margin,
        stepFunction: combinedStepFunction,
        waypoints,
        applyStyles: false,
      });
    }

    return () => {
      tween.destroy();
    };
  }, dependencies);

  return [ref, tweenProps];
};
