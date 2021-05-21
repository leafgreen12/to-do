import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {BrowserModule, By} from '@angular/platform-browser';
import {TodoModel} from '../core/interfaces/todo.interface';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TodoAddComponent} from './todo-add.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('TodoAddComponent', () => {
    let fixture: ComponentFixture<TodoAddComponent>;
    let component: TodoAddComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodoAddComponent,
                TodoItemComponent
            ],
            imports: [
                BrowserModule,
                CommonModule,
                ReactiveFormsModule,
                HttpClientModule
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoAddComponent);
            component = fixture.debugElement.componentInstance;
        });
    }));

    it('#addNew alert add task fail', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement
        spyOn(window, 'alert');
        component.addTodoForm.controls.title.setValue('');
        const el = compiled.query(By.css('.create-task')).nativeElement;
        el.click();
        expect(window.alert).toHaveBeenCalledWith('No Task to add!');
    });

    it('#input warning required', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement
        component.addTodoForm.controls.title.setValue('');
        expect(component.title.errors.required).toBeTrue();
        const elInputTask = compiled.query(By.css('.input-task-content')).nativeElement;
        elInputTask.focus();
        elInputTask.dispatchEvent(new Event('blur'));
        fixture.detectChanges();

        const elErrorRequired = compiled.query(By.css('.error-text-required')).nativeElement;
        expect(elErrorRequired.textContent).toContain('This field is mandatory!');
    });

    it('#input warning max length', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement
        component.addTodoForm.controls.title.setValue('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        fixture.detectChanges();
        const elErrorMaxChar = compiled.query(By.css('.error-text-char-max')).nativeElement;
        expect(elErrorMaxChar.textContent).toContain('10 Char Max!');
    });
});
