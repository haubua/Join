let filteredTasks = [];
let cleanFilter = [];
let currentTask = [];
let splicePosition = [];


function boardRenderTasks() {
    emptyBoard();
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
    renderEmptySpaceHtmlTemplate();
}


function emptyBoard() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFb').innerHTML = '';
    document.getElementById('done').innerHTML = '';
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


function renderTaskContacts(i) {
    if (tasks[i].assignedContacts.length > 3) {
        render2ContactsHtmlTemplate(i);
        getMoreContactsAmount(i);
    } else {
        for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
            render3ContactsHtmlTemplate(i, j);
        }
    }
}


function getMoreContactsAmount(i) {
    document.getElementById(`moreContacts${i}`).innerHTML = `+${tasks[i].assignedContacts.length - 2}`;
}


function renderTaskSubtasks(i) {
    if (tasks[i].addedSubtasks.length > 0) {
        document.getElementById(`subtasks${i}`).classList.remove('d-none');
        let countDoneSubtasks = 0;
        for (let j = 0; j < tasks[i].addedSubtasks.length; j++) {
            if (tasks[i].addedSubtasks[j].taskStatus == 'done') {
                countDoneSubtasks++;
            }
            renderSubtasksHtmlTemplate(i, countDoneSubtasks);
            showProgress(countDoneSubtasks, i);
        }
    }
}


function renderTaskPrio(i) {
    if (tasks[i].prio == 'Urgent') {
        renderUrgentPrioHtmlTemplate(i);
    }
    if (tasks[i].prio == 'Medium') {
        renderMediumPrioHtmlTemplate(i);
    }
    if (tasks[i].prio == 'Low') {
        renderLowPrioHtmlTemplate(i);
    }
}


function showProgress(countDoneSubtasks, i) {
    let progress = `${Math.round((countDoneSubtasks) * (100 / tasks[i].addedSubtasks.length))}`;
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
    document.getElementById('emptySpaceTodo').classList.remove('d-none');
    document.getElementById('emptySpaceInProgress').classList.remove('d-none');
    document.getElementById('emptySpaceAwaitingFb').classList.remove('d-none');
    document.getElementById('emptySpaceDone').classList.remove('d-none');
}


function hideEmptySpace() {
    document.getElementById('emptySpaceTodo').classList.add('d-none');
    document.getElementById('emptySpaceInProgress').classList.add('d-none');
    document.getElementById('emptySpaceAwaitingFb').classList.add('d-none');
    document.getElementById('emptySpaceDone').classList.add('d-none');
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
    filteredTasks = filteredTitles.concat(filteredDescriptions);
    cleanFilter = filteredTasks;
    clearFilteredTasks(filteredTitles, filteredDescriptions, filteredTasks, cleanFilter);
    checkSearchValue(search);
    splicePosition = [];
}


function checkSearchValue(search) {
    if (search.length > 0) {
        renderFilteredTasks();
    } else {
        boardRenderTasks();
    }
}


function clearFilteredTasks(filteredTitles, filteredDescriptions, filteredTasks, cleanFilter) {
    if (filteredTitles.length > 0) {
        for (let i = 0; i < filteredTitles.length; i++) {
            if (filteredDescriptions.length > 0) {
                for (let j = filteredDescriptions.length - 1; j > -1; j--) {
                    if (filteredTitles[i].id == filteredDescriptions[j].id) {
                        splicePosition.push(filteredTitles.length + j);
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
}


function renderFilteredTasks() {
    clearBoardInnerHtml();
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


function clearBoardInnerHtml() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFb').innerHTML = '';
    document.getElementById('done').innerHTML = '';
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
        renderFilteredTasks2ContactsHtmlTemplate(i);
        getMoreContactsAmountFiltered(i);
    } else {
        for (let j = 0; j < cleanFilter[i].assignedContacts.length; j++) {
            renderFilteredTasks3ContactsHtmlTemplate(i, j);
        }
    }
}


function getMoreContactsAmountFiltered(i) {
    document.getElementById(`moreContacts${i}`).innerHTML = `+${cleanFilter[i].assignedContacts.length - 2}`;
}


function renderFilteredTaskSubtasks(i) {
    if (cleanFilter[i].addedSubtasks.length > 0) {
        document.getElementById(`subtasks${i}`).classList.remove('d-none')
        let countDoneSubtasks = 0;
        for (let j = 0; j < cleanFilter[i].addedSubtasks.length; j++) {
            if (cleanFilter[i].addedSubtasks[j].taskStatus == 'done') {
                countDoneSubtasks++;
            }
            renderFilteredTaskSubtasksHtmlTemplates(i);
            showFilteredTasksProgress(countDoneSubtasks, i);
        }
    }
}


function showFilteredTasksProgress(countDoneSubtasks, i) {
    let progress = `${Math.round((countDoneSubtasks) * (100 / cleanFilter[i].addedSubtasks.length))}`
    document.getElementById(`progress${i}`).style = `width: ${progress}%`;
}


function renderFilteredTaskPrio(i) {
    if (cleanFilter[i].prio == 'Urgent') {
        renderFilteredTaskUrgentPrioHtmlTemplate(i);
    }
    if (cleanFilter[i].prio == 'Medium') {
        renderFilteredTaskMediumPrioHtmlTemplate(i);
    }
    if (cleanFilter[i].prio == 'Low') {
        renderFilteredTaskLowPrioHtmlTemplate(i);
    }
}


function taskDetails(i) {
    document.getElementById('cover2').classList.remove('d-none');
    if (w < 800) {
        document.getElementById('board').classList.add('d-none');
    }
    renderTasksDetailsHtmlTemplate(i);
    for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
        renderDetailsAssignetContactsHtmltemplate(i, j);
        taskSetInitial(i, j);
    }
    renderDetailsEditBtnHtmltemplate(i);
    renderDetailsSubtasks(i);
    setPrioColor(i);
}



function renderDetailsSubtasks(i) {
    if (tasks[i].addedSubtasks.length > 0) {
        document.getElementById(`detailsSubtasks`).classList.remove('d-none');
        let countDoneSubtasks = 0;
        for (let j = 0; j < tasks[i].addedSubtasks.length; j++) {
            if (tasks[i].addedSubtasks[j].taskStatus == 'done') {
                countDoneSubtasks++;
            }

            renderDetailsSubtasksHtmlTemplate(i, countDoneSubtasks);
            showDetailsSubtaksProgress(countDoneSubtasks, i);
        }
    }
}


function showDetailsSubtaksProgress(countDoneSubtasks, i) {
    let progress = `${Math.round((countDoneSubtasks) * (100 / tasks[i].addedSubtasks.length))}`;
    document.getElementById(`detailsSubtasksProgress`).style = `width: ${progress}%`;
}


function taskSetInitial(i, j) {
    if (document.getElementById('taskInitial' + j)) {
        let charLastName = tasks[i].assignedContacts[j].lastName.charAt(0);
        let charFirstName = tasks[i].assignedContacts[j].firstName.charAt(0);
        document.getElementById('taskInitial' + j).innerHTML = `
            ${charLastName}${charFirstName}
        `
        document.getElementById('taskInitial' + j).style.backgroundColor = tasks[i].assignedContacts[j].contactColor;
    }
}


function setPrioColor(i) {
    if (tasks[i].prio == 'Urgent') {
        document.getElementById('prioStatus').style.backgroundColor = '#FF551F';
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/urgentIcon.svg">`;
    }
    if (tasks[i].prio == 'Medium') {
        document.getElementById('prioStatus').style.backgroundColor = '#FFA800';
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/mediumIcon.svg">`;
    }
    if (tasks[i].prio == 'Low') {
        document.getElementById('prioStatus').style.backgroundColor = '#7AE229';
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/lowIcon.svg">`;
    }
}


function filteredTaskDetails(i) {
    renderFilteredTaskDetailHtmlTemplate(i);
    for (let j = 0; j < cleanFilter[i].assignedContacts.length; j++) {
        renderFilteredTaskDetailsAssignetContactsHtmlTemp(i, j);
        filteredTaskSetInitial(i, j);
    }
    renderFilteredTasksEditBtnHtmltemplate(i);
    setPrioColorFiltered(i);
}


function filteredTaskSetInitial(i, j) {
    if (document.getElementById('taskInitial' + j)) {
        let charLastName = cleanFilter[i].assignedContacts[j].lastName.charAt(0);
        let charFirstName = cleanFilter[i].assignedContacts[j].firstName.charAt(0);
        document.getElementById('taskInitial' + j).innerHTML = `
            ${charLastName}${charFirstName}
        `
        document.getElementById('taskInitial' + j).style.backgroundColor = cleanFilter[i].assignedContacts[j].contactColor;
    }
}


function setPrioColorFiltered(i) {
    if (cleanFilter[i].prio == 'Urgent') {
        document.getElementById('prioStatus').style.backgroundColor = '#FF551F';
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/urgentIcon.svg">`;
    }
    if (cleanFilter[i].prio == 'Medium') {
        document.getElementById('prioStatus').style.backgroundColor = '#FFA800';
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/mediumIcon.svg">`;
    }
    if (cleanFilter[i].prio == 'Low') {
        document.getElementById('prioStatus').style.backgroundColor = '#7AE229';
        document.getElementById('prioStatus').innerHTML += `<img class="detailPrioIcon" src="img/lowIcon.svg">`;
    }
}


function closeDetails() {
    document.getElementById('cover2').classList.add('d-none');
    document.getElementById('board').classList.remove('d-none');
    document.getElementById('detailsAssignetTo').innerHTML = '';
}


function showDetailsSubtasks(i) {
    document.getElementById('detailsSubtasks').innerHTML = '';
    document.getElementById('detailsSubtasks').classList.add('subtasksColomn')
    for (let j = 0; j < tasks[i].addedSubtasks.length; j++) {
        document.getElementById('detailsSubtasks').innerHTML += `
            <div class="subtasksSpace"><div>${tasks[i].addedSubtasks[j].title}</div><div>${tasks[i].addedSubtasks[j].taskStatus}</div></div>
            `
    }
   
}



function openEditTask(i) {
    document.getElementById('detailsPopup').classList.add('d-none');
    document.getElementById('editTaskPopup').classList.remove('d-none');
    document.getElementById('editTilte').value = `${tasks[i].title}`;
    document.getElementById('editDescription').value = `${tasks[i].description}`;
    document.getElementById('editDueDate').value = `${tasks[i].dueDate}`;
    selectedCatHtmlTemplate(i);
    popupNewTaskCategory = tasks[i].category;
    currentTask = [i];
    renderEditCheckboxes(i);
    setEditPrioStatus(i);
}


function setEditPrioStatus(i) {
    document.getElementById('editDueDate').value = `${tasks[i].dueDate}`;
    if (tasks[i].prio == 'Urgent') {
        editPrioUrgent();
    }
    if (tasks[i].prio == 'Medium') {
        editPrioMedium();
    }
    if (tasks[i].prio == 'Low') {
        editPrioLow();
    }
}
    

function renderEditCheckboxes(i) {
    for (let j = 0; j < tasks[i].assignedContacts.length; j++) {
        rednerCheckoxSelectedContact(j, i);
    }
    for (let j = 0; j < tasks[i].addedSubtasks.length; j++) {
        rednerCheckoxSelectedSubtasks(j, i);
    }
}


function closeEditTask() {
    for (let i = 0; i < contacts.length; i++) {
        uncheckEditContactsCheckbox(i);
    }
    for (let i = 0; i < tasks.length; i++) {
        uncheckEditSubtaskCheckbox(i);
    }
    document.getElementById('detailsPopup').classList.remove('d-none');
    document.getElementById('editTaskPopup').classList.add('d-none');
    popupAssignedContacts = [];
    popupSubtasks = [];
    editCloseContacts();
    editCloseTasks();
}


function closeCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    if (newTaskCategory.length == 0) {
        closeCategorysEmptyHtmlTemplate(dropdown);
    } else {
        closeCategoryHtmlTemplate(dropdown);
    }
}


function editShowCategorys() {
    editLoadSavedCategorys();
    let dropdown = document.getElementById('editCategory');
    dropdown.removeAttribute("onclick");
    editShowCategorysHtmltemplate(dropdown);
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
        editSavedCategorysHtmlTemplate(i);
    }
}


function editCloseCategorys() {
    let dropdown = document.getElementById('editCategory');
    if (popupNewTaskCategory.length == 0) {
        noselectedCategoryHtmlTemplate(dropdown);
    } else {
        showselectedCategoryHtmlTemplate(dropdown);
    }
}


function editCategory() {
    editCategoryHtmlTemplate();
    document.getElementById('editCatColor').classList.remove('d-none');
    document.getElementById('editCatColor').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        getRandomCatColor();
        rendernewCategorysColor(i);
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
        categoryColor.push(document.getElementById('popupCatColor0').innerHTML);
    }
    document.getElementById('editCatColor').classList.add('d-none');
    editAddPopupCategory(categorys.length - 1);
}


function editAddPopupCategory(i) {
    if (popupNewTaskCategory.indexOf(categorys[i]) >= 0) {
        popupNewTaskCategory.splice(0, 2);
        showEditCat();
    } else {
        popupNewTaskCategory.splice(0, 2);
        popupNewTaskCategory.push(categorys[i], categoryColor[i]);
        showEditCat();
    }
}


function showEditCat() {
    let dropdown = document.getElementById('editCategory');
    if (popupNewTaskCategory.length > 0) {
        popupShowselectedCatHtmlTemplate(dropdown);
    } else {
        popupShowNoCatSelectedHtmlTemplate(dropdown);
    }
}


function editPrioUrgent() {
    document.getElementById('editPrioUrgent').classList.add('prioUrgent');
    document.getElementById('editPrioUrgentIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioMedium();
    document.getElementById('editPrioUrgent').onclick = clearPrioUrgent;
    popupPrioStatus.push('Urgent');
}


function editPrioMedium() {
    document.getElementById('editPrioMedium').classList.add('prioMedium');
    document.getElementById('editPrioMediumIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioUrgent();
    document.getElementById('editPrioMedium').onclick = clearPrioMedium;
    popupPrioStatus.push('Medium');
}


function editPrioLow() {
    document.getElementById('editPrioLow').classList.add('prioLow');
    document.getElementById('editPrioLowIcon').classList.add('prioIconFilter');
    clearPrioUrgent();
    clearPrioMedium();
    document.getElementById('editPrioLow').onclick = clearPrioLow;
    popupPrioStatus.push('Low');
}


function clearPrioUrgent() {
    document.getElementById('editPrioUrgent').classList.remove('prioUrgent');
    document.getElementById('editPrioUrgentIcon').classList.remove('prioIconFilter');
    document.getElementById('editPrioUrgent').onclick = editPrioUrgent;
    popupPrioStatus.splice(0, 1);
}


function clearPrioMedium() {
    document.getElementById('editPrioMedium').classList.remove('prioMedium');
    document.getElementById('editPrioMediumIcon').classList.remove('prioIconFilter');
    document.getElementById('editPrioMedium').onclick = editPrioMedium;
    popupPrioStatus.splice(0, 1);
}


function clearPrioLow() {
    document.getElementById('editPrioLow').classList.remove('prioLow');
    document.getElementById('editPrioLowIcon').classList.remove('prioIconFilter');
    document.getElementById('editPrioLow').onclick = editPrioLow;
    popupPrioStatus.splice(0, 1);
}


function editShowContacts() {
    let dropdown = document.getElementById('editContacts');
    dropdown.removeAttribute("onclick");
    editShowContactsHtlmTemplate(dropdown);
    renderEditContacts();
    editCloseCategorys();
}


function renderEditContacts() {
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                renderEditContactsHtmlTemplate(j);
                checkEditContactsCheckbox(j);
            }
        }
    }
    checkPopupCurrentUserCheckbox();
}


function editCloseContacts() {
    let dropdown = document.getElementById('editContacts');
    editCloseContactsHtmlTemplate(dropdown);
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
        editContactsCheckboxHtmlTemplate(i);
    }
}


function uncheckEditContactsCheckbox(i) {
    if (document.getElementById(`editCheckboxChecked${i}`)) {
        document.getElementById(`editCheckboxChecked${i}`).classList.remove('checkboxChecked');
    }

}


function editShowTasks(i) {
    let dropdown = document.getElementById('editTaskDropdown');
    dropdown.removeAttribute("onclick");
    editShowAddSubtaskHtmlTemplate(dropdown);
    editRenderTasks(i);
    document.getElementById('editTaskBottomRow').classList.remove('margin231')
}


function editRenderTasks(j) {
    if (tasks.length == 0) {
        editShowEmptySubtaskHtmlTemplate();
    } else {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] != tasks[j]) {
                editShowSubtaskHtmlTemplate(i);
                checkEditSubtaskCheckbox(i);
            }
        }
    }
}


function editCloseTasks() {
    let dropdown = document.getElementById('editTaskDropdown');
    editCloseTasksHtmlTemplate(dropdown);
    document.getElementById('editTaskBottomRow').classList.add('margin231')
}


function rednerCheckoxSelectedSubtasks(j, i) {
    for (let k = 0; k < tasks.length; k++) {
        if (JSON.stringify(tasks[k]) == JSON.stringify(tasks[i].addedSubtasks[j])) {
            popupSubtasks.push(tasks[i].addedSubtasks[j]);
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
    if (indexOf >= 0 && document.getElementById(`editSubtaskCheckbox${i}`)) {
        document.getElementById(`editSubtaskCheckbox${i}`).innerHTML = `
        <div id="editCheckboxSubtaskChecked${i}" class="checkboxChecked"></div>
    `
    }
}


function uncheckEditSubtaskCheckbox(i) {
    if (document.getElementById(`editCheckboxSubtaskChecked${i}`)) {
        document.getElementById(`editCheckboxSubtaskChecked${i}`).classList.remove('checkboxChecked');
    }
}


function saveEditTask() {
    tasks[currentTask].title = document.getElementById('editTilte').value;
    tasks[currentTask].description = document.getElementById('editDescription').value;
    tasks[currentTask].category = popupNewTaskCategory;
    tasks[currentTask].assignedContacts = popupAssignedContacts;
    tasks[currentTask].dueDate = document.getElementById('editDueDate').value;
    tasks[currentTask].prio = popupPrioStatus;
    tasks[currentTask].addedSubtasks = popupSubtasks;
    closeEditTask();
    saveBoard();
    boardRenderTasks();
    closeDetails();
}


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
        document.getElementById('closeDetails').src = 'img/backBtn.svg';
        document.getElementById('closeDetails').style.filter = 'invert(50%)';
    } else {
        document.getElementById('closeDetails').src = 'img/closeIcon.svg';
        document.getElementById('closeDetails').style.filter = 'invert(0%)';
    }
}