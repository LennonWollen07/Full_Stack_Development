import { useEffect, useState } from "react";
import { getJSON } from "~/helpers";

export function meta() {
  return [
    { title: "Pokemon Stats Visuliser" },
    { name: "Home", content: "Pokemon Stats" },
  ];
}


export default function Home() {
  const [pokemonData, setPokemonData] = useState<any>()

  useEffect(() => {
    getJSON("bulbasaur").then((data) => {
      setPokemonData(data);
      console.log(data.image);
    })

  }, [])
  return (
    <section id="home">
      <div id="home__titleRow" className="U-flexAlignJustify">
        <h1 id="home__titleRow__text">Pokemon Stats Visualiser</h1>
      </div>
      <div id="home__imgRow">
        <img src={pokemonData?.image}></img>
      </div>
      <div id="home__descriptionRow" className="U-flexAlignJustify">
        <p id="home__descriptionRow__text">{pokemonData?.name} - {pokemonData?.types}</p>
      </div>
      <div id="home__statsRow" className="U-flexAlignJustify">
        <StatsDisplay stats={pokemonData?.stats} />
      </div>
      <div id="home__inputRow" className="U-flexAlignJustify">
        <p id="home__inputRow__text">Pokemon Name - </p>
        <input id="home_inputRow_input"></input>
      </div>
    </section>
  );
}

interface StatsDisplayProps {
  stats: StatRowProps[]
}

function StatsDisplay(props: StatsDisplayProps) {
  const { stats } = props


  if (!stats) return <></>

  return (<>
    {stats.map((stat, index) => {
      return (<StatRow name={stat.name} value={stat.value} key={index}></StatRow>)
    })}
  </>)
}

interface StatRowProps {
  name: string,
  value: number
}

function StatRow(props: StatRowProps) {
  const { name, value } = props
  return (
    <div className="home__statsRow__row U-flexAlignJustify">
      <div className="home__statsRow__row__name U-flexAlignJustify">
        <p>{name}</p>
      </div>
      <div className="home__statsRow__row__value">
        <div className="home__statsRow__row__value__bar U-flexAlignJustify">
          <p className="home__statsRow__row__value__bar__text">{value}</p>
        </div>
      </div>
    </div>
  )

}

