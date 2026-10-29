import { useContext, useState } from "react";
import {
  StatsGameContext,
  StatsGameContextProvider,
} from "~/contexts/stats_game_context";

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
      <Stats_Game />
    </StatsGameContextProvider>
  );
}

export function Stats_Game() {
  // extract properties from context
  const { mode, points } = useContext(StatsGameContext);

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
          return <StatButton name={name} key={index}></StatButton>;
        })}
      </div>
      {/* clickable pokemon row */}
      <div id="statsGame__clickablesRow" className="U-flexAlignJustify">
        <PokemonBox index={0}></PokemonBox>
        <PokemonBox index={1}></PokemonBox>
      </div>
      {/* score row */}
      <div id="statsGame__scoreRow" className="U-flexAlignJustify">
        <p id="statsGame__scoreRow__text">Points: {points}</p>
      </div>
      {/* question row */}
      <div id="statsGame__questionRow" className="U-flexAlignJustify">
        <p id="statsGame__questionRow__text">
          Which pokemon has the higher {mode} stat?
        </p>
      </div>
    </div>
  );
}

// buttons components
interface ModeNamesProps {
  name: string;
}

// creates a button that allows you to switch the game mode
function StatButton(props: ModeNamesProps) {
  const { name } = props;

  //extract context properties
  const { setMode, setModeIndex, setPoints, updatePageInfo } =
    useContext(StatsGameContext);

  // when a button is clicked
  function onClick() {
    setMode(name);
    let index = MODE_NAMES.indexOf(name);
    setModeIndex(index);
    setPoints(0);
    updatePageInfo();
  }

  return (
    <input
      className="statsGame__modesRow__buttons"
      type="button"
      value={name}
      onClick={onClick}
    ></input>
  );
}

interface pokemonBoxProps {
  index: number;
}

// clickable pokemon component
function PokemonBox(props: pokemonBoxProps) {
  const { index } = props;

  //extract context properties
  const {
    mode,
    modeIndex,
    pokemonDataArray,
    isWinnerArray,
    points,
    setPoints,
    hasAnswered,
    setHasAnswered,
    updatePageInfo,
  } = useContext(StatsGameContext);

  // change Number to number to allow for calculations
  let currentPoints = points as number;
  const [imageColourClass, setImageColourClass] = useState<string>("");

  // if no data return nothing
  if (!pokemonDataArray[index]) return <></>;

  // when a pokemon is clicked
  function onClick() {
    // check if you have answered already before the reset
    if (!hasAnswered) {
      // if you clicked the correct one
      if (isWinnerArray[index]) {
        setImageColourClass("U-correct");
        setPoints(currentPoints + 1);
      }

      // if you clicked the incorrect one
      if (!isWinnerArray[index]) {
        setImageColourClass("U-incorrect");
        setPoints(currentPoints - 1);
      }

      // reset page elements
      setHasAnswered(true);

      setTimeout(() => {
        updatePageInfo();
        setHasAnswered(false);
        setImageColourClass("");
      }, 3000);
    }
  }

  return (
    <div className="statsGame__clickablesRow__pokemonBox">
      {/* image section */}
      <div className="statsGame__clickablesRow__pokemonBox__image U-flexAlignJustify">
        <img
          src={pokemonDataArray[index].image}
          className={`statsGame__clickablesRow__pokemonBox__image__img U-flexAlignJustify ${imageColourClass}`}
          onClick={onClick}
        ></img>
      </div>
      {/* name section */}
      <div className="statsGame__clickablesRow__pokemonBox__name U-flexAlignJustify">
        <p className="statsGame__clickablesRow__pokemonBox__name__text U-flexAlignJustify">
          {pokemonDataArray[index].name}
        </p>
      </div>
      {/* stats section */}
      <div className="statsGame__clickablesRow__pokemonBox__value U-flexAlignJustify">
        <p className="statsGame__clickablesRow__pokemonBox__value__text">
          {mode} -{" "}
          {hasAnswered ? pokemonDataArray[index].stats[modeIndex].value : "?"}
        </p>
      </div>
    </div>
  );
}
