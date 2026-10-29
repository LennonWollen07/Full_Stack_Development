import { createContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

// the props of the stats game, defines what will passed to its children
interface StatsGameProps {
    mode : string,
    setMode : Dispatch<SetStateAction<string>>,
    modeIndex: number,
    setModeIndex: Dispatch<SetStateAction<number>>,
    pokemonDataArray: any[],
    setPokemonDataArray: Dispatch<SetStateAction<any[]>>,
    isWinnerArray: boolean[],
    setIsWinnerArray: Dispatch<SetStateAction<boolean[]>>,
    points: number,
    setPoints: Dispatch<SetStateAction<number>>,
    hasAnswered: boolean,
    setHasAnswered: Dispatch<SetStateAction<boolean>>
}

// create initial props
const initProps: StatsGameProps = {
    mode: "HP",
    setMode: () => {},
    modeIndex: 0,
    setModeIndex: () => {},
    pokemonDataArray: [],
    setPokemonDataArray: () => {},
    isWinnerArray: [],
    setIsWinnerArray: () => {},
    points: 0,
    setPoints: () => {},
    hasAnswered: false,
    setHasAnswered: () => {}
};

// the context holding the StatsGameProps
export const StatsGameContext = createContext<StatsGameProps>(initProps);

export function StatsGameContextProvider({ children }: PropsWithChildren) {

    // mode based on the selected button (default hp)
    const [mode, setMode] = useState<string>("HP");

    // index of mode in MODE_NAMES
    const [modeIndex, setModeIndex] = useState<number>(0)

    // the pokemon data that has been fetched
    const [pokemonDataArray, setPokemonDataArray] = useState<any>([])

    // the answers for the game
    const [isWinnerArray, setIsWinnerArray] = useState<boolean[]>([])

    // How many points you have won / lost
    const [points, setPoints] = useState<number>(0)

    // check to esnure you can only click one of the answers once
    const [hasAnswered, setHasAnswered] = useState<boolean>(false)

    return (<StatsGameContext.Provider value={{mode, setMode, modeIndex, setModeIndex, pokemonDataArray, setPokemonDataArray, isWinnerArray, setIsWinnerArray, points, setPoints, hasAnswered, setHasAnswered}}>
        {children}
    </StatsGameContext.Provider>)

}