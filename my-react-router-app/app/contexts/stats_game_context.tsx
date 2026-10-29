import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import { getTwoPokemon } from "~/helpers";

// the props of the stats game, defines what will passed to its children
interface StatsGameProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  modeIndex: number;
  setModeIndex: Dispatch<SetStateAction<number>>;
  pokemonDataArray: any[];
  isWinnerArray: boolean[];
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
  hasAnswered: boolean;
  setHasAnswered: Dispatch<SetStateAction<boolean>>;
  updatePageInfo: VoidFunction;
}

// create initial props
const initProps: StatsGameProps = {
  mode: "HP",
  setMode: () => {},
  modeIndex: 0,
  setModeIndex: () => {},
  pokemonDataArray: [],
  isWinnerArray: [],
  points: 0,
  setPoints: () => {},
  hasAnswered: false,
  setHasAnswered: () => {},
  updatePageInfo: () => {},
};

// the context holding the StatsGameProps
export const StatsGameContext = createContext<StatsGameProps>(initProps);

export function StatsGameContextProvider({ children }: PropsWithChildren) {
  // mode based on the selected button (default hp)
  const [mode, setMode] = useState<string>("HP");

  // index of mode in MODE_NAMES
  const [modeIndex, setModeIndex] = useState<number>(0);

  // the pokemon data that has been fetched
  const [pokemonDataArray, setPokemonDataArray] = useState<any>([]);

  // the answers for the game
  const [isWinnerArray, setIsWinnerArray] = useState<boolean[]>([]);

  // How many points you have won / lost
  const [points, setPoints] = useState<number>(0);

  // check to esnure you can only click one of the answers once
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  // update the page information based on fetched pokemon
  const updatePageInfo = () => {
    getTwoPokemon().then((data) => {
      setPokemonDataArray(data);
    });
  };

  useEffect(updatePageInfo, []);

  // when pokemon are loaded find which one has the higher stat
  useEffect(() => {
    if (pokemonDataArray.length == 0) return;

    // first pokemon has the higher stat
    if (
      pokemonDataArray[0].stats[modeIndex].value >
      pokemonDataArray[1].stats[modeIndex].value
    ) {
      setIsWinnerArray([true, false]);
    }

    // second pokemon has the higher stat
    else if (
      pokemonDataArray[0].stats[modeIndex].value <
      pokemonDataArray[1].stats[modeIndex].value
    ) {
      setIsWinnerArray([false, true]);
    }

    // in case of a draw
    else {
      setIsWinnerArray([true, true]);
    }
    
  }, [pokemonDataArray]);

  return (
    <StatsGameContext.Provider
      value={{
        mode,
        setMode,
        modeIndex,
        setModeIndex,
        pokemonDataArray,
        isWinnerArray,
        points,
        setPoints,
        hasAnswered,
        setHasAnswered,
        updatePageInfo,
      }}
    >
      {children}
    </StatsGameContext.Provider>
  );
}
