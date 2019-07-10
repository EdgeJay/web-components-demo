async function bar() {
  return 'bar';
}

async function foo(func: typeof bar) {
  const result = await func();
  console.log(result);
}

foo(bar).then(() => console.log('done!'));

class SimpleButton extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({
      mode: 'open',
    });

    shadowRoot.innerHTML = `
      <button>Foo!</button>
    `;
  }
}

customElements.define('simple-button', SimpleButton);

const El = customElements.get('simple-button');
const elem = new El();
console.log(elem);
document.getElementById('mount').appendChild(elem);
