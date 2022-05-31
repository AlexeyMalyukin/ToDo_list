const addTask = document.getElementById('add-task-btn');
const taskInput = document.getElementById('description-task');
const todoList = document.querySelector('.todo_list');



let tasks;
!localStorage.tasks ? tasks = [] : tasks = 
JSON.parse(localStorage.getItem('tasks'));


let todoTasks = [];

function Task(desription) {
    this.description = desription;
    this.completed = false;
}

const createTask = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            
            <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
            <div class="description">${task.description}</div>
            <div class="buttons">
                
                <button onclick="deleteTask(${index})" class="btn-delete"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `

}




const fillList = () => {
    todoList.innerHTML = "";
    if(tasks.length > 0) {
        
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTask(item, index);

        });
        todoTasks = document.querySelectorAll('.todo-item');
    }
}

fillList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) {
        todoTasks[index].classList.add('checked');
    } else {
        todoTasks[index].classList.remove('checked');
    }
    updateLocal();
    fillList();

}





addTask.addEventListener('click', () => {
    tasks.push(new Task(taskInput.value));
    updateLocal();
    fillList();
    taskInput.value = '';
});

const deleteTask = index => {
    todoTasks[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillList();
    }, 500)
}