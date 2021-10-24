export interface IScrambler {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export enum SCRAMBLER {
  SCRAMBLE = 'scramble',
  PREV = 'previous-scramble',
  CURRENT = 'current-scramble'
}

export type Action =
  { type: SCRAMBLER.SCRAMBLE }
| { type: SCRAMBLER.PREV }
| { type: SCRAMBLER.CURRENT }
export type Dispatch = (action: Action) => void;
export type State = {
  currentScramble: string[];
  previousScramble: string[];
  nextScramble: string[];
};
export type AppProviderProps = { children: React.ReactNode };