import CharacterStyle from "./Character.css";

export enum Attribute {
    "image" = "image",
    "name" = "name" ,
    "status" = "status",
    "species" = "species" ,
    "type" = "type",
    "originname" = "originname",
    "namefirst" = "namefirst"
}

class Character extends HTMLElement {
    
    image?: string;
    name?: string;
    status?: string;
    species?: string;
    type?: number;
    originname?: string;
    namefirst?: string;
    
    static get observedAttributes(){
        const attrs: Record<Attribute, null> = {
            image: null,
            name: null,
            status: null,
            species: null,
            type: null,
            originname: null,
            namefirst: null,

        }
        return Object.keys(attrs);
       
    }
        
        constructor(){
            super();
            this.attachShadow({mode: "open"})
        }
        
        //Sucede cuando el componente ingresa al DOM
        connectedCallback(){
            this.mount();
        }

        mount(){
            this.render();

            //Seleccionar mi boton
            const btn = this.shadowRoot?.querySelector('button');
            
            //Quiero hacer algo con mi boton al dar click
            btn?.addEventListener("click",()=>{
                
            })
        }
        
        render(){
            if(this.shadowRoot){
                this.shadowRoot.innerHTML = `
                    <style>
                   
                    </style>
                    <section>
                    <img class "image-character" src "${this.image}">
                    <h1>${this.name}</h1>
                    <h1>${this.status}</h1>
                    <h1>${this.species}</h1>
                    <h1>${this.type}</h1>
                    <h1>${this.originname}</h1>
                    <h1>${this.namefirst}</h1>
                    <button>Me gusta</button>
                    </section>
                `
            }
        }
    }
customElements.define("my-character",Character);
export default Character;