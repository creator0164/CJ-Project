// Define all UI variable
const todoList = document.querySelector('.list-group');
const form = document.querySelector('#form');
const todoInput = document.querySelector('#todo');
const clearBtn = document.querySelector('#clearBtn');
const search = document.querySelector('#search');

// Load all event listners
allEventListners();


// Functions of all event listners
function allEventListners() {
    // Add todo event
    form.addEventListener('submit', addTodo);
    // Remove and complete todo event
    todoList.addEventListener('click', removeTodo);
    // Clear or remove all todos
    clearBtn.addEventListener('click', clearTodoList);
    // Search todo event
    search.addEventListener('keyup', searchTodo);
}

let allStorage = () => {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}
console.log(allStorage());

// Add todo item function
function addTodo(e) {
    

    if (todoInput.value !== '') {
        if (allStorage().includes(todoInput.value)) {
            alert('This input is already exist!');
            return;
        }
        // Create li element

        localStorage.setItem(todoInput.value, todoInput.value);

        const li = document.createElement('li');
        // Add class
        li.className = `list-group-item`;
        li.id = todoInput.value;
        // Add complete and remove icon
        li.innerHTML = `<i class="far fa-square done-icon"></i>
                        <i class="far fa-check-square done-icon"></i>
                        <i class="far fa-trash-alt"></i>`;
        // Create span element
        const span = document.createElement('span');
        // Add class
        span.className = 'todo-text';
        // Create text node and append to span
        span.appendChild(document.createTextNode(todoInput.value));
        // Append span to li
        li.appendChild(span);
        // Append li to ul (todoList)
        todoList.appendChild(li);

        // Clear input
        todoInput.value = '';
    } else {
        alert('Please add todo');
    }

    e.preventDefault();
}


// Remove and complete todo item function
function removeTodo(e) {
    // Remove todo
    if (e.target.classList.contains('fa-trash-alt')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.remove();
            console.log(e.target.parentElement.id);
            localStorage.removeItem(e.target.parentElement.id);
        }
    }

    // Complete todo
    if (e.target.classList.contains('todo-text')) {
        e.target.parentElement.classList.toggle('done');
    }
    if (e.target.classList.contains('done-icon')) {
        e.target.parentElement.classList.toggle('done');
    }
}


// Clear or remove all todos function
function clearTodoList() {
    todoList.innerHTML = '';
    localStorage.clear();
}


// Search todo function
function searchTodo(e) {
    const text = e.target.value.toLowerCase();
    const allItem = document.querySelectorAll('.list-group-item');
    for (let task of allItem) {
        const item = task.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    };
}

function local_fetch(){
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var value = localStorage[key];
        console.log(key);
        
        const li = document.createElement('li');
        li.id = key;
        li.className = `list-group-item`;
        li.innerHTML = `<i class="far fa-square done-icon"></i>
                        <i class="far fa-check-square done-icon"></i>
                        <i class="far fa-trash-alt"></i>`;
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.appendChild(document.createTextNode(value));
        li.appendChild(span);
        // Append li to ul (todoList)
        todoList.appendChild(li);
}
}

local_fetch();