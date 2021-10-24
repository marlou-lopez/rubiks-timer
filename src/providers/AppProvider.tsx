import React from 'react';
import Scrambo from 'scrambo';
import {
  Action, Dispatch, State, AppProviderProps, SCRAMBLER,
} from './types';

const crambler = new Scrambo();

const AppStateContext = React.createContext<
{ state: State; dispatch: Dispatch } | undefined
>(undefined);

function appReducer(state: State, action: Action): State {
  switch (action.type) {
    case SCRAMBLER.SCRAMBLE: {
      return {
        ...state,
        previousScramble: state.currentScramble,
        currentScramble: state.nextScramble,
        nextScramble: crambler.get()
      };
    }
    case SCRAMBLER.PREV: {
      return {
        ...state,
        previousScramble: [],
        currentScramble: state.previousScramble,
        nextScramble: state.currentScramble
      };
    }
    case SCRAMBLER.CURRENT: {
      return {
        ...state,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}
function AppProvider({ children }: AppProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(appReducer, {
    currentScramble: crambler.get(),
    previousScramble: [],
    nextScramble: crambler.get()
  });

  const value = { state, dispatch };
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

function useApp(): {
  state: State;
  dispatch: Dispatch;
} {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { AppProvider, useApp };