import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {TodosListComponent} from './todos-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {TodoModel} from '../core/interfaces/todo.interface';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

describe('TodoAddComponent', () => {
    let fixture: ComponentFixture<TodosListComponent>;
    let component: TodosListComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodosListComponent,
                TodoItemComponent
            ],
            imports: [
                BrowserModule,
                CommonModule,
                HttpClientModule
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodosListComponent);
            component = fixture.debugElement.componentInstance;
        });
    }));

    it('render empty template', () => {
        const compiled = fixture.debugElement.nativeElement;
        component.items = [];
        fixture.detectChanges();
        expect(compiled.querySelector('p').textContent).toContain('Add your first task now.');
    });

    it('not render appTodoItem', () => {
        const compiled = fixture.debugElement.nativeElement;
        component.items = [];
        console.log(compiled, 'compiled');
        fixture.detectChanges();
        expect(component.appTodoItem).toBeUndefined();
    });

    it('render appTodoItem', () => {
        const compiled = fixture.debugElement.nativeElement;
        const item = {
            userId: 1,
            id: 2,
            title: 'string',
            completed: true,
        } as TodoModel;
        component.items = [item];
        console.log(compiled, 'compiled');
        fixture.detectChanges();
        expect(component.appTodoItem).toBeTruthy();
        expect(compiled.querySelector('p')).toBeNull();
    });
});
