import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {TodoItemComponent} from './todo-item.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TodoModel} from '../core/interfaces/todo.interface';
import {BrowserModule, By} from '@angular/platform-browser';

describe('TodoItemComponent', () => {
    let fixture: ComponentFixture<TodoItemComponent>;
    let component: TodoItemComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoItemComponent
            ],
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                CommonModule,
                BrowserModule
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoItemComponent);
            component = fixture.debugElement.componentInstance;
        });
    }));

    it('check completed item', () => {
        console.log(fixture , 'item');
        component.item = {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: true
        } as TodoModel;
        fixture.detectChanges();
        const compiled = fixture.debugElement;
        expect(compiled.query(By.css('.completed'))).toBeTruthy(null);

        component.item.completed = false;
        fixture.detectChanges();
        expect(compiled.query(By.css('.completed'))).toBeFalsy(null);
    });

    it('check enable edit item', () => {
        console.log(fixture , 'item');
        component.item = {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false
        } as TodoModel;
        component.enableEdit = false;
        fixture.detectChanges();
        const compiled = fixture.debugElement
        const buttonEdit = compiled.query(By.css('.button-edit')).nativeElement;
        buttonEdit.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(compiled.query(By.css('.button-done'))).toBeTruthy(null);

        const buttonDone = compiled.query(By.css('.button-done')).nativeElement;
        component.changeValue = 'xxxxx';
        buttonDone.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(compiled.query(By.css('.button-edit'))).toBeTruthy(null);
        expect(compiled.query(By.css('.label-title')).nativeElement.textContent).toEqual('xxxxx');
    });
});
