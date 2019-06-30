class HelloWorld extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        #container {
          background-color: lightgrey;
          padding: 10px 20px;
        }
      </style>
      <div id="container">
        <button>Click Me!</button>
      </div>
    `;
    this.container = this.shadowRoot.querySelector('#container');
  }

  connectedCallback() {
    this.container.querySelector('button').onclick = () => console.log('clicked!');
  }
}

customElements.define('hello-world', HelloWorld);

const El = customElements.get('hello-world');
const elem = new El();

document.getElementById('mount').appendChild(elem);
