import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
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

const Alert = ({ message, onButtonClick }) => (
  <div>
    <p>{message}</p>
    <button className="retry-button" onClick={onButtonClick}>Retry</button>
  </div>
);

function App() {
  const [pokemonCollection, setPokemonCollection] = useState<ApiRow[]>([]);
  const [selectedPkmn, setSelectedPkmn] = useState<AppPkmnDetail | undefined>(
    undefined
  );

  async function getAllPokemon() {
    try {
      const pokemonData = await fetchAllKantoPokemon();
      setPokemonCollection(pokemonData);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (pokemonCollection.length > 0) {
      return;
    }
    (async() => getAllPokemon())();
  }, []);

  async function handlePokemonSelect(name: string) {
    try {
      const detail = await fetchPokemonDetail(name);
      if (detail) {
        const appDetail = getAppPkmnDetailFromApi(detail);
        setSelectedPkmn(appDetail);
      }
    } catch (e) {
      console.log(e);
      toast.error(<Alert message="Error fetching all Pokemon" onButtonClick={() => handlePokemonSelect(name)} />);
    }
  }

  const pkmnFirstType =
    !!selectedPkmn && (selectedPkmn.types.length ?? 0) > 0
      ? selectedPkmn.types[0]
      : "normal";

  const firstTypeImageConfig = getImageConfigFromType(pkmnFirstType);
  const backgroundStyle = {
    background: `linear-gradient(140deg, ${firstTypeImageConfig?.color}FF, ${firstTypeImageConfig?.color}80)`
  };

  return (
    <>
      <ToastContainer />
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <div className="pokemon-list-wrapper">
          <div className="pokemon-list">
            {pokemonCollection?.map((pokemonRow) => {
              return (
                <div key={pokemonRow.url} className="pokemon-list-item" onClick={() => handlePokemonSelect(pokemonRow.name)}>
                  <div>
                    {pokemonRow.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pokemon-detail-wrapper">
          {selectedPkmn ? (
            <div className="content-wrapper">
              <div className="circle-wrapper">
                <div
                  className="circle"
                  style={backgroundStyle}
                >
                  <img className="pokemon-image" src={selectedPkmn?.image} alt={selectedPkmn?.name} />
                  <div className="type-img-container">
                    <img className="type-img" src={firstTypeImageConfig.vectorSrc} />
                  </div>
                </div>
                <div className="images-wrapper">
                  
                </div>
              </div>
              <div className="pokemon-info">
                <div className="pokemon-name">{selectedPkmn?.name}</div>
                  <span className="pokemon-number">
                    #{String(selectedPkmn.id).padStart(3, '0')}
                  </span>
                </div>
              <div className="types-container">
                {selectedPkmn?.types.map((type) => {
                  const typeImageConfig = getImageConfigFromType(type);

                  return (
                    <div key={type} className="type-wrapper" style={{ backgroundColor: typeImageConfig.color }}>
                      <img src={typeImageConfig.pngSrc} />
                      <span className="type-name">{type}</span>
                    </div>
                  );
                })}
              </div>
              <div className="info-wrapper">
                <div className="info-container">
                  <div className="info-title-wrapper">
                    <img src="./assets/information-icons/weight.svg" />
                    <div className="info-title">Weight</div>
                  </div>
                  <div className="info-detail">{selectedPkmn.weight} kg</div>
                </div>
                <div className="info-container">
                  <div className="info-title-wrapper">
                    <img src="./assets/information-icons/height.svg" />
                    <div className="info-title">Height</div>
                  </div>
                  <div className="info-detail">{selectedPkmn.height} m</div>
                </div>
                <div className="info-container">
                  <div className="info-title-wrapper">
                    <img src="./assets/information-icons/species.svg" />
                    <div className="info-title">Species</div>
                  </div>
                  <div className="info-detail">{selectedPkmn.species}</div>
                </div>
                <div className="info-container">
                  <div className="info-title-wrapper">
                    <img src="./assets/information-icons/ability.svg" />
                    <div className="info-title">Ability</div>
                  </div>
                  <div className="info-detail">{selectedPkmn.ability}</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
