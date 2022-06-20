const addTask = document.getElementById('add-task-btn');
const taskInput = document.getElementById('description-task');
const todoList = document.querySelector('.todo_list');

//const importantStar = documen.querySelector('.important_design');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = 
JSON.parse(localStorage.getItem('tasks'));


let todoTasks = [];

function Task(desription) {
    this.description = desription;
    this.completed = false;
    this.important = false;
}

const createTask = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            
            <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${task.completed ? 'checked' : ''}>
            <div class="description">${task.description}</div>

            <div class="imprt">
                <input onclick="importantTask(${index})" type="checkbox" class="btn-important" ${task.important ? 'important' : ''}>
                <label class="important_star ${task.important ? 'important' : ''}"><i class="fa-solid fa-star"></i></label>
            </div>
            <div class="buttons">
                
                <button onclick="deleteTask(${index})" class="btn-delete"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `

}


const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => (item.completed == false && item.important == false));
    const completedTasks = tasks.length && tasks.filter(item => (item.completed == true)); 
    const importantTasks = tasks.length && tasks.filter(item => (item.completed == false && item.important == true));
    tasks = [...importantTasks,...activeTasks,...completedTasks];
}

const fillList = () => {
    todoList.innerHTML = "";
    if(tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoList.innerHTML += createTask(item, index);

        });
        todoTasks = document.querySelectorAll('.todo-item');
    } else {
        todoList.innerHTML = `<div class="todo_empty">You don't have tasks...<div>`;
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
        tasks[index].important = false;
    } else {
        todoTasks[index].classList.remove('checked');
    }
    updateLocal();
    fillList();

}

const importantTask = index => {
    
    tasks[index].important = !tasks[index].important;
    if(tasks[index].important) {
        todoTasks[index].classList.add('important');
    } else {
        todoTasks[index].classList.remove('important');
    }
    updateLocal();
    fillList();
}





addTask.addEventListener('click', () => {
    taskInput.value != '' ? 
        (tasks.push(new Task(taskInput.value)),
        updateLocal(),
        fillList(), 
        taskInput.value = '') : '' ;
});

const deleteTask = index => {
    todoTasks[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillList();
    }, 500)
}