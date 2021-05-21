import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {TodosService} from './todos.service';
import {HttpClientModule} from '@angular/common/http';
import {TodoModel} from '../interfaces/todo.interface';


describe('TodosService', () => {
    let httpTestingController: HttpTestingController;
    let service: TodosService;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                TodosService
            ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(TodosService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('#getTodos should return expected data', (done) => {
        const expectedData: TodoModel[] = [
            {
                userId: 1,
                id: 1,
                title: 'delectus aut autem',
                completed: false
            },
            {
                userId: 1,
                id: 2,
                title: 'quis ut nam facilis et officia qui',
                completed: false
            },
            {
                userId: 1,
                id: 3,
                title: 'fugiat veniam minus',
                completed: false
            }
        ];

        service.getTodos().subscribe(data => {
            expect(data).toEqual(expectedData);
            done();
        });
        const testRequest = httpTestingController.expectOne('https://run.mocky.io/v3/b4dfc957-40ee-4458-b064-6428a8f021db');
        testRequest.flush(expectedData, { status: 200, statusText:'Ok' });
    });

    it('#getTodos should use GET to retrieve data', () => {
        service.getTodos().subscribe();

        const testRequest = httpTestingController.expectOne('https://run.mocky.io/v3/b4dfc957-40ee-4458-b064-6428a8f021db');

        expect(testRequest.request.method).toEqual('GET');
    });

    it('#getTodos should return an empty object on error', (done) => {
        const expectedData: TodoModel[] = []

        service.getTodos().subscribe(data => {

        }, error => {
            expect(error.error).toEqual(expectedData);
            done();
        });

        const testRequest = httpTestingController.expectOne('https://run.mocky.io/v3/b4dfc957-40ee-4458-b064-6428a8f021db');

        testRequest.flush([], { status: 500, statusText: 'Broken Service' });
    });

    it('#removeItem', (done) => {
        const expectedData: TodoModel = {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false
        }
        service.removeItem$.subscribe(data => {
            expect(data).toEqual(expectedData);
            done();
        }, error => {
            expect(error.error).toEqual(expectedData);
            done();
        });
        service.removeItem(expectedData);
    });

    it('#addItem', (done) => {
        const expectedData: TodoModel = {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false
        }
        service.addItem$.subscribe(data => {
            expect(data).toEqual(expectedData);
            done();
        }, error => {
            expect(error.error).toEqual(expectedData);
            done();
        });
        service.addItem(expectedData);
    });

    it('#editItem', (done) => {
        const expectedData: TodoModel = {
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false
        }
        service.editItem$.subscribe(data => {
            expect(data).toEqual(expectedData);
            done();
        }, error => {
            expect(error.error).toEqual(expectedData);
            done();
        });
        service.editItem(expectedData);
    });
});
