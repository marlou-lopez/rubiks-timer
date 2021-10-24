import { Button, Text } from '@geist-ui/react'
import { useReducer, useState } from 'react';
import useLongPress from '../../hooks/useLongPress';
import { useApp } from '../../providers/AppProvider';
import { SCRAMBLER } from '../../providers/types';
import "./Stopwatch.css"
import { StopwatchReducer } from './StopwatchReducer';


const Stopwatch: React.FC = () => {
  const [state, dispatch] = useReducer(StopwatchReducer, {
    running: false,
    currentTime: 0,
    lastTime: 0
  })
  const { dispatch: appDispatch } = useApp();
  const [swInterval, setSwInterval] = useState<NodeJS.Timeout | null>(null);
  const [isKeyPress, setIsKeyPress] = useState(false);
  const [isTimerStopped, setIsTimerStopped] = useState(true);
  const longPressEvent = useLongPress({
    onLongPress: () => {
      setIsKeyPress(true)
      dispatch({ type: 'reset' })
      appDispatch({type: SCRAMBLER.SCRAMBLE})
    },
    onUp: () => {
      dispatch({ type: 'start' });
      setIsKeyPress(false);
      setIsTimerStopped(false);
      setSwInterval(
        setInterval(() => {
          dispatch({ type: 'tick' })
        }, 1)
      )
    },
    onClick: () => {
      if (state.currentTime > 0) {
        dispatch({ type: 'stop' });
        setIsTimerStopped(true)
        if (swInterval) {
          clearInterval(swInterval);
          setSwInterval(null)
        }
      }

    }
  })

  const time = (t: number) => {
    const date = new Date(t);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milli = date.getMilliseconds();
    return {
      minutes,
      seconds,
      milli
    }
  }
  return (
    <div {...longPressEvent} className="timer" tabIndex={1}>
      <Text className="timer-text" type={isKeyPress ? 'success' : 'default'}>
        {time(state.currentTime).minutes >= 1 ? `${time(state.currentTime).minutes.toString().padStart(2, "0")}:` : null}
        {time(state.currentTime).seconds.toString()}
        {isTimerStopped && `.${time(state.currentTime).milli.toString().padStart(2, "0")}`}
      </Text>
      <Button onClick={() => dispatch({ type: 'reset' })}>reset</Button>
    </div>
  )
};

export default Stopwatch;