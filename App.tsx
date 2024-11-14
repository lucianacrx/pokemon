import { useEffect, useState } from "react";

import "./App.css";
import mockAllPokemon from "./assets/mockAllPokemon";
import mockDetailPidgeotto from "./assets/mockDetailPidgeotto";
import {
  ApiRow,
  fetchAllKantoPokemon,
  fetchPokemonDetail,
} from "./fetchers/getPokemon";
import {
  AppPkmnDetail,
  getAppPkmnDetailFromApi,
  getImageConfigFromType,
} from "./helpers";

function App() {
  const [pokemonCollection, setPokemonCollection] = useState<ApiRow[]>([]);
  const [selectedPkmn, setSelectedPkmn] = useState<AppPkmnDetail | undefined>(
    undefined
  );

  useEffect(() => {
    if (pokemonCollection.length > 0) {
      return;
    }
    // TODO: fetch pokemon
    console.error("TODO", fetchAllKantoPokemon);
    setPokemonCollection(mockAllPokemon);
  }, []);

  async function handlePokemonSelect() {
    // TODO: fetch pokemon
    console.error("TODO", fetchPokemonDetail);
    const apiDetail = mockDetailPidgeotto;
    const appDetail = getAppPkmnDetailFromApi(apiDetail);
    setSelectedPkmn(appDetail);
  }

  const pkmnFirstType =
    !!selectedPkmn && (selectedPkmn.types.length ?? 0) > 0
      ? selectedPkmn.types[0]
      : "normal";

  const firstTypeImageConfig = getImageConfigFromType(pkmnFirstType);

  return (
    <>
      <div>Pokemon App</div>
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <div style={{ width: "30%" }}>
          {pokemonCollection?.map((pokemonRow) => {
            return (
              <div key={pokemonRow.url}>
                <div onClick={() => handlePokemonSelect()}>
                  {pokemonRow.name}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ width: "70%" }}>
          {selectedPkmn ? (
            <div>
              <div>
                <div
                  style={{ backgroundColor: firstTypeImageConfig.color }}
                ></div>
                <img src={firstTypeImageConfig.vectorSrc} />
                <div className="w-[150px] h-[150px]">{selectedPkmn?.name}</div>
              </div>
              <div>
                {selectedPkmn?.types.map((type) => {
                  const typeImageConfig = getImageConfigFromType(type);

                  return (
                    <div key={type}>
                      <img src={typeImageConfig.pngSrc} />
                    </div>
                  );
                })}
              </div>
              <div>
                <div>Weight</div>
                <div>{selectedPkmn.weight} kg</div>
              </div>
              <div>
                <div>Height</div>
                <div>{selectedPkmn.height} m</div>
              </div>
              <div>
                <div>Species</div>
                <div>{selectedPkmn.species}</div>
              </div>
              <div>
                <div>Ability</div>
                <div>{selectedPkmn.ability}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
