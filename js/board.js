function renderTasks() {
    for (let i = 0; i < tasks.length; i++) {
        if (todo(i)) {
            renderTodoTasks(i);
        }



        renderTaskContacts(i);
        renderTaskSubtasks(i);

    }
    // setContactsRandomColor();
}

function todo(i) {
    return tasks[i].taskStatus[0] == 'todo'
}

function renderTodoTasks(i) {
    document.getElementById('todo').innerHTML += `
            <div class="task">
                <div class="taskCategory"style="background-color: ${tasks[i].category[1]}">${tasks[i].category[0]}</div>
                <div class="taskTitle">${tasks[i].title}</div>
                <div class="taskDescription">${tasks[i].description}</div>
                <div id="subtasks${i}" class="d-none"></div>
                <div id="contacts${i}" class="taskContacts"></div>
            </div>`
}







function renderTaskContacts(i) {
    if (tasks[i].assignedContacts.length > 3) {
        document.getElementById(`contacts${i}`).innerHTML = `
        <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[0].contactColor}">${tasks[i].assignedContacts[0].firstName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[0].lastName.charAt(0).toUpperCase()}</div>
        <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[1].contactColor}">${tasks[i].assignedContacts[1].firstName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[1].lastName.charAt(0).toUpperCase()}</div>
        <div id="moreContacts${i}" class="contactInitials" style="background-color: #2A3647"></div>
        `
        getMoreContactsAmount(i)
    } else {
        for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
            document.getElementById(`contacts${i}`).innerHTML += `
            <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[j].contactColor}">${tasks[i].assignedContacts[j].firstName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[j].lastName.charAt(0).toUpperCase()}</div>`
        }
    }
}

function getMoreContactsAmount(i) {
    document.getElementById(`moreContacts${i}`).innerHTML = `+${tasks[i].assignedContacts.length - 2}`
}

function renderTaskSubtasks(i) {
    if (tasks[i].addedSubtasks.length > 0) {
        document.getElementById(`subtasks${i}`).classList.remove('d-none')
        let countDoneSubtasks = 0;
        for (let j = 0; j < tasks[i].addedSubtasks.length; j++) {
            if (tasks[i].addedSubtasks[j].taskStatus[0] == 'done') {
                countDoneSubtasks++;
                document.getElementById(`subtasks${i}`).innerHTML = `${countDoneSubtasks}/${tasks[i].addedSubtasks.length}`
            } else {
                document.getElementById(`subtasks${i}`).innerHTML = `0/${tasks[i].addedSubtasks.length}`
            }
        }
    }
}

// function setContactsRandomColor(i) {
//     for (let i = 0; i < contacts.length; i++) {
//         var letters = '0123456789ABCDEF';
//         color = '#';
//         for (var j = 0; j < 6; j++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }

//     }
// }