import TodoList from './TodoList';

customElements.define('todo-list', TodoList);

const List = customElements.get('todo-list');
const list = new List() as TodoList;

document.querySelector('#mount').appendChild(list);
