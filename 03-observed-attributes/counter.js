class SimpleCounter extends HTMLElement {
  static get observedAttributes() {
    return ['count'];
  }

  constructor() {
    super();

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
        <h1>Counter</h1>
        <div class="content">
          <button>Click Me!</button>
          <p></p>
        </div>
      </div>
    `;
    this.container = this.shadowRoot.querySelector('#container');
    this.button = this.container.querySelector('button');
    this.countDisplay = this.container.querySelector('p');

    this.handleClick = this.handleClick.bind(this);
  }

  set count(val) {
    if (!val) {
      this.setAttribute('count', '0');
    } else {
      this.setAttribute('count', val.toString());
    }
  }

  get count() {
    const count = this.getAttribute('count');
    if (!count) {
      return 0;
    }
    return parseInt(count, 10);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'count') {
      let count = 0;
      if (this.hasAttribute('count')) {
        count = parseInt(newVal, 10);
      }
      this.countDisplay.innerHTML = `Count: ${count}, previous value is ${oldVal || 0}`;
    }
  }

  connectedCallback() {
    this.button.addEventListener('click', this.handleClick);
    this.countDisplay.innerHTML = `Count: ${this.count}`;
  }

  handleClick() {
    this.count += 1;
  }
}

const EMPTY_COUNTER_SLOT = '<p>No counter available</p>';

class CounterSlots extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-top: 20px;
          border: 1px solid black;
          padding: 5px 5px;
        }

        ul {
          display: flex;
          flex-flow: row wrap;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          margin: 0;
          padding: 5px;
          flex: 0 0 calc(50%);
          box-sizing: border-box;
        }

        ::slotted(simple-counter) {
          margin-bottom: 0px;
          --background-color: skyblue;
        }

        ::slotted(simple-counter[slot=slot-1]) {
          --border-radius: 8px;
          --border: 2px dashed darkblue;
        }

        ::slotted(simple-counter[slot=slot-3]) {
          --background-color: cyan;
        }

        ::slotted(simple-counter[slot=slot-4]) {
          --background-color: turquoise;
        }
      </style>

      <ul>
        <li>
          <slot name="slot-1">${EMPTY_COUNTER_SLOT}</slot>
        </li>
        <li>
          <slot name="slot-2">${EMPTY_COUNTER_SLOT}</slot>
        </li>
        <li>
          <slot name="slot-3">${EMPTY_COUNTER_SLOT}</slot>
        </li>
        <li>
          <slot name="slot-4">${EMPTY_COUNTER_SLOT}</slot>
        </li>
      </ul>
    `;
  }
}

customElements.define('simple-counter', SimpleCounter);
customElements.define('counter-slots', CounterSlots);
