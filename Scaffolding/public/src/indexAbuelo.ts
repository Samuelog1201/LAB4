import * as components from "./components/indexPadre"
import Character, {Attribute} from "./components/Character/Character";
import {getCharacters} from "./services/dataFetch";

class AppContainer extends HTMLElement{
    cards: Character[] = [];
    dataCharacter: any [] = []

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        this.dataCharacter.forEach((cards) =>{
            const card = this.ownerDocument.createElement("my-character") as Character;
            card.setAttribute(Attribute.image,cards.image);
            card.setAttribute(Attribute.name,cards.name);
            card.setAttribute(Attribute.status,cards.status);
            card.setAttribute(Attribute.species,cards.species);
            card.setAttribute(Attribute.type,cards.type);
            card.setAttribute(Attribute.originname,cards.originname);
            card.setAttribute(Attribute.namefirst,cards.namefirst);
            this.cards.push(dataCharacter);
        })
    }

     async connectedCallback(){
        const data = await getCharacters();
        console.log(data);
        this.render(data);
    }

    render(dataCharacter:any){
        console.log(dataCharacter.name)
        if(this.shadowRoot){
            this.cards.forEach((myCharacter)=>{
                this.shadowRoot?.appendChild(myCharacter);
            })
        }
    }
}

customElements.define("app-container", AppContainer);