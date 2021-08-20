import {Component, Input, OnInit} from '@angular/core';
import {TodoModel} from '../core/interfaces/todo.interface';
import {TodosService} from '../core/services/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() item: TodoModel;
  changeValue: string;
  enableEdit: boolean;

  constructor(private todosService:TodosService) {
  }

  toggleStatus() {
    this.item.completed = !this.item.completed;
    this.todosService.editItem(this.item);
  }

  removeItem() {
    this.todosService.removeItem(this.item);
  }

  ngOnInit(): void {
    this.changeValue = this.item.title;
  }

  edit() {
    this.item.title = this.changeValue;
    this.todosService.editItem(this.item);
    this.enableEdit = false;
  }
}
