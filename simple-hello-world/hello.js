class HelloWorld extends HTMLElement {
  constructor() {
    super();

    this.count = 0;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        #container {
          background-color: lightgrey;
          padding: 10px 20px;
        }
        
        .content {
          display: flex;
          flex-flow: row nowrap;
        }

        .content p {
          margin-left: 10px;
        }

        button {
          font-size: 20px;
        }
      </style>
      <div id="container">
        <h1>Hello!</h1>
        <div class="content">
          <button>Click Me!</button>
          <p>Count: ${this.count}</p>
        </div>
      </div>
    `;
    this.container = this.shadowRoot.querySelector('#container');
    this.button = this.container.querySelector('button');
    this.countDisplay = this.container.querySelector('p');

    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.button.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.count += 1;
    this.countDisplay.innerHTML = `Count: ${this.count}`;
  }
}

customElements.define('hello-world', HelloWorld);

const El = customElements.get('hello-world');
const elem = new El();

document.getElementById('mount').appendChild(elem);
