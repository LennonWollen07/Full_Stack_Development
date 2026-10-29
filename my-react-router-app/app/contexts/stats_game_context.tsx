import { createContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

// the props of the stats game, defines what will passed to its children
interface StatsGameProps {
    mode : string,
    setMode : Dispatch<SetStateAction<string>>,
}

// create initial props
const initProps: StatsGameProps = {
    mode: "HP",
    setMode: () => {}
};

// the context holding the StatsGameProps
export const StatsGameContext = createContext<StatsGameProps>(initProps);

export function StatsGameContextProvider({ children }: PropsWithChildren) {

    // mode based on the selected button (default hp)
    const [mode, setMode] = useState<string>("HP");

    return (<StatsGameContext.Provider value={{mode, setMode}}>
        {children}
    </StatsGameContext.Provider>)

}