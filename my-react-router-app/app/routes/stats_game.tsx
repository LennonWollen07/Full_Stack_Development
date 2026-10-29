import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { StatsGameContext, StatsGameContextProvider } from "~/contexts/stats_game_context";
import { getTwoPokemon } from "~/helpers";

export function meta() {
  return [
    { title: "Pokemon Stats Game" },
    { name: "Stats Game", content: "Stats Game" },
  ];
}

// names of the game modes
const MODE_NAMES = ["HP", "ATK", "DEF", "S.ATK", "S.DEF", "SPD", "TOTAL"];

export default function StatsGameWrapper() {
  return (
    <StatsGameContextProvider>
      <Stats_Game/>
    </StatsGameContextProvider>
  )
}

export function Stats_Game() {

  // extract properties from context
  const {mode} = useContext(StatsGameContext)

  // index of mode in MODE_NAMES
  const [modeIndex, setModeIndex] = useState<number>(0)

  // the pokemon data that has been fetched
  const [pokemonData, setPokemonData] = useState<any>([])

  // the answers for the game
  const [isWinner, setIsWinner] = useState<boolean[]>([])

  // How many points you have won / lost
  const [points, setPoints] = useState<number>(0)

  // check to esnure you can only click one of the answers once
  const [hasAnswered, setHasAnswered] = useState<boolean>(false)

  // update the page information based on fetched pokemon
  const updatePageInfo = () => {
    getTwoPokemon().then((data) => {
      setPokemonData(data);
    })
  }

  useEffect(updatePageInfo, []);

  // when pokemon are loaded find which one has the higher stat
  useEffect(() => {
    if (pokemonData.length == 0) return;

    // first pokemon has the higher stat
    if (pokemonData[0].stats[modeIndex].value > pokemonData[1].stats[modeIndex].value) {
      setIsWinner([true, false])
    }

    // second pokemon has the higher stat
    else if (pokemonData[0].stats[modeIndex].value < pokemonData[1].stats[modeIndex].value) {
      setIsWinner([false, true]);
    }

    // in case of a draw
    else {
      setIsWinner([true, true]);
    }

    console.log(isWinner)

  }, [pokemonData])

  return (
    <div id="statsGame">
      {/* title row */}
      <div id="statsGame__titleRow" className="U-flexAlignJustify">
        <h1 id="statsGame__titleRow__text">Stats Game</h1>
      </div>
      {/* mode display row */}
      <div id="statsGame__modeDisplayRow" className="U-flexAlignJustify">
        <p id="statsGame__modeDisplayRow__text">GameMode - {mode}</p>
      </div>
      {/* mode buttons row */}
      <div id="statsGame__modesRow" className="U-flexAlignJustify">
        {MODE_NAMES.map((name, index) => {
          return (
            <StatButton name={name} setModeIndex={setModeIndex} updatePageInfo={updatePageInfo} setPoints={setPoints} key={index}></StatButton>
          )
        })}
      </div>
      {/* clickable pokemon row */}
      <div id="statsGame__clickablesRow" className="U-flexAlignJustify">
        <PokemonBox pokemonData={pokemonData[0]} modeIndex={modeIndex} isWinner={isWinner[0]} points={points} setPoints={setPoints} hasAnswered={hasAnswered} setHasAnswered={setHasAnswered} updatePageInfo={updatePageInfo}></PokemonBox>
        <PokemonBox pokemonData={pokemonData[1]} modeIndex={modeIndex} isWinner={isWinner[1]} points={points} setPoints={setPoints} hasAnswered={hasAnswered} setHasAnswered={setHasAnswered} updatePageInfo={updatePageInfo}></PokemonBox>
      </div>
      {/* score row */}
      <div id="statsGame__scoreRow" className="U-flexAlignJustify">
        <p id="statsGame__scoreRow__text">Points: {points}</p>
      </div>
      {/* question row */}
      <div id="statsGame__questionRow" className="U-flexAlignJustify">
        <p id="statsGame__questionRow__text">Which pokemon has the higher {mode} stat?</p>
      </div>
    </div>
  );
}

// buttons components
interface ModeNamesProps {
  name: string,
  setModeIndex: any,
  updatePageInfo: VoidFunction,
  setPoints: any
}

// creates a button that allows you to switch the game mode
function StatButton(props: ModeNamesProps) {
  const { name, setModeIndex, updatePageInfo, setPoints } = props;

  //extract context properties
  const {setMode} = useContext(StatsGameContext)

  // when a button is clicked
  function onClick() {
    setMode(name);
    let index = MODE_NAMES.indexOf(name);
    setModeIndex(index);
    setPoints(0);
    updatePageInfo();
  }

  return (
    <input className="statsGame__modesRow__buttons" type="button" value={name} onClick={onClick}></input>
  )
}

interface pokemonBoxProps {
  pokemonData: any,
  modeIndex: number,
  isWinner: boolean,
  points: Number,
  setPoints: Dispatch<SetStateAction<number>>,
  hasAnswered: boolean,
  setHasAnswered: Dispatch<SetStateAction<boolean>>,
  updatePageInfo: VoidFunction
}

// clickable pokemon component
function PokemonBox(props: pokemonBoxProps) {
  const { pokemonData, modeIndex, isWinner, points, setPoints, hasAnswered, setHasAnswered, updatePageInfo } = props;

  //extract context properties
  const {mode} = useContext(StatsGameContext)

  // if no data return nothing
  if (!pokemonData) return <></>

  // change Number to number to allow for calculations
  let currentPoints = points as number;
  const [imageColourClass, setImageColourClass] = useState<string>("");

  // when a pokemon is clicked
  function onClick() {

    console.log(isWinner)

    // check if you have answered already before the reset
    if (!hasAnswered) {

      if (isWinner) {
        setImageColourClass("U-correct")
        setPoints(currentPoints + 1)
      }
      if (!isWinner) {
        setImageColourClass("U-incorrect")
        setPoints(currentPoints - 1)
      }

      setHasAnswered(true)

      // reset page elements
      setTimeout(() => {
        updatePageInfo();
        setHasAnswered(false);
        setImageColourClass("")
      }, 3000)

    }

  }

  return (
    <div className="statsGame__clickablesRow__pokemonBox">
      {/* image section */}
      <div className="statsGame__clickablesRow__pokemonBox__image U-flexAlignJustify">
        <img src={pokemonData.image} className={`statsGame__clickablesRow__pokemonBox__image__img U-flexAlignJustify ${imageColourClass}`} onClick={onClick}></img>
      </div>
      {/* name section */}
      <div className="statsGame__clickablesRow__pokemonBox__name U-flexAlignJustify">
        <p className="statsGame__clickablesRow__pokemonBox__name__text U-flexAlignJustify">{pokemonData.name}</p>
      </div>
      {/* stats section */}
      <div className="statsGame__clickablesRow__pokemonBox__value U-flexAlignJustify">
        <p className="statsGame__clickablesRow__pokemonBox__value__text">{mode} - {hasAnswered ? pokemonData.stats[modeIndex].value : "?"}</p>
      </div>
    </div>
  )
}