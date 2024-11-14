import { ApiDetail } from "../fetchers/getPokemon";

// pngs with color. helpful for the type chips in the UI
import bugPng from "../assets/png-icons/bug.png";
import darkPng from "../assets/png-icons/dark.png";
import dragonPng from "../assets/png-icons/dragon.png";
import electricPng from "../assets/png-icons/electric.png";
import fairyPng from "../assets/png-icons/fairy.png";
import fightingPng from "../assets/png-icons/fighting.png";
import firePng from "../assets/png-icons/fire.png";
import flyingPng from "../assets/png-icons/flying.png";
import ghostPng from "../assets/png-icons/ghost.png";
import grassPng from "../assets/png-icons/grass.png";
import groundPng from "../assets/png-icons/ground.png";
import icePng from "../assets/png-icons/ice.png";
import normalPng from "../assets/png-icons/normal.png";
import poisonPng from "../assets/png-icons/poison.png";
import psychicPng from "../assets/png-icons/psychic.png";
import rockPng from "../assets/png-icons/rock.png";
import steelPng from "../assets/png-icons/steel.png";
import waterPng from "../assets/png-icons/water.png";
// svgs without color. helpful for the background behind the pokemon sprite
import bugSvg from "../assets/vector/bug.svg";
import darkSvg from "../assets/vector/dark.svg";
import dragonSvg from "../assets/vector/dragon.svg";
import electricSvg from "../assets/vector/electric.svg";
import fairySvg from "../assets/vector/fairy.svg";
import fightingSvg from "../assets/vector/fighting.svg";
import fireSvg from "../assets/vector/fire.svg";
import flyingSvg from "../assets/vector/flying.svg";
import ghostSvg from "../assets/vector/ghost.svg";
import grassSvg from "../assets/vector/grass.svg";
import groundSvg from "../assets/vector/ground.svg";
import iceSvg from "../assets/vector/ice.svg";
import normalSvg from "../assets/vector/normal.svg";
import poisonSvg from "../assets/vector/poison.svg";
import psychicSvg from "../assets/vector/psychic.svg";
import rockSvg from "../assets/vector/rock.svg";
import steelSvg from "../assets/vector/steel.svg";
import waterSvg from "../assets/vector/water.svg";

export type AppPkmnDetail = {
  name: string;
  id: number;
  hp: number;
  image: string;
  height: number;
  weight: number;
  types: string[];
  ability: string;
  species: string;
};

/**
 * helper function. given a pokemon from the api response, returns an object to be used in the app interface
 */
function getAppPkmnDetailFromApi(apiPkmn: ApiDetail): AppPkmnDetail {
  const hpStat = apiPkmn.stats.find(
    (stat) => stat.stat.name.toLowerCase() === "hp"
  );

  const ability =
    apiPkmn.abilities.length > 0
      ? apiPkmn.abilities.map((ability) => ability.ability.name)[0]
      : "N/A";

  return {
    name: apiPkmn.name,
    id: apiPkmn.id,
    hp: hpStat?.base_stat ?? 0,
    image: apiPkmn.sprites.front_default,
    height: apiPkmn.height / 10, // assume this calculation results in meters
    weight: apiPkmn.weight / 10, // assume this calculation results in kilograms
    types: apiPkmn.types
      .sort((typeA, typeB) => {
        if (typeA.slot > typeB.slot) {
          return 1;
        } else if (typeA.slot < typeB.slot) {
          return -1;
        }

        return 0;
      })
      .map((type) => type.type.name),
    ability: ability,
    species: apiPkmn.species.name,
  };
}

/**
 * helper function. given the pokemon's type (as string), return that type's associated hex color code
 */
function getImageConfigFromType(type: string) {
  const types: Record<
    string,
    { color: string; pngSrc: string; vectorSrc: string }
  > = {
    bug: { color: "#91C12F", pngSrc: bugPng, vectorSrc: bugSvg },
    dark: { color: "#5A5465", pngSrc: darkPng, vectorSrc: darkSvg },
    dragon: { color: "#0B6DC3", pngSrc: dragonPng, vectorSrc: dragonSvg },
    electric: { color: "#F4D23C", pngSrc: electricPng, vectorSrc: electricSvg },
    fairy: { color: "#EC8FE6", pngSrc: fairyPng, vectorSrc: fairySvg },
    fighting: { color: "#CE416B", pngSrc: fightingPng, vectorSrc: fightingSvg },
    fire: { color: "#FF9D55", pngSrc: firePng, vectorSrc: fireSvg },
    flying: { color: "#89AAE3", pngSrc: flyingPng, vectorSrc: flyingSvg },
    ghost: { color: "#5269AD", pngSrc: ghostPng, vectorSrc: ghostSvg },
    grass: { color: "#63BC5A", pngSrc: grassPng, vectorSrc: grassSvg },
    ground: { color: "#D97845", pngSrc: groundPng, vectorSrc: groundSvg },
    ice: { color: "#73CEC0", pngSrc: icePng, vectorSrc: iceSvg },
    normal: { color: "#919AA2", pngSrc: normalPng, vectorSrc: normalSvg },
    poison: { color: "#B567CE", pngSrc: poisonPng, vectorSrc: poisonSvg },
    psychic: { color: "#FA7179", pngSrc: psychicPng, vectorSrc: psychicSvg },
    rock: { color: "#C5B78C", pngSrc: rockPng, vectorSrc: rockSvg },
    steel: { color: "#5A8EA2", pngSrc: steelPng, vectorSrc: steelSvg },
    water: { color: "#5090D6", pngSrc: waterPng, vectorSrc: waterSvg },
  };

  return (
    types[type] ?? { color: "#919AA2", pngSrc: normalPng, vectorSrc: normalSvg }
  );
}

export { getAppPkmnDetailFromApi, getImageConfigFromType };
