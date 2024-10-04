export const getCharacters = async (quantity: number) => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character`);
        const characters = await response.json();
        return characters.results.slice(0, quantity); // Asegurarte de devolver sólo la cantidad deseada
    } catch (error) {
        console.error(error);
        return []; // Retornar un array vacío en caso de error
    }
};

// Nueva función para obtener los episodios
export const getEpisode = async (episodeUrl: string) => {
    try {
        const response = await fetch(episodeUrl);
        const episode = await response.json();
        return episode.name; // Devuelve el nombre del episodio
    } catch (error) {
        console.error("Error fetching episode:", error);
        return "Unknown Episode"; // Devuelve un valor predeterminado en caso de error
    }
}
