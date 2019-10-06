import { TodoItemStatus } from './enums';

export interface ITodoItemData {
  index: number;
  message: string;
  status: TodoItemStatus;
  createdOn: Date;
  updatedOn: Date;
}
