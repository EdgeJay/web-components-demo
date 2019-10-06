import { TodoItemStatus } from './enums';
import { ITodoItemData } from './interfaces';

export { TodoItemStatus };

export default class TodoList extends HTMLElement {
  private _totalTodoItems: number;
  private _todoItems: ITodoItemData[];
  private _container: HTMLElement;
  private _listContainer: HTMLElement;
  private _templateNode: HTMLTemplateElement;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="container">
        <template id="item-template">
          <li><p></p></li>
        </template>
        <ul></ul>
      </div>
    `;
    this._totalTodoItems = 0;
    this._todoItems = [];
    this._container = this.shadowRoot.querySelector('.container');
    this._listContainer = this._container.querySelector('ul');
    this._templateNode = this._container.querySelector('#item-template');
  }

  get todoItems() {
    return this._todoItems;
  }

  get container() {
    return this._container;
  }

  get listContainer() {
    return this._listContainer;
  }

  addItem(message: string, status: TodoItemStatus = TodoItemStatus.Pending): number {
    this._totalTodoItems += 1;
    const now = new Date();
    this.todoItems.push({
      index: this._totalTodoItems,
      message,
      status,
      createdOn: now,
      updatedOn: now,
    });
    this.refreshItems();
    return this._totalTodoItems;
  }

  removeItem(index: number): boolean {
    const newList = this.todoItems.filter(item => item.index !== index);
    const removed = newList.length < this.todoItems.length;
    this._todoItems = newList;
    
    if (removed) {
      this.refreshItems();
    }
    
    return removed;
  }

  refreshItems() {
    const nodes = this.listContainer.querySelectorAll('li');
    nodes.forEach(node => this.listContainer.removeChild(node));
    this.todoItems.forEach(item => {
      const node = document.importNode(this._templateNode.content, true);
      node.querySelector('p').innerText = item.message;
      this.listContainer.appendChild(node);
    });
  }
}
