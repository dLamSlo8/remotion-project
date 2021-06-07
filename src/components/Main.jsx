import { useMemo } from 'react';
import { useVideoConfig } from 'remotion';
import MainContext from '../contexts/MainContext';
import Counter from './Counter';
import MainText from './MainText';
import Graphic from './Graphic';

const Main = ({ timePerInterval, intervalGracePeriod, totalTime, actionText, timerText }) => {
  const { fps } = useVideoConfig();

  const timerStart = useMemo(() => {
    return Array.from({ length: Math.floor((totalTime - intervalGracePeriod) / (timePerInterval + intervalGracePeriod)) + 1 }, (_, i) => (intervalGracePeriod + i * (timePerInterval + intervalGracePeriod)) * fps);
  }, [timePerInterval, intervalGracePeriod, totalTime]);

  const actionStart = useMemo(() => {
    return Array.from({ length: Math.floor((totalTime - intervalGracePeriod) / (timePerInterval + intervalGracePeriod)) + 2 }, (_, i) => (i * (timePerInterval + intervalGracePeriod)) * fps);
  }, [timePerInterval, intervalGracePeriod, totalTime]);

  const actionEndStart = useMemo(() => {
    return actionStart.map((val) => val + (intervalGracePeriod * fps));
  }, [actionStart]);

  return (
	<MainContext.Provider value={{ timePerInterval, intervalGracePeriod, totalTime, actionText, timerText, timerStart, actionStart, actionEndStart }}>
		<div className="main-c-content-wrapper">
			<Graphic />
			<MainText />
		</div>
		<Counter />
	</MainContext.Provider>
  )
}

export default Main;