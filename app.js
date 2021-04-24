//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event)
{
    //prevemt form from submitting
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    todoDiv.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //check mark button
    const completeButton =document.createElement('button');
    completeButton.innerHTML = '<i class ="fas fa-check"></i>'
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //check trash button
    const trashButton =document.createElement('button');
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //
    todoList.appendChild(todoDiv);
    //clear todoInput value
    todoInput.value= "";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === "trash-btn"){
        const todo =item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const todo =item.parentElement;
        todo.classList.toggle("complete");
    }

}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains('complete')){
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('complete')){
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;
            
        }
    });
}

function saveLocalTodos(todo){
   
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
    

function getTodos(){
    
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
    
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
    
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        todoDiv.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        //check mark button
        const completeButton =document.createElement('button');
        completeButton.innerHTML = '<i class ="fas fa-check"></i>'
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
    
        //check trash button
        const trashButton =document.createElement('button');
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //
        todoList.appendChild(todoDiv);
    
        });

}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')=== null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}

