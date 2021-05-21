import {Component, Input, ViewChild} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent {
  @Input() items;
  @ViewChild('appTodoItem') appTodoItem: TodoItemComponent
}
