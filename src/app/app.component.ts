import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {TodosService} from './core/services/todos.service';
import {TodoModel} from './core/interfaces/todo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  items:any[] = [];

  removeItem$Sub;

  editItem$Sub;

  todosSub;

  getNewTodosSub;

  saveTodosSub;

  constructor(private todosService:TodosService) {

  }

  ngOnInit() {
    this.getTodos();
    this.getNewTodos();
    this.checkTodosToRemove();
    this.checkTodosToEdit();
  }

  ngOnDestroy() {
    this.todosSub.unsubscribe();
    if(this.saveTodosSub) { this.saveTodosSub.unsubscribe(); }
    if(this.removeItem$Sub) { this.removeItem$Sub.unsubscribe(); }
    if(this.editItem$Sub) { this.editItem$Sub.unsubscribe(); }
  }
  checkTodosToRemove() {
    this.removeItem$Sub = this.todosService.removeItem$.subscribe((item: TodoModel) => {
      console.log('new item', item)

      if(item) {
        this.items = this.items.filter(current => current.id !== item.id);
      }
    });
  }
  checkTodosToEdit() {
    this.editItem$Sub = this.todosService.editItem$.subscribe((item: TodoModel) => {
      if(item) {
        for (let i of this.items) {
          if (i.id === item.id) {
            i = item;
          }
        }
      }
    });
  }
  getTodos() {
    this.todosSub = this.todosService.getTodos().subscribe((todos:TodoModel[]) => {
      this.items = [...todos];
    });
  }
  getNewTodos() {
    this.getNewTodosSub = this.todosService.addItem$.subscribe((todos:TodosService) => {
      this.items.push(todos);
    });
  }
}
