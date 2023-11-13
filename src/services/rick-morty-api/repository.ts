import { getCharactersQuery } from './queries';
import { ApiCharacterOperation, Character, Characters } from './types';
import { apiFetch } from './utils';

export async function getCharacters({
  page = 1,
  filter = { species: 'Human' },
}: {
  page?: number;
  filter?: any;
}): Promise<Characters> {
  const res = await apiFetch<ApiCharacterOperation>({
    query: getCharactersQuery,
    variables: {
      page,
      filter,
    },
  });

  return res.body.data.characters;
}
