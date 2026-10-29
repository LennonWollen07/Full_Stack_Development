import { useEffect, useState } from "react";
import { getPokemon } from "~/helpers";

export function meta() {
  return [
    { title: "Pokemon Stats Visuliser" },
    { name: "Home", content: "Pokemon Stats" },
  ];
}

export default function Home() {
  const [pokemonData, setPokemonData] = useState<any>()

  // sets pikachu as the default display pokemon
  const [pokemonName, setPokemonName] = useState<string>("pikachu");

  // set pokmeon to the input pokemon
  const updatePokemonName = (e: any) => setPokemonName(e.target.value);

  // uses the pokemon data from the server to update the page info
  function updatePageInfo() {
    getPokemon(pokemonName).then((data) => {
      if(data) {
        setPokemonData(data);
      }
      else {
        alert("Pokemon not found. try checking your spelling")
      }
    })
  }

  useEffect(updatePageInfo, [])

  // on input change the page info
  function onKeyDown(event: any) {
    if (event.key == "Enter") {
      updatePageInfo();
    }
  }


  return (
    <section id="home">
      {/* title row */}
      <div id="home__titleRow" className="U-flexAlignJustify">
        <h1 id="home__titleRow__text">Pokemon Stats Visualiser</h1>
      </div>

      {/* image row */}
      <div id="home__imgRow" className="U-flexAlignJustify">
        <img id="home__imgRow__image" src={pokemonData?.image}></img>
      </div>

      {/* description row */}
      <div id="home__descriptionRow" className="U-flexAlignJustify">
        <p id="home__descriptionRow__text">{pokemonData?.name} - {pokemonData?.types}</p>
      </div>

      {/* stats row */}
      <div id="home__statsRow" className="U-flexAlignJustify">
        <StatsDisplay stats={pokemonData?.stats} />
      </div>
      
      {/* input row */}
      <div id="home__inputRow" className="U-flexAlignJustify">
        <p id="home__inputRow__text">Pokemon Name / ID - </p>
        <input id="home_inputRow_input" value={pokemonName} onChange={updatePokemonName} onKeyDown={onKeyDown} ></input>
      </div>
    </section>
  );

}

interface StatRowProps {
  name: string,
  value: number,
  length: number
}

interface StatsDisplayProps {
  stats: StatRowProps[]
}

// gets the stats for the pokemon from the server
function StatsDisplay(props: StatsDisplayProps) {
  const { stats } = props

  if (!stats) return <></>

  return (<>
    {stats.map((stat, index) => {
      return (<StatRow name={stat.name} value={stat.value} length={stat.length} key={index}></StatRow>)
    })}
  </>)
}

function StatRow(props: StatRowProps) {
  const { name, value, length } = props
  return (
    <div className="home__statsRow__row U-flexAlignJustify">
      <div className="home__statsRow__row__name U-flexAlignJustify">
        <p>{name}</p>
      </div>
      <div className="home__statsRow__row__value">
        <div className="home__statsRow__row__value__bar U-flexAlignJustify" style={{ width: `${length}%` }}>
          <p className="home__statsRow__row__value__bar__text">{value}</p>
        </div>
      </div>
    </div>
  )

}

