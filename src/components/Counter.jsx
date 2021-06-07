import { useMemo, useContext } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

import MainContext from '../contexts/MainContext';

// Counter for the amount of times the interval has passed
const Counter = () => {
  const frame = useCurrentFrame();
  const  { fps } = useVideoConfig();
  const { actionStart, intervalGracePeriod } = useContext(MainContext);

  const actionStartReversed = useMemo(() => [...actionStart].reverse(), [actionStart]);
  const foundIt = actionStartReversed.findIndex((val) => frame >= (val + (intervalGracePeriod * fps)));
  
  return (
	<div className="main-c-counter">
		<p className="main-c-counter__count">{foundIt === -1 ? 0 : actionStartReversed.length - foundIt}</p>
		<svg className="main-c-counter__graphic" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.66669 26.6667H60V56.6667C60 60.2029 58.5953 63.5943 56.0948 66.0947C53.5943 68.5952 50.2029 70 46.6667 70H20C16.4638 70 13.0724 68.5952 10.5719 66.0947C8.07145 63.5943 6.66669 60.2029 6.66669 56.6667V26.6667Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M60 26.6667H63.3333C66.8696 26.6667 70.2609 28.0714 72.7614 30.5719C75.2619 33.0724 76.6667 36.4638 76.6667 40C76.6667 43.5362 75.2619 46.9276 72.7614 49.4281C70.2609 51.9286 66.8696 53.3333 63.3333 53.3333H60" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
			<path d="M60 30H62.4C64.9461 30 67.3879 31.0536 69.1882 32.9289C70.9886 34.8043 72 37.3478 72 40C72 42.6522 70.9886 45.1957 69.1882 47.0711C67.3879 48.9464 64.9461 50 62.4 50H60" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
		</svg>
	</div>
  )
};

export default Counter;