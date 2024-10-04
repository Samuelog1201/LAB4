export const getCharacters = async () => {
    try {
        const characters = await fetch("https://rickandmortyapi.com/api/character").then(res => res.json());
        return characters;
    } catch (error) {
        console.error(error);
    }
}