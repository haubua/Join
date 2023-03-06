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


function renderEmptySpaceHtmlTemplate() {
    document.getElementById('todo').innerHTML += `<div id="emptySpaceTodo" class="task emptySpace d-none"></div>`
    document.getElementById('inProgress').innerHTML += `<div id="emptySpaceInProgress" class="task emptySpace d-none"></div>`
    document.getElementById('awaitingFb').innerHTML += `<div id="emptySpaceAwaitingFb" class="task emptySpace d-none"></div>`
    document.getElementById('done').innerHTML += `<div id="emptySpaceDone" class="task emptySpace d-none"></div>`
}

function render2ContactsHtmlTemplate(i) {
    document.getElementById(`contacts${i}`).innerHTML = `
        <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[0].contactColor}">
            ${tasks[i].assignedContacts[0].lastName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[0].firstName.charAt(0).toUpperCase()}
        </div>
        <div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[1].contactColor}">
            ${tasks[i].assignedContacts[1].lastName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[1].firstName.charAt(0).toUpperCase()}
        </div>
        <div id="moreContacts${i}" class="contactInitials" style="background-color: #2A3647"></div>
        `
}

function render3ContactsHtmlTemplate(i, j) {
    document.getElementById(`contacts${i}`).innerHTML += `
<div class="contactInitials" style="background-color: ${tasks[i].assignedContacts[j].contactColor}">
    ${tasks[i].assignedContacts[j].lastName.charAt(0).toUpperCase()}${tasks[i].assignedContacts[j].firstName.charAt(0).toUpperCase()}
</div>`
}


function renderSubtasksHtmlTemplate(i, countDoneSubtasks) {
    document.getElementById(`subtasks${i}`).innerHTML = `
                <div class="flex center marginTopBtm4">
                    <div class="subtaskProgressbar">
                        <div id="progress${i}" class="subtaskProgress"></div>
                    </div>
                    <div class="progressFont">${countDoneSubtasks}/${tasks[i].addedSubtasks.length} Done</div>
                </div>`
}


function renderDetailsSubtasksHtmlTemplate(i, countDoneSubtasks) {
    document.getElementById(`detailsSubtasks`).innerHTML = `
                <div class="detailsSubtasks" onclick="showDetailsSubtasks(${i})">
                    <div class="subtaskProgressbar marginRight10px">
                        <div id="detailsSubtasksProgress" class="subtaskProgress"></div>
                    </div>
                    <div class="progressFont">${countDoneSubtasks}/${tasks[i].addedSubtasks.length} Done</div>
                </div>
                `
}


function renderUrgentPrioHtmlTemplate(i) {
    document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=img/taskIconUrgent.svg class="taskPrioIcon">`
}

function renderMediumPrioHtmlTemplate(i) {
    document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=img/mediumIcon.svg class="taskPrioIcon">`
}


function renderLowPrioHtmlTemplate(i) {
    document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=img/lowIcon.svg class="taskPrioIcon">`
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


function renderFilteredTasks2ContactsHtmlTemplate(i) {
    document.getElementById(`contacts${i}`).innerHTML = `
        <div class="contactInitials" style="background-color: ${cleanFilter[i].assignedContacts[0].contactColor}">
            ${cleanFilter[i].assignedContacts[0].lastName.charAt(0).toUpperCase()}${cleanFilter[i].assignedContacts[0].firstName.charAt(0).toUpperCase()}
        </div>
        <div class="contactInitials" style="background-color: ${cleanFilter[i].assignedContacts[1].contactColor}">
            ${cleanFilter[i].assignedContacts[1].lastName.charAt(0).toUpperCase()}${cleanFilter[i].assignedContacts[1].firstName.charAt(0).toUpperCase()}
        </div>
        <div id="moreContacts${i}" class="contactInitials" style="background-color: #2A3647"></div>
        `
}


function renderFilteredTasks3ContactsHtmlTemplate(i, j) {
    document.getElementById(`contacts${i}`).innerHTML += `
        <div class="contactInitials" style="background-color: ${cleanFilter[i].assignedContacts[j].contactColor}">
            ${cleanFilter[i].assignedContacts[j].lastName.charAt(0).toUpperCase()}${cleanFilter[i].assignedContacts[j].firstName.charAt(0).toUpperCase()}
        </div>
        `
}


function renderFilteredTaskSubtasksHtmlTemplates(i) {
    document.getElementById(`subtasks${i}`).innerHTML = `
        <div class="flex center marginTopBtm4">
            <div class="subtaskProgressbar">
                <div id="progress${i}" class="subtaskProgress"></div>
            </div>
            <div class="progressFont">${countDoneSubtasks}/${cleanFilter[i].addedSubtasks.length} Done</div>
        </div>
        `
}


function renderFilteredTaskUrgentPrioHtmlTemplate(i) {
    document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=img/taskIconUrgent.svg class="taskPrioIcon">`
}


function renderFilteredTaskMediumPrioHtmlTemplate(i) {
    document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=img/mediumIcon.svg class="taskPrioIcon">`
}


function renderFilteredTaskLowPrioHtmlTemplate(i) {
    document.getElementById(`taskPrioIcon${i}`).innerHTML = `<img src=img/lowIcon.svg class="taskPrioIcon">`
}

function renderTasksDetailsHtmlTemplate(i) {
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
    document.getElementById('detailsSubtasks').innerHTML = `
        <div></div>
        `
    document.getElementById('editSubtasks').innerHTML = `
        <div onclick="editShowTasks(${i})" id="editTaskDropdown" class="dropdown selectWidth">
            <div class="dorpdownRow  categoryPadding">Add Subtask<img src="img/downIcon.svg" alt=""></div>
        </div>
        `
}


function renderDetailsAssignetContactsHtmltemplate(i, j) {
    document.getElementById('detailsAssignetTo').innerHTML += `
        <div class="detailsContainer">
            <div id="taskInitial${j}" class="circleBg"></div>
            <div class="detailsContactName">${tasks[i].assignedContacts[j].lastName} ${tasks[i].assignedContacts[j].firstName}</div>
        </div>
        `
}


function renderDetailsEditBtnHtmltemplate(i) {
    document.getElementById('detailsEdit').innerHTML = `
        <div class="detailsEdit" onclick="openEditTask(${i})"><img class="pencil" src=img/pencilWhite.svg"></div>
        `
}


function renderFilteredTaskDetailHtmlTemplate(i) {
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
            <div class="dorpdownRow  categoryPadding">Add Subtask<img src="img/downIcon.svg" alt=""></div>
        </div>
        `
}


function renderFilteredTaskDetailsAssignetContactsHtmlTemp(i, j) {
    document.getElementById('detailsAssignetTo').innerHTML += `
        <div class="detailsContainer">
            <div id="taskInitial${j}" class="circleBg"></div>
            <div class="detailsContactName">${cleanFilter[i].assignedContacts[j].lastName} ${cleanFilter[i].assignedContacts[j].firstName}</div>
        </div>
        `
}


function renderFilteredTasksEditBtnHtmltemplate(i) {
    document.getElementById('detailsEdit').innerHTML = `
        <div class="detailsEdit" onclick="openEditTask(${i})"><img class="pencil" src="img/pencilWhite.svg"></div>
        `
}


function selectedCatHtmlTemplate(i) {
    document.getElementById('editCategory').innerHTML = `
        <div onclick="editShowCategorys(${i})" class="category categoryPadding"
            >${tasks[i].category[0]}
            <div class="catColor" style="background-color: ${tasks[i].category[1]}"></div>
        </div>
        `
}

function editCloseContactsHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="img/downIcon.svg" alt=""></div>
     `
}

function editShowCategorysHtmltemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editCloseCategorys()" class="dorpdownRow categoryPadding borderBottom">Select task category <img src="img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div onclick="editCategory()" class="categoryPadding category spacebetween">New category <img class="plus" src="img/boardPlusBtn.svg"></div>
            <div id="popupSavedCategorys"></div>
        </div>
        `
}


function editSavedCategorysHtmlTemplate(i) {
    document.getElementById('popupSavedCategorys').innerHTML += `
        <div onclick="editAddPopupCategory(${i})" class="categoryPadding category">
            ${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div>
        </div>
        `
}


function noselectedCategoryHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="img/downIcon.svg" alt=""></div>
        `
}


function showselectedCategoryHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="category categoryPadding">
            ${popupNewTaskCategory[0]}<div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div>
        </div>
        `
}


function editCategoryHtmlTemplate() {
    document.getElementById('editCategory').innerHTML = `
        <div class="spacebetween newCat">
            <input id="editCat" class="catInput">
            <div class="newCatBtn">
                <img class="clearBtn" src="img/closeIcon.svg">
                <div class="greyLine"></div>
                <img onclick="saveCatEdit()"class="checkBtn" src="img/checkMark.ico">
            </div>
        </div>
        `
}


function rendernewCategorysColor(i) {
    document.getElementById('editCatColor').innerHTML += `
        <div onclick="popupAddNewCatColor(${i})" class="catColor" id="popupAddNewCatColor${i}" style="background-color: ${color}">
            <div class="d-none" id="popupCatColor${i}">${color}</div>
        </div>
        `
}


function popupShowselectedCatHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="category categoryPadding">
            ${popupNewTaskCategory[0]}<div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div>
        </div>
        `
}


function popupShowNoCatSelectedHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editShowCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="img/downIcon.svg" alt=""></div>
        `
}


function editShowContactsHtlmTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editCloseContacts()" class="dorpdownRow categoryPadding borderBottom">Select contacts to assign<img src="img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div class="categoryPadding category spacebetween" onclick="popupAddCurrentUser()">
                You<div class="contactsCheckbox" id="popupCurrentUserCheckbox"></div>
            </div>
            <div id="editContactsContainer"></div>
            <div onclick="popupAddNewContact()" class="categoryPadding category spacebetween">
                Add new contact <img class="newContactIcon" src="img/newContactIcon.png">
            </div>
        </div>
        `
}


function renderEditContactsHtmlTemplate(j) {
    document.getElementById('editContactsContainer').innerHTML += `
        <div onclick="editAddContact(${j})" class="categoryPadding category spacebetween">
            ${contacts[j].lastName} ${contacts[j].firstName}
            <div class="contactsCheckbox" id="editContactsCheckbox${j}"></div>
        </div>
        `
}

function editCloseContactsHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editShowContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="img/downIcon.svg" alt=""></div>
        `
}


function editContactsCheckboxHtmlTemplate(i) {
    document.getElementById(`editContactsCheckbox${i}`).innerHTML = `
        <div id="editCheckboxChecked${i}" class="checkboxChecked"></div>
        `
}


function editShowAddSubtaskHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editCloseTasks()" class="dorpdownRow categoryPadding borderBottom">Add Subtask<img src="img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div id="editTasks"></div>
        </div>
        `
}

function editShowEmptySubtaskHtmlTemplate() {
    document.getElementById('editTasks').innerHTML = `
        <div class="categoryPadding category">No task available</div>
        `
}

function editShowSubtaskHtmlTemplate(i) {
    document.getElementById('editTasks').innerHTML += `
        <div onclick="editSubtask(${i})" class="categoryPadding category spacebetween">
            ${tasks[i].title} <div class="contactsCheckbox" id="editSubtaskCheckbox${i}"></div>
        </div>
        `
}

function editCloseTasksHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="editShowTasks()" class="dorpdownRow categoryPadding">Add Subtask<img src="img/downIcon.svg" alt=""></div>
        `
}
