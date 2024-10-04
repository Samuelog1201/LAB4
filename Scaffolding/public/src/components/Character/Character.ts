import CharacterStyle from "./Character.css";

export enum Attribute {
    "image" = "image",
    "name" = "name",
    "status" = "status",
    "species" = "species",
    "type" = "type",
    "originname" = "originname",
    "namefirst" = "namefirst",
}

class Character extends HTMLElement {
    image?: string;
    name?: string;
    status?: string;
    species?: string;
    type?: string;  // Mantener como string o number según la API
    originname?: string;
    namefirst?: string;

    static get observedAttributes() {
        return Object.keys(Attribute); // Esto observará cambios en los atributos del componente
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    attributeChangedCallback(propName: string, _: string, newValue: string) {
        // Asignar el nuevo valor a la propiedad correspondiente
        switch (propName) {
            case Attribute.image:
                this.image = newValue;
                break;
            case Attribute.name:
                this.name = newValue;
                break;
            case Attribute.status:
                this.status = newValue;
                break;
            case Attribute.species:
                this.species = newValue;
                break;
            case Attribute.type:
                this.type = newValue;
                break;
            case Attribute.originname:
                this.originname = newValue;
                break;
            case Attribute.namefirst:
                this.namefirst = newValue;
                break;
            default:
                break;
        }
        this.render();  // Re-renderizar cada vez que se cambie un atributo
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                </style>
                <section>
                    <img class="image-character" src="${this.image || ''}" alt="${this.name || ''}">
                    <h1>${this.name || 'No name available'}</h1>
                    <h2>Status: ${this.status || 'Unknown'}</h2>
                    <h2>Species: ${this.species || 'Unknown'}</h2>
                    <h2>Type: ${this.type || 'N/A'}</h2>
                    <h2>Origin: ${this.originname || 'Unknown'}</h2>
                    <h2>Name of first Episode : ${this.namefirst || 'Unknown'}</h2>
                </section>
            `;

            // const styles = this.ownerDocument.createElement("style")
            // styles.innerHTML= CharacterStyle
            // this.shadowRoot.appendChild(styles)
        }
    }
}

customElements.define("my-character", Character);
export default Character;
