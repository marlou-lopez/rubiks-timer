import "./Scramble.css"
import { Text, Button, ButtonGroup } from '@geist-ui/react'
import { useApp } from "../../providers/AppProvider";
import { SCRAMBLER } from '../../providers/types';


const Scramble: React.FC = () => {
  const { state: { currentScramble, previousScramble }, dispatch } = useApp();
  return (
    <div className="scramble">
      <Text className="scramble-text">{currentScramble}</Text>
      <ButtonGroup>
        <Button onClick={() => dispatch({type: SCRAMBLER.PREV})} disabled={previousScramble.length < 1}>last</Button>
        <Button onClick={() => dispatch({type: SCRAMBLER.SCRAMBLE})}>next</Button>
      </ButtonGroup>
    </div>
  )
};

export default Scramble;