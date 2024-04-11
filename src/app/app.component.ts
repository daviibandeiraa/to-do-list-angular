import { Component } from '@angular/core';
import { Todo } from 'src/models/todos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: String = 'list';  //criando a variavel no estilo lista
  public todos: Todo[] = []; // criando a variavel "todos" como array no estilo any
  public title: string = 'Minhas Tarefas'; // titulo = string
  public form: FormGroup; // variavel para formulário com input e botoes


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])] // definindo quantidade minima e maxima de caracteres no input da tarefa
    });

    this.load(); // salva na memoria "LocalStorage" do seu navegador e faz com que não apague as tarefas quando recarregar a página
  }

  changeMode(mode: String) {
    this.mode = mode;

  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;  // define o numero (id) das tarefas que são adicionadas
    this.todos.push(new Todo(id, title, false)); // cria uma nova tarefa, trazendo titulo, id e se foi feita ou não (true ou false)
    this.save() // salva no localStorage do navegador
    this.clear()
    this.changeMode('list'); // converte para lista
  }

  clear() {
    this.form.reset() // limpa o input sempre que adiciona uma nova tarefa
  }
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1)
      this.todos.splice(index, 1) // se a tarefa ja foi concluida, o splice irá excluir ela da tela
    this.save(); // salva no localStorage do navegador
  }

  markAsDone(todo: Todo) {
    todo.done = true;  // ao clicar no botão, retorna que a tarefa foi concluida
    this.save();
  }
  markAsUndone(todo: Todo) {
    todo.done = false // ao clicar no botão, voce remove o "conluido" da tarefa
    this.save(); // salva no localstorage do navegador
  }

  save() {
    const data = JSON.stringify(this.todos); // converte de "JSON" para string no localstorage do navegador
    localStorage.setItem('todos', data); // setando o que quer que salve no localstorage
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }


}
