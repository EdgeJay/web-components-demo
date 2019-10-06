enum TodoItemStatus {
  Pending = 'PENDING',
  Completed = 'COMPLETED',
  Archived = 'ARCHIVED',
}

interface ITodoItem {
  status: TodoItemStatus;
  createdOn: Date;
  updatedOn: Date;
}

class TodoList extends HTMLElement {
  private _container: HTMLElement;
  private _listContainer: HTMLElement;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="container">
        <ul></ul>
      </div>
    `;
    this._container = this.shadowRoot.querySelector('.container');
    this._listContainer = this._container.querySelector('ul');
  }

  get container() {
    return this._container;
  }

  get listContainer() {
    return this._listContainer;
  }
}

customElements.define('todo-list', TodoList);

const List = customElements.get('todo-list');
const list = new List();

document.querySelector('#mount').appendChild(list);
