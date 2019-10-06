import TodoList from './TodoList';

customElements.define('todo-list', TodoList);

const List = customElements.get('todo-list');
const list = new List() as TodoList;

document.querySelector('#mount').appendChild(list);

list.addItem('Todo item 1');
list.addItem('Todo item 2');
