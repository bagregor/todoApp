import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { left } from '@popperjs/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SERVER_API_URL } from 'src/app/app.constante';
import { Todo } from 'src/model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }

  getAll(): Observable<any>{

    return this.http.get<Todo>(SERVER_API_URL+'/todo/list').pipe(
      map(todo => {
        return todo;
      }),
      tap(
        _ => _,
      ));
  } 

  addTodo(todo: Todo) : Observable<Todo>{
    return this.http.post<Todo>(SERVER_API_URL+'/todo', todo);
  }

  updateTodo(todo: Todo) : Observable<Todo>{
    return this.http.post<Todo>(SERVER_API_URL+'/todo', todo);
  }

  deleteTodo(idTodo: number) {
    return this.http.delete(SERVER_API_URL+'/todo/'+ idTodo);
  }


}
