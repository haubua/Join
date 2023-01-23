let filteredTasks = [];
let cleanFilter = [];
let currentTask = [];
let splicePosition = [];

function boardRenderTasks() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFb').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        if (todo(i)) {
            renderTasksHtmlTemplate(i, 'todo');
        } else if (inProgress(i)) {
            renderTasksHtmlTemplate(i, 'inProgress');
        } else if (awaitingFb(i)) {
            renderTasksHtmlTemplate(i, 'awaitingFb');
        } else if (done(i)) {
            renderTasksHtmlTemplate(i, 'done');
        }
        setSubtaskStatus(i);
        renderTaskContacts(i);
        renderTaskSubtasks(i);
        renderTaskPrio(i);
    }
    renderEmptySpace();
}

function todo(i) {
    return tasks[i].taskStatus == 'todo';
}

function inProgress(i) {
    return tasks[i].taskStatus == 'inProgress';
}

function awaitingFb(i) {
    return tasks[i].taskStatus == 'awaitingFb';
}

function done(i) {
    return tasks[i].taskStatus == 'done';
}


function renderTasksHtmlTemplate(i, statusID) {
    document.getElementById(statusID).innerHTML += `
            <div class="task" draggable="true" id="task${i}" ondragstart="startDragging(${i})" ondragend="endDragging(${i})" onclick="taskDetails(${i})">
                <div class="taskCategory"style="background-color: ${tasks[i].category[1]}">${tasks[i].category[0]}</div>
                <div class="taskTitle">${tasks[i].title}</div>
                <div class="taskDescription">${tasks[i].description}</div>
                <div id="subtasks${i}" class="d-none"></div>
                <div class="tasksBottomRow">
                    <div id="contacts${i}" class="taskContacts"></div>
                    <div id="taskPrioIcon${i}" class="prioIconMargin"></div>
                </div>
            </div>`
}

function renderEmptySpace() {
    document.getElementById('todo').innerHTML += `<div id="emptySpaceTodo" class="task emptySpace d-none"></div>`
    document.getElementById('inProgress').innerHTML += `<div id="emptySpaceInProgress" class="task emptySpace d-none"></div>`
    document.getElementById('awaitingFb').innerHTML += `<div id="emptySpaceAwaitingFb" class="task emptySpace d-none"></div>`
    document.getElementById('done').innerHTML += `<div id="emptySpaceDone" class="task emptySpace d-none"></div>`
}


function renderTaskContacts(i) {
    if (tasks[i].assignedContacts.length > 3) {
        document.getElementById(`contacts${i}`).innerHTML = `
        <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[0].contactColor}">${tasks[i].assignedContacts[0].lastName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[0].firstName.charAt(0).toUpperCase()}</div>
        <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[1].contactColor}">${tasks[i].assignedContacts[1].lastName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[1].firstName.charAt(0).toUpperCase()}</div>
        <div id="moreContacts${i}" class="contactInitials" style="background-color: #2A3647"></div>
        `
        getMoreContactsAmount(i)
    } else {
        for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
            document.getElementById(`contacts${i}`).innerHTML += `
            <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[j].contactColor}">
                ${tasks[i].assignedContacts[j].lastName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[j].firstName.charAt(0).toUpperCase()}
            </div>`
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
            if (tasks[i].addedSubtasks[j].taskStatus == 'done') {
                countDoneSubtasks++;
            }
            document.getElementById(`subtasks${i}`).innerHTML = `
                <div class="flex center marginTopBtm4">
                    <div class="subtaskProgressbar">
                        <div id="progress${i}" class="subtaskProgress"></div>
                    </div>
                    <div class="progressFont">${countDoneSubtasks}/${tasks[i].addedSubtasks.length} Done</div>
                </div>`
            showProgress(countDoneSubtasks, i);
        }
    }
}


function renderTaskPrio(i) {
    if (tasks[i].prio == 'Urgent') {
        document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=/img/taskIconUrgent.svg class="taskPrioIcon">`
    }
    if (tasks[i].prio == 'Medium') {
        document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=/img/mediumIcon.svg class="taskPrioIcon">`
    }
    if (tasks[i].prio == 'Low') {
        document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=/img/lowIcon.svg class="taskPrioIcon">`
    }
}

function showProgress(countDoneSubtasks, i) {
    let progress = `${Math.round((countDoneSubtasks) * (100 / tasks[i].addedSubtasks.length))}`
    // document.getElementById('progress').innerHTML = `${progress}%`;
    document.getElementById(`progress${i}`).style = `width: ${progress}%`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['taskStatus'] = status;
    boardRenderTasks();
    saveBoard();
    hideEmptySpace();
}

function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById('task' + id).classList.add('rotate');
    showEmptySpace();
}


function showEmptySpace() {
    document.getElementById('emptySpaceTodo').classList.remove('d-none')
    document.getElementById('emptySpaceInProgress').classList.remove('d-none')
    document.getElementById('emptySpaceAwaitingFb').classList.remove('d-none')
    document.getElementById('emptySpaceDone').classList.remove('d-none')
}

function hideEmptySpace() {
    document.getElementById('emptySpaceTodo').classList.add('d-none')
    document.getElementById('emptySpaceInProgress').classList.add('d-none')
    document.getElementById('emptySpaceAwaitingFb').classList.add('d-none')
    document.getElementById('emptySpaceDone').classList.add('d-none')
}

function endDragging(id) {
    hideEmptySpace();
    document.getElementById('task' + id).classList.remove('rotate');
}

function setSubtaskStatus(i) {
    for (let j = 0; j < tasks.length; j++) {
        for (let k = 0; k < tasks[j].addedSubtasks.length; k++) {
            if (tasks[i].id == tasks[j].addedSubtasks[k].id) {
                tasks[j].addedSubtasks[k].taskStatus = tasks[i].taskStatus;
            }
        }
    }
}

function filterTasks() {
    let search = document.getElementById('searchTask').value;
    search = search.toLowerCase();
    let filteredTitles = tasks.filter(task => String(task.title.toLowerCase()).includes(search));
    let filteredDescriptions = tasks.filter(task => String(task.description.toLowerCase()).includes(search));
    filteredTasks = filteredTitles.concat(filteredDescriptions)
    cleanFilter = filteredTasks;
    if (filteredTitles.length > 0) {
        for (let i = 0; i < filteredTitles.length; i++) {
            if (filteredDescriptions.length > 0) {
                for (let j = filteredDescriptions.length - 1; j > -1; j--) {
                    if (filteredTitles[i].id == filteredDescriptions[j].id) {
                        splicePosition.push(filteredTitles.length + j)
                    }
                }
            } else {
                cleanFilter = filteredTasks;
            }
        }
        let reverse = splicePosition.reverse();
        for (let i = 0; i < splicePosition.length; i++) {
            cleanFilter.splice(reverse[i], 1);
        }
    } else if (filteredDescriptions.length > 0) {
        cleanFilter = filteredTasks;
    }
    if (search.length > 0) {
        renderFilteredTasks()
    } else {
        boardRenderTasks();
    }
    splicePosition = [];
}

function renderFilteredTasks() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFb').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < cleanFilter.length; i++) {
        if (filteredTodo(i)) {
            renderFilterTasksHtmlTemplate(i, 'todo');
        } else if (filteredInProgress(i)) {
            renderFilterTasksHtmlTemplate(i, 'inProgress');
        } else if (filteredAwaitingFb(i)) {
            renderFilterTasksHtmlTemplate(i, 'awaitingFb');
        } else if (filteredDone(i)) {
            renderFilterTasksHtmlTemplate(i, 'done');
        }
        setFilteredSubtaskStatus(i);
        renderFilteredTaskContacts(i);
        renderFilteredTaskSubtasks(i);
        renderFilteredTaskPrio(i);
    }
}

function filteredTodo(i) {
    return cleanFilter[i].taskStatus == 'todo';
}

function filteredInProgress(i) {
    return cleanFilter[i].taskStatus == 'inProgress';
}

function filteredAwaitingFb(i) {
    return cleanFilter[i].taskStatus == 'awaitingFb';
}

function filteredDone(i) {
    return cleanFilter[i].taskStatus == 'done';
}

function renderFilterTasksHtmlTemplate(i, statusID) {
    document.getElementById(statusID).innerHTML += `
            <div class="task" draggable="true" id="task${i}" ondragstart="startDragging(${i})" ondragend="endDragging(${i})" onclick="filteredTaskDetails(${i})">
                <div class="taskCategory"style="background-color: ${cleanFilter[i].category[1]}">${cleanFilter[i].category[0]}</div>
                <div class="taskTitle">${cleanFilter[i].title}</div>
                <div class="taskDescription">${cleanFilter[i].description}</div>
                <div id="subtasks${i}" class="d-none"></div>
                <div class="tasksBottomRow">
                    <div id="contacts${i}" class="taskContacts"></div>
                    <div id="taskPrioIcon${i}" class="prioIconMargin"></div>
                </div>
            </div>`
}

function setFilteredSubtaskStatus(i) {
    for (let j = 0; j < cleanFilter.length; j++) {
        for (let k = 0; k < cleanFilter[j].addedSubtasks.length; k++) {
            if (cleanFilter[i].id == cleanFilter[j].addedSubtasks[k].id) {
                cleanFilter[j].addedSubtasks[k].taskStatus = cleanFilter[i].taskStatus;
            }
        }
    }
}

function renderFilteredTaskContacts(i) {
    if (cleanFilter[i].assignedContacts.length > 3) {
        document.getElementById(`contacts${i}`).innerHTML = `
        <div class="contactInitials" style="background-color: ${cleanFilter[i].assignedContacts[0].contactColor}">${cleanFilter[i].assignedContacts[0].lastName.charAt(0).toUpperCase()}${cleanFilter[i].assignedContacts[0].firstName.charAt(0).toUpperCase()}</div>
        <div class="contactInitials" style="background-color: ${cleanFilter[i].assignedContacts[1].contactColor}">${cleanFilter[i].assignedContacts[1].lastName.charAt(0).toUpperCase()}${cleanFilter[i].assignedContacts[1].firstName.charAt(0).toUpperCase()}</div>
        <div id="moreContacts${i}" class="contactInitials" style="background-color: #2A3647"></div>
        `
        getMoreContactsAmountFiltered(i)
    } else {
        for (let j = 0; j < cleanFilter[i].assignedContacts.length; j++) {
            document.getElementById(`contacts${i}`).innerHTML += `
            <div class="contactInitials" style="background-color: ${cleanFilter[i].assignedContacts[j].contactColor}">
                ${cleanFilter[i].assignedContacts[j].lastName.charAt(0).toUpperCase()}${cleanFilter[i].assignedContacts[j].firstName.charAt(0).toUpperCase()}
            </div>`
        }
    }
}

function getMoreContactsAmountFiltered(i) {
    document.getElementById(`moreContacts${i}`).innerHTML = `+${cleanFilter[i].assignedContacts.length - 2}`
}

function renderFilteredTaskSubtasks(i) {
    if (cleanFilter[i].addedSubtasks.length > 0) {
        document.getElementById(`subtasks${i}`).classList.remove('d-none')
        let countDoneSubtasks = 0;
        for (let j = 0; j < cleanFilter[i].addedSubtasks.length; j++) {
            if (cleanFilter[i].addedSubtasks[j].taskStatus == 'done') {
                countDoneSubtasks++;
            }
            document.getElementById(`subtasks${i}`).innerHTML = `
                <div class="flex center marginTopBtm4">
                    <div class="subtaskProgressbar">
                        <div id="progress${i}" class="subtaskProgress"></div>
                    </div>
                    <div class="progressFont">${countDoneSubtasks}/${cleanFilter[i].addedSubtasks.length} Done</div>
                </div>`
            showFilteredTasksProgress(countDoneSubtasks, i);
        }
    }
}

function showFilteredTasksProgress(countDoneSubtasks, i) {
    let progress = `${Math.round((countDoneSubtasks) * (100 / cleanFilter[i].addedSubtasks.length))}`
    // document.getElementById('progress').innerHTML = `${progress}%`;
    document.getElementById(`progress${i}`).style = `width: ${progress}%`;
}


function renderFilteredTaskPrio(i) {
    if (cleanFilter[i].prio == 'Urgent') {
        document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=/img/taskIconUrgent.svg class="taskPrioIcon">`
    }
    if (cleanFilter[i].prio == 'Medium') {
        document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=/img/mediumIcon.svg class="taskPrioIcon">`
    }
    if (cleanFilter[i].prio == 'Low') {
        document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=/img/lowIcon.svg class="taskPrioIcon">`
    }
}


// function renderTasksHtmlTemplate(i, statusID) {
//     document.getElementById(statusID).innerHTML += `
//             <div class="task" draggable="true" id="task${i}" ondragstart="startDragging(${i})" ondragend="endDragging(${i})" onclick="taskDetails(${i})">
//                 <div class="taskCategory"style="background-color: ${tasks[i].category[1]}">${tasks[i].category[0]}</div>
//                 <div class="taskTitle">${tasks[i].title}</div>
//                 <div class="taskDescription">${tasks[i].description}</div>
//                 <div id="subtasks${i}" class="d-none"></div>
//                 <div class="tasksBottomRow">
//                     <div id="contacts${i}" class="taskContacts"></div>
//                     <div id="taskPrioIcon${i}" class="prioIconMargin"></div>
//                 </div>
//             </div>`
// }

function taskDetails(i) {
    document.getElementById('cover2').classList.remove('d-none')
    if (w < 800) {
        document.getElementById('board').classList.add('d-none')
    }
    document.getElementById('detailsHeadline').innerHTML = `${tasks[i].category[0]}`
    document.getElementById('detailsHeadline').style.backgroundColor = `${tasks[i].category[1]}`
    document.getElementById('detailsTitle').innerHTML = `${tasks[i].title}`
    document.getElementById('detailsDescription').innerHTML = `${tasks[i].description}`
    document.getElementById('detailsDueDate').innerHTML = `
    <div class="detailsSubHeadline">Due date: </div><div class="detailsDueDate">${tasks[i].dueDate}</div>
`
    document.getElementById('detailsPrio').innerHTML = `
        <div class="detailsSubHeadline">Priority: </div><div id="prioStatus">${tasks[i].prio}</div>
        `
    document.getElementById('editSubtasks').innerHTML = `
    <div onclick="editShowTasks(${i})" id="editTaskDropdown" class="dropdown selectWidth">
        <div class="dorpdownRow  categoryPadding">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
    </div>
    `
    for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
        document.getElementById('detailsAssignetTo').innerHTML += `
        <div class="detailsContainer">
            <div id="taskInitial${j}" class="circleBg"></div>
            <div class="detailsContactName">${tasks[i].assignedContacts[j].lastName} ${tasks[i].assignedContacts[j].firstName}</div>
        </div>`
        taskSetInitial(i, j)
    }
    document.getElementById('detailsEdit').innerHTML = `
    <div class="detailsEdit" onclick="openEditTask(${i})"><img class="pencil" src="/img/pencilWhite.svg"></div>
`
    setPrioColor(i);
}


function taskSetInitial(i, j) {
    if (document.getElementById('taskInitial' + j)) {
        let charLastName = tasks[i].assignedContacts[j].lastName.charAt(0)
        let charFirstName = tasks[i].assignedContacts[j].firstName.charAt(0)
        document.getElementById('taskInitial' + j).innerHTML = `
            ${charLastName}${charFirstName}
        `
        // fillInitialColor(j);
        document.getElementById('taskInitial' + j).style.backgroundColor = tasks[i].assignedContacts[j].contactColor;
    }
}


function setPrioColor(i) {
    if (tasks[i].prio == 'Urgent') {
        document.getElementById('prioStatus').style.backgroundColor = '#FF551F'
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/urgentIcon.svg">`
    }
    if (tasks[i].prio == 'Medium') {
        document.getElementById('prioStatus').style.backgroundColor = '#FFA800'
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/mediumIcon.svg">`
    }
    if (tasks[i].prio == 'Low') {
        document.getElementById('prioStatus').style.backgroundColor = '#7AE229'
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/lowIcon.svg">`
    }
}

function filteredTaskDetails(i) {
    document.getElementById('cover2').classList.remove('d-none')
    document.getElementById('detailsHeadline').innerHTML = `${cleanFilter[i].category[0]}`
    document.getElementById('detailsHeadline').style.backgroundColor = `${cleanFilter[i].category[1]}`
    document.getElementById('detailsTitle').innerHTML = `${cleanFilter[i].title}`
    document.getElementById('detailsDescription').innerHTML = `${cleanFilter[i].description}`
    document.getElementById('detailsDueDate').innerHTML = `
    <div class="detailsSubHeadline">Due date: </div><div class="detailsDueDate">${cleanFilter[i].dueDate}</div>
`
    document.getElementById('detailsPrio').innerHTML = `
        <div class="detailsSubHeadline">Priority: </div><div id="prioStatus">${cleanFilter[i].prio}</div>
        `
    document.getElementById('editSubtasks').innerHTML = `
    <div onclick="editShowTasks(${i})" id="editTaskDropdown" class="dropdown selectWidth">
        <div class="dorpdownRow  categoryPadding">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
    </div>
    `
    for (let j = 0; j < cleanFilter[i].assignedContacts.length; j++) {
        document.getElementById('detailsAssignetTo').innerHTML += `
        <div class="detailsContainer">
            <div id="taskInitial${j}" class="circleBg"></div>
            <div class="detailsContactName">${cleanFilter[i].assignedContacts[j].lastName} ${cleanFilter[i].assignedContacts[j].firstName}</div>
        </div>`
        filteredTaskSetInitial(i, j)
    }
    document.getElementById('detailsEdit').innerHTML = `
    <div class="detailsEdit" onclick="openEditTask(${i})"><img class="pencil" src="/img/pencilWhite.svg"></div>
`
    setPrioColorFiltered(i);
}

function filteredTaskSetInitial(i, j) {
    if (document.getElementById('taskInitial' + j)) {
        let charLastName = cleanFilter[i].assignedContacts[j].lastName.charAt(0)
        let charFirstName = cleanFilter[i].assignedContacts[j].firstName.charAt(0)
        document.getElementById('taskInitial' + j).innerHTML = `
            ${charLastName}${charFirstName}
        `
        // fillInitialColor(j);
        document.getElementById('taskInitial' + j).style.backgroundColor = cleanFilter[i].assignedContacts[j].contactColor;
    }

}


function setPrioColorFiltered(i) {
    if (cleanFilter[i].prio == 'Urgent') {
        document.getElementById('prioStatus').style.backgroundColor = '#FF551F'
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/urgentIcon.svg">`
    }
    if (cleanFilter[i].prio == 'Medium') {
        document.getElementById('prioStatus').style.backgroundColor = '#FFA800'
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/mediumIcon.svg">`
    }
    if (cleanFilter[i].prio == 'Low') {
        document.getElementById('prioStatus').style.backgroundColor = '#7AE229'
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/lowIcon.svg">`
    }
}

// function taskFillInitialColor(j) {
//     document.getElementById('circleBg' + j).style.backgroundColor = contacts[j].contactColor;
// }



function closeDetails() {
    document.getElementById('cover2').classList.add('d-none')
    document.getElementById('board').classList.remove('d-none')
    document.getElementById('detailsAssignetTo').innerHTML = '';
}

function openEditTask(i) {
    document.getElementById('detailsPopup').classList.add('d-none')
    document.getElementById('editTaskPopup').classList.remove('d-none');
    document.getElementById('editTilte').value = `${tasks[i].title}`
    document.getElementById('editDescription').value = `${tasks[i].description}`
    selectedCatHtmlTemplate(i)
    popupNewTaskCategory = tasks[i].category;
    // popupSubtasks = tasks[i].addedSubtasks;
    currentTask = [i]
    for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
        rednerCheckoxSelectedContact(j, i)
    }
    for (let j = 0; j < tasks[i].addedSubtasks.length; j++) {
        rednerCheckoxSelectedSubtasks(j, i)
    }
    document.getElementById('editDueDate').value = `${tasks[i].dueDate}`
    if (tasks[i].prio == 'Urgent') {
        editPrioUrgent()
    }
    if (tasks[i].prio == 'Medium') {
        editPrioMedium()
    }
    if (tasks[i].prio == 'Low') {
        editPrioLow()
    }
}

function closeEditTask() {
    for (let i = 0; i < contacts.length; i++) {
        uncheckEditContactsCheckbox(i)
    }
    for (let i = 0; i < tasks.length; i++) {
        uncheckEditSubtaskCheckbox(i)
    }
    document.getElementById('detailsPopup').classList.remove('d-none')
    document.getElementById('editTaskPopup').classList.add('d-none')
    popupAssignedContacts = [];
    popupSubtasks = [];
    editCloseContacts();
    editCloseTasks();
}

function selectedCatHtmlTemplate(i) {
    document.getElementById('editCategory').innerHTML = `
        <div onclick="editShowCategorys(${i})" class="category categoryPadding">${tasks[i].category[0]}<div class="catColor" style="background-color: ${tasks[i].category[1]}"></div></div>
        `
}

function editCloseContactsHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
     `
}

// function editShowCategorys(i) {
//     let dropdown = document.getElementById('popupCategoryDropdown');
//     dropdown.removeAttribute("onclick");
//     selectedCatHtmlTemplate(i)
//     renderSavedCategorys(); //access addTask
//     closeContacts();
// }



function closeCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    if (newTaskCategory.length == 0) {
        closeCategorysEmptyHtmlTemplate(dropdown);
    } else {
        closeCategoryHtmlTemplate(dropdown);
    }
}

// function editCloseTasks() {
//     let dropdown = document.getElementById('editCategory');
//     closeTasksHtmlTemplate(dropdown);
// }

// function showPopupCategorys(i) {
//     let dropdown = document.getElementById('popupCategoryDropdown');
//     dropdown.removeAttribute("onclick");
//     selectedCatHtmlTemplate(i)
//     renderPopupSavedCategorys();
//     closePopupContacts();
// }
function editShowCategorys() {
    editLoadSavedCategorys();
    let dropdown = document.getElementById('editCategory');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="editCloseCategorys()" class="dorpdownRow categoryPadding borderBottom">Select task category <img src="/img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div onclick="editCategory()" class="categoryPadding category spacebetween">New category <img class="plus" src="/img/boardPlusBtn.svg"></div>
            <div id="popupSavedCategorys"></div>
        </div>
        `
    editRenderPopupSavedCategorys();
    editCloseContacts();

}

async function editLoadSavedCategorys() {
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem('categorys')) || [];

}

function editRenderPopupSavedCategorys() {
    document.getElementById('popupSavedCategorys').innerHTML = '';
    for (let i = 0; i < categorys.length; i++) {
        document.getElementById('popupSavedCategorys').innerHTML += `
        <div onclick="editAddPopupCategory(${i})" class="categoryPadding category">${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div></div>
    `
    }
}

function editCloseCategorys() {
    let dropdown = document.getElementById('editCategory');
    if (popupNewTaskCategory.length == 0) {
        dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `} else {
        dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="category categoryPadding">${popupNewTaskCategory[0]}<div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div></div>
    `
    }

}

function editCategory() {
    document.getElementById('editCategory').innerHTML = `
    <div class="spacebetween newCat">
        <input id="editCat" class="catInput">
        <div class="newCatBtn">
            <img class="clearBtn" src="/img/closeIcon.svg">
            <div class="greyLine"></div>
            <img onclick="saveCatEdit()"class="checkBtn" src="/img/checkMark.ico">
        </div>
    </div>`
    document.getElementById('editCatColor').classList.remove('d-none');
    document.getElementById('editCatColor').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        getRandomCatColor();
        document.getElementById('editCatColor').innerHTML += `
        <div onclick="popupAddNewCatColor(${i})" class="catColor" id="popupAddNewCatColor${i}" style="background-color: ${color}">
            <div class="d-none" id="popupCatColor${i}">${color}</div>
        </div>`
    }
}

function saveCatEdit() {
    if (document.getElementById('editCat').value) {
        categorys.push(document.getElementById('editCat').value);
    } else {
        newCategory++;
        categorys.push(`new Category ${newCategory}`);
    }
    if (popupSelectedColor.length > 0) {
        categoryColor.push(popupSelectedColor[0]);
    } else {
        categoryColor.push(document.getElementById('popupCatColor0').innerHTML)
    }
    document.getElementById('editCatColor').classList.add('d-none');
    editAddPopupCategory(categorys.length - 1);
}

function editAddPopupCategory(i) {
    if (popupNewTaskCategory.indexOf(categorys[i]) >= 0) {
        popupNewTaskCategory.splice(0, 2)
        showEditCat();
    } else {
        popupNewTaskCategory.splice(0, 2)
        popupNewTaskCategory.push(categorys[i], categoryColor[i])
        showEditCat();
    }
}

function showEditCat() {
    let dropdown = document.getElementById('editCategory');
    if (popupNewTaskCategory.length > 0) {
        dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="category categoryPadding">${popupNewTaskCategory[0]}<div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div></div>
    `
    } else {
        dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `
    }
}


function editPrioUrgent() {
    document.getElementById('editPrioUrgent').classList.add('prioUrgent');
    document.getElementById('editPrioUrgentIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioMedium();
    document.getElementById('editPrioUrgent').onclick = clearPrioUrgent;
    popupPrioStatus.push('Urgent')
}


function editPrioMedium() {
    document.getElementById('editPrioMedium').classList.add('prioMedium');
    document.getElementById('editPrioMediumIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioUrgent();
    document.getElementById('editPrioMedium').onclick = clearPrioMedium;
    popupPrioStatus.push('Medium')
}


function editPrioLow() {
    document.getElementById('editPrioLow').classList.add('prioLow');
    document.getElementById('editPrioLowIcon').classList.add('prioIconFilter');
    clearPrioUrgent();
    clearPrioMedium();
    document.getElementById('editPrioLow').onclick = clearPrioLow;
    popupPrioStatus.push('Low')
}


function clearPrioUrgent() {
    document.getElementById('editPrioUrgent').classList.remove('prioUrgent');
    document.getElementById('editPrioUrgentIcon').classList.remove('prioIconFilter');
    document.getElementById('editPrioUrgent').onclick = editPrioUrgent;
    popupPrioStatus.splice(0, 1)
}


function clearPrioMedium() {
    document.getElementById('editPrioMedium').classList.remove('prioMedium');
    document.getElementById('editPrioMediumIcon').classList.remove('prioIconFilter');
    document.getElementById('editPrioMedium').onclick = editPrioMedium;
    popupPrioStatus.splice(0, 1)
}


function clearPrioLow() {
    document.getElementById('editPrioLow').classList.remove('prioLow');
    document.getElementById('editPrioLowIcon').classList.remove('prioIconFilter');
    document.getElementById('editPrioLow').onclick = editPrioLow;
    popupPrioStatus.splice(0, 1)
}


// function editShowSavedContacts() {
//     let dropdown = document.getElementById('editContacts');
//     dropdown.removeAttribute("onclick");
//     dropdown.innerHTML = `
//         <div onclick="editCloseContacts()" class="dorpdownRow categoryPadding borderBottom">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
//         <div class="popupDropdownContainer">
//             <div class="categoryPadding category">You</div>
//             <div id="editContactsContainer"></div>
//             <div onclick="popupAddNewContact()" class="categoryPadding category spacebetween">Add new contact <img class="newContactIcon" src="/img/newContactIcon.png"></div>
//         </div>
//         `
//     pushSavedContacts();
//     renderEditContacts();
//     editCloseCategorys();
// }


// function pushSavedContacts() {
//     for (let i = 0; i < tasks[i].length; i++) {
//         const element = array[i];

//     }

//     editAddContact(i)
// }

function editShowContacts() {
    let dropdown = document.getElementById('editContacts');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="editCloseContacts()" class="dorpdownRow categoryPadding borderBottom">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div class="categoryPadding category spacebetween" onclick="popupAddCurrentUser()">You<div class="contactsCheckbox" id="popupCurrentUserCheckbox"></div></div>
            <div id="editContactsContainer"></div>
            <div onclick="popupAddNewContact()" class="categoryPadding category spacebetween">Add new contact <img class="newContactIcon" src="/img/newContactIcon.png"></div>
        </div>
        `
    renderEditContacts();
    editCloseCategorys();
}

function renderEditContacts() {
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                document.getElementById('editContactsContainer').innerHTML += `
                    <div onclick="editAddContact(${j})" class="categoryPadding category spacebetween">
                        ${contacts[j].lastName} ${contacts[j].firstName}
                        <div class="contactsCheckbox" id="editContactsCheckbox${j}"></div>
                    </div>
                `
                checkEditContactsCheckbox(j);
            }
        }
    }
    checkPopupCurrentUserCheckbox();
}

function editCloseContacts() {
    let dropdown = document.getElementById('editContacts');
    dropdown.innerHTML = `
        <div onclick="editShowContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
     `
}

function rednerCheckoxSelectedContact(j, i) {
    for (let k = 0; k < contacts.length; k++) {
        if (JSON.stringify(contacts[k]) == JSON.stringify(tasks[i].assignedContacts[j])) {
            checkEditContactsCheckbox(k);
        }
    }
    popupAssignedContacts.push(tasks[i].assignedContacts[j]);
}


function editAddContact(i) {
    let indexOf = -1;
    for (let j = 0; j < popupAssignedContacts.length; j++) {
        if (JSON.stringify(popupAssignedContacts[j]) == JSON.stringify(contacts[i])) {
            indexOf = j;
        }
    }
    if (indexOf >= 0) {
        popupAssignedContacts.splice(indexOf, 1)
        uncheckEditContactsCheckbox(i);
    } else {
        popupAssignedContacts.push(contacts[i]);
        checkEditContactsCheckbox(i);
    }
}

function checkEditContactsCheckbox(i) {
    let indexOf = JSON.stringify(popupAssignedContacts).indexOf(JSON.stringify(contacts[i]))
    if (indexOf >= 0 && document.getElementById(`editContactsCheckbox${i}`)) {
        document.getElementById(`editContactsCheckbox${i}`).innerHTML = `
        <div id="editCheckboxChecked${i}" class="checkboxChecked"></div>
    `
    }
}


function uncheckEditContactsCheckbox(i) {
    if (document.getElementById(`editCheckboxChecked${i}`)) {
        document.getElementById(`editCheckboxChecked${i}`).classList.remove('checkboxChecked')
    }

}

// function editAddCurrentUser() {
//     let indexOf = -1;
//     let currentUserName = localStorage.getItem('currentUserName');
//     let currentUserEmail = localStorage.getItem('currentUserEmail');
//     let currentUserColor = localStorage.getItem('currentUserColor');
//     let splitName = currentUserName.split(' ');
//     let curretUserFirstName = splitName.shift();
//     let curretUserLastName = splitName.join(' ');
//     curretUserFirstName = curretUserFirstName.charAt(0).toUpperCase() + curretUserFirstName.slice(1);
//     curretUserLastName = curretUserLastName.charAt(0).toUpperCase() + curretUserLastName.slice(1);
//     currentUser = { firstName: curretUserFirstName, lastName: curretUserLastName, email: currentUserEmail, 'phone': '', 'contactColor': currentUserColor }
//     for (let i = 0; i < popupAssignedContacts.length; i++) {
//         if (JSON.stringify(popupAssignedContacts[i]) == JSON.stringify(currentUser)) {
//             indexOf = i;
//         }
//     }
//     if (indexOf >= 0) {
//         popupAssignedContacts.splice(indexOf, 1)
//         uncheckPopupCurrentUserCheckbox();
//     } else {
//         popupAssignedContacts.push(currentUser);
//         checkPopupCurrentUserCheckbox();
//     }
// }

// function checkEditCurrentUserCheckbox() {
//     let indexOf = popupAssignedContacts.indexOf(currentUser)
//     if (indexOf >= 0) {
//         document.getElementById('popupCurrentUserCheckbox').innerHTML = `
//         <div id="checkboxChecked" class="checkboxChecked"></div>
//     `}
// }


// function uncheckEditCurrentUserCheckbox() {
//     document.getElementById(`checkboxChecked`).classList.remove('checkboxChecked')
// }





function editShowTasks(i) {
    let dropdown = document.getElementById('editTaskDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="editCloseTasks()" class="dorpdownRow categoryPadding borderBottom">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div id="editTasks"></div>
        </div>
        `
    editRenderTasks(i);
    // closeCategorys();
}

function editRenderTasks(j) {
    if (tasks.length == 0) {
        document.getElementById('editTasks').innerHTML = `
            <div class="categoryPadding category">No task available</div>
        `
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] != tasks[j]) {
                document.getElementById('editTasks').innerHTML += `
            <div onclick="editSubtask(${i})" class="categoryPadding category spacebetween">${tasks[i].title} <div class="contactsCheckbox" id="editSubtaskCheckbox${i}"></div></div>
            
        `
                checkEditSubtaskCheckbox(i)
            }
        }
    }

}


function editCloseTasks() {
    let dropdown = document.getElementById('editTaskDropdown');
    dropdown.innerHTML = `
        <div onclick="editShowTasks()" class="dorpdownRow categoryPadding">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
     `
}


function rednerCheckoxSelectedSubtasks(j, i) {
    for (let k = 0; k < tasks.length; k++) {
        if (JSON.stringify(tasks[k]) == JSON.stringify(tasks[i].addedSubtasks[j])) {
            popupSubtasks.push(tasks[i].addedSubtasks[j]);
            // checkEditSubtaskCheckbox(k);
        }
    }

}




function editSubtask(i) {
    let indexOf = -1;

    for (let j = 0; j < popupSubtasks.length; j++) {
        if (JSON.stringify(popupSubtasks[j]) == JSON.stringify(tasks[i])) {
            indexOf = j;
        }
    }
    if (indexOf >= 0) {
        popupSubtasks.splice(indexOf, 1)
        uncheckEditSubtaskCheckbox(i);
    } else {
        popupSubtasks.push(tasks[i]);
        checkEditSubtaskCheckbox(i);
    }
}

function checkEditSubtaskCheckbox(i) {
    let indexOf = -1;
    for (let j = 0; j < popupSubtasks.length; j++) {
        if (popupSubtasks[j].id == tasks[i].id) {
            indexOf = i;
        }
    }
    // = JSON.stringify(popupSubtasks).indexOf(JSON.stringify(tasks[i]))
    if (indexOf >= 0 && document.getElementById(`editSubtaskCheckbox${i}`)) {
        document.getElementById(`editSubtaskCheckbox${i}`).innerHTML = `
        <div id="editCheckboxSubtaskChecked${i}" class="checkboxChecked"></div>
    `
    }
}

function uncheckEditSubtaskCheckbox(i) {
    if (document.getElementById(`editCheckboxSubtaskChecked${i}`)) {
        document.getElementById(`editCheckboxSubtaskChecked${i}`).classList.remove('checkboxChecked')
    }
}


function saveEditTask() {
    tasks[currentTask].title = document.getElementById('editTilte').value
    tasks[currentTask].description = document.getElementById('editDescription').value
    tasks[currentTask].category = popupNewTaskCategory
    tasks[currentTask].assignedContacts = popupAssignedContacts
    tasks[currentTask].dueDate = document.getElementById('editDueDate').value
    tasks[currentTask].prio = popupPrioStatus;
    tasks[currentTask].addedSubtasks = popupSubtasks
    closeEditTask();
    saveBoard();
    boardRenderTasks();
    closeDetails();
}

//* Mobile version */




function tasksNotDraggableStatus(w) {
    if (w < 1000) {
        for (let i = 0; i < tasks.length; i++) {
            document.getElementById(`task${i}`).draggable = false;
        }
    }
    else {
        for (let i = 0; i < tasks.length; i++) {
            document.getElementById(`task${i}`).draggable = true;
        }
    }
}

function changeDetailsSymbol(w) {
    if (w < 800) {
        document.getElementById('closeDetails').src = '/img/backBtn.svg'
        document.getElementById('closeDetails').style.filter = 'invert(50%)';
    } else {
        document.getElementById('closeDetails').src = '/img/closeIcon.svg';
        document.getElementById('closeDetails').style.filter = 'invert(0%)';
    }
    
}

