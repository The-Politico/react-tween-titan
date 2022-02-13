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
  const ref = useRef();
  const [tweenProps, setTweenProps] = useState({});

  useEffect(() => {
    const waypoints = mode === 'waypoints'
      ? getWaypointNodes(rawWaypoints)
      : rawWaypoints;

    const tweenFunction = mode === 'waypoints'
      ? TweenWaypoints
      : TweenSelf;

    const combinedStepFunction = (percent, style, target) => {
      const results = stepFunction(percent, style, target);
      const resultsStyle = results?.style || {};

      const newProps = {
        ...results,
        style: {
          ...cloneDeep(style),
          ...resultsStyle
        },
      };

      if (!isEqual(tweenProps, newProps)) {
        setTweenProps(newProps);
      }
    };

  //  if (!onServer) {
      const tween = tweenFunction.create({
        target: ref.current,
        margin,
        stepFunction: combinedStepFunction,
        waypoints,
        applyStyles: false,
      });
      return () => {
        tween.destroy();
      };
  //  }

    return;

  }, dependencies);

  return [ref, tweenProps];
};
