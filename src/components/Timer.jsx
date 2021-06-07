/* eslint-disable react/jsx-indent */
import { useCurrentFrame, useVideoConfig } from 'remotion';


const Timer = ({ startFrame, endFrame }) => {

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const timeLeftInSeconds = Math.floor((endFrame - (frame + 1 + startFrame)) / fps) + 1; // + 1 because the frames are index 0, but we need index 1.
  const timeLeftInMinutes = Math.floor(timeLeftInSeconds / 60);
  const timeLeftInHours = Math.floor(timeLeftInSeconds / 60 / 60);
  const formattedTime = `${timeLeftInHours ? `00${timeLeftInHours}:`.slice(-3) : ''}${timeLeftInMinutes ? `00${timeLeftInMinutes}:`.slice(-3) : '00:'}${`00${timeLeftInSeconds % 60}`.slice(-2)}`;

  return (
    <time className="main-c-time">
      {formattedTime}
    </time>
  )
};

export default Timer;