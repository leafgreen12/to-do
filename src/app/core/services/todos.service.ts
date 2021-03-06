import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoModel} from '../interfaces/todo.interface';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http:HttpClient) { }

  private _editItem = new Subject();
  editItem$ = this._editItem.asObservable();

  private _removeItem = new Subject();
  removeItem$ = this._removeItem.asObservable();

  private _addItem = new Subject();
  addItem$ = this._addItem.asObservable();

  getTodos() {
    return this.http.get('https://run.mocky.io/v3/b4dfc957-40ee-4458-b064-6428a8f021db');
  }

  editItem(item: TodoModel) {
    this._editItem.next(item);
  }

  removeItem(item: TodoModel) {
    this._removeItem.next(item);
  }

  addItem(item: TodoModel) {
    this._addItem.next(item);
  }
}
