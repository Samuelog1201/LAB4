import * as components from "./components/indexPadre"
import Character, { Attribute } from "./components/Character/Character";
import { getCharacters, getEpisode } from "./services/dataFetch";

class AppContainer extends HTMLElement {
    cards: Character[] = [];
    dataCharacter: any[] = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        // Crear el input y el botón
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Cantidad de personajes';
        
        const button = document.createElement('button');
        button.innerText = 'Cargar personajes';
        button.addEventListener('click', async () => {
            this.dataCharacter= []
            const quantity = parseInt(input.value); // Obtener el valor del input
            if (isNaN(quantity) || quantity <= 0) {
                alert('Por favor ingresa un número válido');
                return;
            }
            await this.loadCharacters(quantity); // Cargar personajes con la cantidad especificada
        });

        this.shadowRoot?.appendChild(input);
        this.shadowRoot?.appendChild(button);
    }

    async loadCharacters(quantity: number) {
        const characters = await getCharacters(quantity); 
        // Pasar la cantidad a getCharacters
        this.dataCharacter = characters;

        // Procesar cada personaje y obtener el nombre del primer episodio
        for (const character of this.dataCharacter) {
            const firstEpisodeUrl = character.episode[0];
            const firstEpisodeName = await getEpisode(firstEpisodeUrl);
            
            const card = this.ownerDocument.createElement("my-character") as Character;
            card.setAttribute(Attribute.image, character.image);
            card.setAttribute(Attribute.name, character.name);
            card.setAttribute(Attribute.status, character.status);
            card.setAttribute(Attribute.species, character.species);
            card.setAttribute(Attribute.type, character.type || 'N/A');
            card.setAttribute(Attribute.originname, character.origin.name);
            card.setAttribute(Attribute.namefirst, firstEpisodeName);
            this.cards.push(card);
        }

        this.render(); // Renderiza los personajes
    }

    render() {
        if (this.shadowRoot) {
            this.cards.forEach((myCharacter) => {
                this.shadowRoot?.appendChild(myCharacter);
            });
        }
    }
}

customElements.define("app-container", AppContainer);
