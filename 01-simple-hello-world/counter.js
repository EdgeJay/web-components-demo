class SimpleCounter extends HTMLElement {
  constructor() {
    super();

    this.count = 0;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-bottom: 20px;
          --background-color: lightgrey;
          --border-radius: 0px;
          --border: none;
        }

        :host(:last-child) {
          margin-bottom: 0;
        }

        #container {
          padding: 10px 20px;
          background-color: var(--background-color);
          border-radius: var(--border-radius);
          border: var(--border);
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
        <h2>Counter</h2>
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

customElements.define('simple-counter', SimpleCounter);
