import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Todo } from 'src/model/todo';
import { TodoService } from 'src/services/todo.service';
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  p: number = 1;
  count: number = 5;
  todos!: Todo[];
  nameUser!: string;
  todo!: Todo;

  isRegister = false;

  isUpdate = false;
  
  isDelete = false;
  
  isError = false;
  id!: number;
  
  modalAddTodo : Modal | undefined;

  modalUpdateTodo : Modal | undefined;

  modalDeleteTodo : Modal | undefined;
  modifTodoForm! : FormGroup;
  deleteTodoForm!: FormGroup;

  addTodoForm = this.formBuilder.group({
    todo_label:[''],
    todo_is_done: [0],
  });
  constructor(private todoService : TodoService,private formBuilder : FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadAllTodos();

    if(localStorage.getItem('currentUser') != null) {
      const token = localStorage.getItem('currentUser');
      const currentUser = JSON.parse(token!);
      const user_name = currentUser?.user.name;
      this.nameUser = user_name;
    }
  }

  getEditFormData() {
    return this.modifTodoForm?.controls;
  }


  loadAllTodos(){
    this.todoService.getAll().pipe().subscribe(
        todos => {
             this.todos = todos;
             return this.todos;
        });
  }

  openDialogForAddTodo() {
    this.modalAddTodo = new bootstrap.Modal(document.getElementById('modalAddTodo')!, {
      keyboard : false
    })
  
    this.modalAddTodo?.show();

  }

  openDialogForDeleteTodo(todos: Todo){
    this.todo = todos;
    this.id = this.todo?.todo_id;

    this.modalDeleteTodo = new bootstrap.Modal(document.getElementById('modalDeleteTodo')!, {
      keyboard : false
    })

    this.modalDeleteTodo?.show();

  }

  openDialogForUpdateTodo(todos: Todo){

      this.todo = todos;
      this.modifTodoForm = this.formBuilder.group({
        todo_id : [this.todo?.todo_id],
        todo_label:[this.todo?.todo_label],
        todo_is_done: [this.todo?.todo_is_done],
      }); 
     
      this.modalUpdateTodo = new bootstrap.Modal(document.getElementById('modalUpdateTodo')!, {
        keyboard : false
      })
  
      this.modalUpdateTodo?.show();

  }

  saveTodo(){
    this.todo = this.addTodoForm.value;

    this.todoService.addTodo(this.todo).pipe().subscribe(
      () => {
       this.isRegister = true;
       setTimeout( () => {
        this.isRegister = false; // here... this has different context
       }, 2000);

       this.loadAllTodos();
       this.modalAddTodo?.hide();
         
     },
     _error => {
      
       this.isError = true;
       setTimeout( () => {
        this.isError = false; // here... this has different context
       }, 2000);

       this.loadAllTodos();
       this.modalAddTodo?.hide()
      });
  }

  updateTodo(){
    this.todo = this.modifTodoForm.value;

    this.todoService.updateTodo(this.todo)
            .pipe()
            .subscribe(
                () => {
                  this.isUpdate = true;

                  this.loadAllTodos();
                  this.modalUpdateTodo?.hide();
                  setTimeout( () => {
                   console.log('hide');
                   this.isUpdate = false; // here... this has different context
                  }, 2000);
  
                },
                _error => {
                  this.modalUpdateTodo?.hide()
                  this.isError = true;
                  setTimeout( () => {
                   this.isError = false; // here... this has different context
                  }, 2000);

                  this.loadAllTodos();
                 
    }); 
  }

  deleteTodo(todo_id: number) {
    console.log("Le delete id "+todo_id)
    this.todoService.deleteTodo(todo_id)
    .pipe()
    .subscribe(
        () => {
          this.isDelete = true;

          this.loadAllTodos();
          this.modalDeleteTodo?.hide();
          setTimeout( () => {
           console.log('hide');
           this.isDelete = false; // here... this has different context
          }, 2000);

        },
        _error => {
          this.modalDeleteTodo?.hide()
          this.isError = true;
          setTimeout( () => {
           this.isError = false; // here... this has different context
          }, 2000);

          this.loadAllTodos();
         
}); 
}

deconnection(){
 this.authService.logout();
}
}
