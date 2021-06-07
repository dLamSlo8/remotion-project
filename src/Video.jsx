/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useMemo } from 'react';
import {Composition} from 'remotion';
import Main from './components/Main';

const videoMetadata = {
  timePerInterval: {
    minutes: 15
  },
  totalTime: {
    hours: 8,
  },
  intervalGracePeriod: {
    seconds: 5
  },
  actionText: "Drink water please.",
  timerText: "Drink water in"
};

export const RemotionVideo = () => {
  const timePerInterval = useMemo(() => {
    const { hours, minutes, seconds } = videoMetadata.timePerInterval;
    let totalTime = 0;

    if (hours) {
      totalTime += hours * 60 * 60;
    }
    if (minutes) {
      totalTime += minutes * 60;
    }
    if (seconds) {
      totalTime += seconds;
    }

    return totalTime;
  }, []);

  const intervalGracePeriod = useMemo(() => {
    const { hours, minutes, seconds } = videoMetadata.intervalGracePeriod;
    let totalTime = 0;

    if (hours) {
      totalTime += hours * 60 * 60;
    }
    if (minutes) {
      totalTime += minutes * 60;
    }
    if (seconds) {
      totalTime += seconds;
    }

    return totalTime;
  }, []);

  const totalTime = useMemo(() => {
    const { hours, minutes, seconds } = videoMetadata.totalTime;
    let totalTimeGoal = 0;

    if (hours) {
      totalTimeGoal += hours * 60 * 60;
    }
    if (minutes) {
      totalTimeGoal += minutes * 60;
    }
    if (seconds) {
      totalTimeGoal += seconds;
    }

    const numIntervals = Math.ceil((totalTimeGoal - intervalGracePeriod) / (timePerInterval + intervalGracePeriod));

    return intervalGracePeriod + (timePerInterval + intervalGracePeriod) * numIntervals;
  }, [timePerInterval, intervalGracePeriod]);

	return (
	
      <Composition 
      id="Main"
      component={Main}
      durationInFrames={totalTime * 30}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        ...videoMetadata,
        timePerInterval,
        intervalGracePeriod,
        totalTime
      }
      } />

	);
};
