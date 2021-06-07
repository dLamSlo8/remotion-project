/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useMemo, useContext } from 'react';
import { useCurrentFrame, interpolate, useVideoConfig, Sequence, Audio } from 'remotion';
import audio from '../../voice.mp3';
import MainContext from '../contexts/MainContext';

const WAVE_TRANSLATE_TIME_SEC = 10; // Seconds for wave animation
const PLUS_ONE_TIME_SEC = 1; // Seconds for plus one animation

const Graphic = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { timePerInterval, intervalGracePeriod, timerStart, actionStart, actionEndStart } = useContext(MainContext);

  const translateStart = useMemo(() => {
    return Array.from({ length: Math.floor(timePerInterval / WAVE_TRANSLATE_TIME_SEC) }, (_, i) => i * WAVE_TRANSLATE_TIME_SEC * fps);
  }, [timePerInterval]);

  return (
    <>
      {
        actionStart.map((startFrame) => (
          <Sequence from={startFrame} durationInFrames={Infinity}>
            <Audio 
            src={audio} />
          </Sequence>
        ))
      }
      {
        actionEndStart.map((startFrame) => (
          <Sequence from={startFrame} durationInFrames={PLUS_ONE_TIME_SEC * fps} layout="none">
            <div 
            className="main-c-plus"
            style={{
              transform: `translate(calc(-50% - 0.5rem), ${interpolate(frame, [startFrame, startFrame + PLUS_ONE_TIME_SEC * fps], [0, -20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%)`,
              opacity: interpolate(frame, [startFrame, startFrame + PLUS_ONE_TIME_SEC * fps], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
            }}
            >
              +1
            </div>
          </Sequence>
        ))
      }
      <div className="main-c-cup">
        <svg className="main-c-cup-handle" width="46" height="71" viewBox="0 0 46 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2H10.3333C19.1739 2 27.6523 5.51189 33.9035 11.7631C40.1548 18.0143 43.6667 26.4928 43.6667 35.3333C43.6667 44.1739 40.1548 52.6524 33.9035 58.9036C27.6523 65.1548 19.1739 68.6667 10.3333 68.6667H2" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 7H9C16.4261 7 23.548 9.94999 28.799 15.201C34.05 20.452 37 27.5739 37 35C37 42.4261 34.05 49.548 28.799 54.799C23.548 60.05 16.4261 63 9 63H2" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="main-c-mask-wrapper">
          {
            timerStart.map((startFrame, idx) => (
              <Sequence from={startFrame} durationInFrames={timePerInterval * fps} layout="none">
                <div
                className="main-c-mask-graphic-wrapper"
                style={{transform: `translateY(${interpolate(frame, [startFrame, startFrame + timePerInterval * fps], [50, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%)`}}
                >
                  {
                    translateStart.map((startFrame) => (
                      <Sequence from={startFrame} durationInFrames={WAVE_TRANSLATE_TIME_SEC * fps} layout="none">
                        <svg 
                        className="main-c-mask-graphic"
                        width="261" 
                        height="85" 
                        viewBox="0 0 261 85" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          transform: `translateX(${interpolate(frame - (intervalGracePeriod * fps + (idx * (timePerInterval + intervalGracePeriod) * fps)), [startFrame, startFrame + WAVE_TRANSLATE_TIME_SEC * fps], [0, -50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%)`
                        }}
                        >
                          <path d="M23 22.5C27.1224 21.8635 28.5 15.5 29 14.5C29.5 13.5 33.0974 4.3519 38.5 4.5C41.7939 4.5903 49.0641 4.37132 55 12.8842C64.9452 27.147 72.7129 41.8737 89 12.8842C105.287 -16.1053 131 12.8842 131 12.8842V84.1106H4.81606e-05L0 67.551V12.8842C0 12.8842 10 24.5072 23 22.5Z" fill="#A2D9FF"/>
                          <path d="M153 22.5C157.122 21.8635 158.5 15.5 159 14.5C159.5 13.5 163.097 4.3519 168.5 4.5C171.794 4.5903 179.064 4.37132 185 12.8842C194.945 27.147 202.713 41.8737 219 12.8842C235.287 -16.1053 261 12.8842 261 12.8842V84.1106H130L130 67.551V11.824C130 11.824 140 24.5072 153 22.5Z" fill="#A2D9FF"/>
                        </svg>
                      </Sequence>
                    ))
                  }
                </div>
              </Sequence>
            ))
          }
          {
            actionStart.map((startFrame) => (
              <Sequence from={startFrame} durationInFrames={intervalGracePeriod * fps} layout="none"> 
                <div
                className="main-c-mask-graphic-wrapper"
                style={{ transform: `translateY(${interpolate(frame, [startFrame, startFrame + intervalGracePeriod * fps], [10, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}%)`}}
                >
                  <svg className="main-c-mask-graphic" width="261" height="85" viewBox="0 0 261 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 22.5C27.1224 21.8635 28.5 15.5 29 14.5C29.5 13.5 33.0974 4.3519 38.5 4.5C41.7939 4.5903 49.0641 4.37132 55 12.8842C64.9452 27.147 72.7129 41.8737 89 12.8842C105.287 -16.1053 131 12.8842 131 12.8842V84.1106H4.81606e-05L0 67.551V12.8842C0 12.8842 10 24.5072 23 22.5Z" fill="#A2D9FF"/>
                    <path d="M153 22.5C157.122 21.8635 158.5 15.5 159 14.5C159.5 13.5 163.097 4.3519 168.5 4.5C171.794 4.5903 179.064 4.37132 185 12.8842C194.945 27.147 202.713 41.8737 219 12.8842C235.287 -16.1053 261 12.8842 261 12.8842V84.1106H130L130 67.551V11.824C130 11.824 140 24.5072 153 22.5Z" fill="#A2D9FF"/>
                  </svg>
                </div>
              </Sequence>
            ))
          }
        </div>
      </div>
    </>
  )
};

export default Graphic;