export const getCharactersQuery = /* GraphQL */ `
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        status
        species
        type
        gender
        image
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;
