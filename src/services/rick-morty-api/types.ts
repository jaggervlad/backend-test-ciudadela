export interface Root {
  data: Data;
}

export interface Data {
  characters: Characters;
}

export interface Characters {
  results: Character[];
  info: Info;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface Info {
  count: number;
  pages: number;
  next?: number | null;
  prev?: number | null;
}

export type ApiCharacterOperation = {
  data: {
    characters: Characters;
  };
  variables: {
    page?: number;
    filter?: any;
  };
};
