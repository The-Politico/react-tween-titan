/* eslint-disable import/prefer-default-export */
import {
  useRef, useEffect, useState,
} from 'react';
import { TweenSelf, TweenWaypoints } from 'tween-titan';
import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';
import getWaypointNodes from './utils/getWaypointNodes';

export function useTween({
  mode,
  margin,
  stepFunction = () => {},
  waypoints: rawWaypoints,
  dependencies = [],
  refreshInterval = null,
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
          ...resultsStyle,
        },
      };

      if (!isEqual(tweenProps, newProps)) {
        setTweenProps(newProps);
      }
    };

    const tween = tweenFunction.create({
      target: ref.current,
      margin,
      stepFunction: combinedStepFunction,
      waypoints,
      applyStyles: false,
      refreshInterval,
    });

    return () => {
      tween.destroy();
    };
  }, dependencies);

  return [ref, tweenProps];
}
