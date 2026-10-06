import { useEffect, useState } from "react";
import { getJSON } from "~/helpers";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


export default function Home() {
  return (
    <section id="home">
      <div id="home__titleRow" className="U-flexAlignJustify">
        <h1 id="home__titleRow__text">Pokemon Stats Visualiser</h1>
      </div>
      <div id="home__imgRow"></div>
      <div id="home__descriptionRow" className="U-flexAlignJustify">
        <p id="home__descriptionRow__text">??? - ???</p>
      </div>
      <StatsDisplay />
      <div id="home__inputRow"></div>
    </section>
  );
}

function StatsDisplay() {
  const [pokemonData, setPokemonData] = useState<any>()

  useEffect(() => {
    getJSON().then((value) => {
      setPokemonData(value.results[0]);
      console.log(value.results[0]);
    })
    
  }, [])


  if(!pokemonData) return <></>

  return (<StatRow name={pokemonData.name} value={3}></StatRow>)
}

interface StatRowProps {
  name: string,
  value: number
}

function StatRow(props: StatRowProps) {
  const { name, value } = props
  return (
    <div className="home__statsRow__Row">
      <div className="home__statsRow__Row__name">
        {name}
      </div>
      <div className="home__statsRow__Row__value">
        {value}
      </div>
    </div>
  )

}