/* eslint-disable react/jsx-indent */
import { useContext } from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import MainContext from '../contexts/MainContext';
import Timer from './Timer';

// This component handles logic for switching between timer text and action text at each time interval.
const MainText = () => {
  const { timePerInterval, intervalGracePeriod, actionText, timerText, actionStart, timerStart } = useContext(MainContext);
  const { fps } = useVideoConfig();

  return (
    <>
    {
      timerStart.map((startFrame) => (
        <Sequence from={startFrame} durationInFrames={timePerInterval * fps} layout="none">
          <p className="main-c-timer-wrapper">
            <span>{timerText}</span>
            <Timer startFrame={startFrame} endFrame={startFrame + timePerInterval * fps} />
          </p>
        </Sequence>
      ))
    }
    {
      actionStart.map((startFrame) => (
        <Sequence from={startFrame} durationInFrames={intervalGracePeriod * fps} layout="none">
          <p className="main-c-timer-wrapper">
            <span>{actionText}</span>
          </p>
        </Sequence>
      ))
    }
    </>
  )
};

export default MainText;
