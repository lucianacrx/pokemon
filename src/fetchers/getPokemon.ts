export type ApiRow = {
  name: string;
  url: string;
};

export type ApiDetail = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  held_items: never[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  name: string;
  order: number;
  past_abilities: never[];
  past_types: never[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
        front_female: null;
      };
      home: {
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shiny_female: null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
      showdown: {
        back_default: string;
        back_female: null;
        back_shiny: string;
        back_shiny_female: null;
        front_default: string;
        front_female: null;
        front_shiny: string;
        front_shiny_female: null;
      };
    };
    versions?: unknown;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};

function fetchAllKantoPokemon(): Promise<ApiRow[]> {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((allPokemon) => {
      return allPokemon?.results ?? [];
    })
    .catch((e) => {
      console.error(e);
    });
}

function fetchPokemonDetail(pkmnNameOrId: string | number) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnNameOrId}/`)
    .then((response) => response.json())
    .then((pokemonDetail: ApiDetail) => {
      return pokemonDetail;
    })
    .catch((e) => {
      console.error(e);
    });
}

export { fetchAllKantoPokemon, fetchPokemonDetail };
