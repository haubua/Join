let users = [];
let toDos = []
setURL('https://gruppe-298.developerakademie.net/smallest_backend_ever/smallest_backend_ever-master');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    toDos = JSON.parse(backend.getItem('todos')) || [];
}


function addUser() {
    users.push(username.value);
    backend.setItem('users', JSON.stringify(users));
}

function addTodo() {
    toDos.push(todo.value);
    backend.setItem('todos', JSON.stringify(toDos));
}