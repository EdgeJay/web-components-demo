import { TodoItemStatus } from './enums';
import { ITodoItemData } from './interfaces';

export { TodoItemStatus };

export default class TodoList extends HTMLElement {
  private _totalTodoItems: number;
  private _todoItems: ITodoItemData[];
  private _listContainer: HTMLElement;
  private _templateNode: HTMLTemplateElement;
  private _todoInput: HTMLInputElement;
  private _emptyMessage: HTMLParagraphElement;
  private _submitButton: HTMLButtonElement;

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        @import "//cdn.muicss.com/mui-0.9.43/css/mui.min.css";
        @import "//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

        .input-form {
          margin-top: 20px;
        }

        #empty-message {
          text-align: center;
          margin: 0;
        }

        .container ul {
          margin: 0;
        }

        .container ul li {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding: 10px 0;
        }

        .container ul li button {
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 20px;
          height: 20px;
          padding: 1px 2px;
        }

        .container ul li button + button {
          margin-left: 5px;
        }

        .container ul li p {
          flex: 1;
        }

        .container ul li p {
          margin: 0;
        }

        .container ul li p s {
          color: #ccc;
        }
      </style>
      <div class="input-form mui-panel">
        <form class="mui-form">
          <div class="mui-textfield">
            <input type="text" id="todo-input" placeholder="Enter todo item here..." />
          </div>
          <button class="mui-btn mui-btn--raised" id="submit-btn">Add To List</button>
        </form>
      </div>
      <div class="container mui-panel">
        <template id="item-template">
          <li>
            <p></p>
            <button class="check-btn"><i class="fa fa-check"></i></button>
            <button class="delete-btn"><i class="fa fa-trash"></i></button>
          </li>
        </template>
        <p id="empty-message">Your list is empty!</p>
        <ul class="mui-list--unstyled"></ul>
      </div>
    `;
    this._totalTodoItems = 0;
    this._todoItems = [];
    this._listContainer = this.shadowRoot.querySelector('.container ul');
    this._templateNode = this.shadowRoot.querySelector('#item-template');
    this._todoInput = this.shadowRoot.querySelector('#todo-input');
    this._emptyMessage = this.shadowRoot.querySelector('#empty-message');
    this._submitButton = this.shadowRoot.querySelector('#submit-btn');
    this._submitButton.addEventListener('click', this.handleSubmit);
  }

  get todoItems() {
    return this._todoItems;
  }

  get listContainer() {
    return this._listContainer;
  }

  handleSubmit(evt: Event) {
    evt.preventDefault();
    const message = this._todoInput.value;
    this.addItem(message);
    this._todoInput.value = '';
    this._todoInput.focus();
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
    this.refreshPanel();
    return this._totalTodoItems;
  }

  updateItem(index: number, { message, status }: { message?: string, status?: TodoItemStatus }) {
    const item = this.todoItems.find(item => item.index === index);
    if (item) {
      item.message = message || item.message;
      item.status = status || item.status;
    }
    this.refreshItems();
  }

  removeItem(index: number): boolean {
    const newList = this.todoItems.filter(item => item.index !== index);
    const removed = newList.length < this.todoItems.length;
    this._todoItems = newList;
    
    if (removed) {
      this.refreshItems();
      this.refreshPanel();
    }
    
    return removed;
  }

  removeAllItems() {
    const nodes = this.listContainer.querySelectorAll('li');
    nodes.forEach(node => this.listContainer.removeChild(node));
  }

  refreshItems() {
    this.removeAllItems();

    let index = 0;
    this.todoItems.forEach(item => {
      const node = document.importNode(this._templateNode.content, true);
      const checkBtn = node.querySelector('button.check-btn');
      const deleteBtn = node.querySelector('button.delete-btn');

      // setup message
      if (item.status === TodoItemStatus.Completed) {
        node.querySelector('p').innerHTML = `<s>${item.message}</s>`;
      } else {
        node.querySelector('p').innerHTML = item.message;
      }
      
      // setup listeners for buttons
      node.querySelector('button.check-btn').addEventListener('click', evt => {
        const btn = evt.currentTarget as HTMLButtonElement;
        const status = item.status === TodoItemStatus.Pending ? TodoItemStatus.Completed : TodoItemStatus.Pending;
        this.updateItem(item.index, {
          status,
        });
      });
      
      switch (item.status) {
        case TodoItemStatus.Pending:
          checkBtn.querySelector('i.fa').classList.add('fa-check');
          checkBtn.querySelector('i.fa').classList.remove('fa-times');
          break;
        case TodoItemStatus.Completed:
          checkBtn.querySelector('i.fa').classList.remove('fa-check');
          checkBtn.querySelector('i.fa').classList.add('fa-times');
          break;
      }

      deleteBtn.addEventListener('click', () => {
        this.removeItem(item.index);
      });
      
      this.listContainer.appendChild(node);
      
      if (index > 0) {
        this.listContainer.querySelector('li:last-child').setAttribute('class', 'mui--divider-top');
      }

      index += 1;
    });
  }

  refreshPanel() {
    this._emptyMessage.style.display = this._todoItems.length > 0 ? 'none' : 'block';
  }
}
