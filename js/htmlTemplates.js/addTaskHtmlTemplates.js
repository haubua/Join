function showCategorysHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="closeCategorys()" class="dorpdownRow categoryPadding borderBottom">
            Select task category <img src="img/downIcon.svg" alt="">
        </div>
        <div class="dropdownContainer">
            <div class="categoryPadding category spacebetween" onclick="addNewCategory()">
                New category <img class="plus" src="img/boardPlusBtn.svg">
            </div>
            <div id="savedCategorys"></div>
        </div>
        `
}


function renderSavedCatHtmlTemplate(i) {
    document.getElementById('savedCategorys').innerHTML += `
        <div onclick="addCategory(${i})" class="categoryPadding category">
            ${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div>
        </div>
        `
}


function closeCategorysEmptyHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showCategorys()" class="dorpdownRow categoryPadding">
            Select task category<img src="img/downIcon.svg" alt="">
        </div>
        `
}


function closeCategoryHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showCategorys()" class="category categoryPadding">
            ${newTaskCategory[0]}<div class="catColor" style="background-color: ${newTaskCategory[1]}"></div>
        </div>
        `
}

function showSelectedCatHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showCategorys()" class="category categoryPadding">
            ${newTaskCategory[0]}<div class="catColor" style="background-color: ${newTaskCategory[1]}"></div>
        </div>
        `
}

function noCatSelectedHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showCategorys()" class="dorpdownRow categoryPadding">
            Select task category<img src="img/downIcon.svg" alt="">
        </div>
        `
}

function addNewCategoryHtmlTemplate() {
    document.getElementById('categoryDropdown').innerHTML = `
        <div class="spacebetween newCat">
            <input id="newCat" class="catInput">
            <div class="newCatBtn">
                <img onclick="closeNewCat()" class="clearBtn" src="img/closeIcon.svg">
                <div class="greyLine"></div>
                <img onclick="saveNewCat()"class="checkBtn" src="img/checkMark.ico">
            </div>
        </div>
        `
}

function newCategoryColorsHtmlTemplate(i) {
    document.getElementById('catColorsSelection').innerHTML += `
        <div onclick="addNewCatColor(${i})" class="catColor" id="addNewCatColor${i}" style="background-color: ${color}">
            <div class="d-none" id="catColor${i}">${color}</div>
        </div>
        `
}

function showContactsHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="closeContacts()" class="dorpdownRow categoryPadding borderBottom">
            Select contacts to assign<img src="img/downIcon.svg" alt="">
        </div>
        <div class="dropdownContainer">
            <div class="categoryPadding category spacebetween" onclick="addCurrentUser()">You<div class="contactsCheckbox" id="currentUserCheckbox"></div></div>
            <div id="contacts"></div>
            <div onclick="taskAddNewContact()" class="categoryPadding category spacebetween">
                Add new contact <img class="newContactIcon" src="img/newContactIcon.png">
            </div>
        </div>
    `
}

function renderContactsHtmlTemplate(j) {
    document.getElementById('contacts').innerHTML += `
        <div onclick="addContact(${j})" class="categoryPadding category spacebetween">
            ${contacts[j].lastName} ${contacts[j].firstName}
            <div class="contactsCheckbox" id="contactsCheckbox${j}"></div>
        </div>
    `
}

function closeContactsHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="img/downIcon.svg" alt=""></div>
     `
}

function checkContactsCheckboxHtmlTemplate(i) {
    document.getElementById(`contactsCheckbox${i}`).innerHTML = `
        <div id="checkboxChecked${i}" class="checkboxChecked"></div>
    `
}


function setNewContactHtmlTemplate() {
    document.getElementById('popupContainerRight').innerHTML = `
        <img src="img/contactImg.svg" class="detailsInitial">
        <form class="editConRightInputfields" onsubmit="taskSaveNewContact(); return false">
            <img class="closeIcon" src="img/closeIcon.svg" onclick="closePopup()" alt="">
            <div class="editContactInputfields">
                <input type="text" class="editInputfield" id="newName" placeholder="Name" required>
                <img class="editIcons" src="img/contactIcon.svg" alt="">
            </div>
            <div class="editContactInputfields">
                <input type="email" class="editInputfield" id="newEmail" placeholder="Email" required >
                <img class="editIcons" src="img/emailIcon.svg" alt="">
            </div>
            <div class="editContactInputfields">
                <input type="number" class="editInputfield" id="newPhone" placeholder="Phone" required>
                <img class="editIcons" src="img/phoneIcon.svg" alt="">
            </div>
            <div class="btnCenter">
                <button class="saveBtn" type="submit">Save</button>
            </div>
        </form>
    `
}


function addNewContactHtmlTemplate() {
    document.getElementById('popupDescription').innerHTML = `
        <div>                                
            <div>Add Contacts</div>
            <div class="popupSubtitle">Tasks are better with a team!</div>   
        </div>
    `
}

function showSavedSucessHtmlTemplate() {
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>New contact sucessfull added to your contacts!</h3>
    `
}

function showTasksHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="closeTasks()" class="dorpdownRow categoryPadding borderBottom">
            Add Subtask<img src="img/downIcon.svg" alt="">
        </div>
        <div class="dropdownContainer">
            <div id="tasks"></div>
            <div onclick="addNewTaskPopup('todo')" class="categoryPadding category spacebetween">
                Add new Task <img class="plus" src="img/boardPlusBtn.svg">
            </div>
        </div>
        `
}

function noTasksVailableHtmlTemplate() {
    document.getElementById('tasks').innerHTML = `
            <div class="categoryPadding category">No task available</div>
        `
}

function renderSubtasksHtmlTemplate(i) {
    document.getElementById('tasks').innerHTML += `
        <div onclick="addSubtask(${i})" class="categoryPadding category spacebetween">
            ${tasks[i].title}<div class="contactsCheckbox" id="subtaskCheckbox${i}"></div>
        </div>
    `
}

function closeTasksHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showTasks()" class="dorpdownRow categoryPadding">
            Add Subtask<img src="img/downIcon.svg" alt="">
        </div>
     `
}

function checkSubtaskCheckboxHtmlTemplate(i) {
    document.getElementById(`subtaskCheckbox${i}`).innerHTML = `
        <div id="checkboxSubtaskChecked${i}" class="checkboxChecked"></div>
    `
}

function showPopupCatDropdownTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="closePopupCategorys()" class="dorpdownRow categoryPadding borderBottom">
            Select task category <img src="img/downIcon.svg" alt="">
        </div>
        <div class="popupDropdownContainer">
            <div onclick="popupAddNewCategory()" class="categoryPadding category spacebetween">
                New category <img class="plus" src="img/boardPlusBtn.svg"></div>
            <div id="popupSavedCategorys"></div>
        </div>
        `
}

function renderSavedCatTemplate(i) {
    document.getElementById('popupSavedCategorys').innerHTML += `
        <div onclick="addPopupCategory(${i})" class="categoryPadding category">
            ${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div>
        </div>
    `
}

function renderPopupEmptyCatTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="dorpdownRow categoryPadding">
            Select task category<img src="img/downIcon.svg" alt="">
        </div>
`
}

function renderPopupCatTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="category categoryPadding">
            ${popupNewTaskCategory[0]}
            <div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div>
        </div>
    `
}

function renderPopupEmptyCatDropdownTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="category categoryPadding">
            ${popupNewTaskCategory[0]}
            <div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div>
        </div>
    `
}


function renderPopupCatDropdownTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="dorpdownRow categoryPadding">
            Select task category<img src="img/downIcon.svg" alt="">
        </div>
    `
}

function renderPopupAddCatDropdownTemplate() {
    document.getElementById('popupCategoryDropdown').innerHTML =`
        <div class="spacebetween newCat"><input id="popupNewCat" class="catInput">
            <div class="newCatBtn"><img class="clearBtn" src="img/closeIcon.svg" onclick="popupCloseNewCat()">
                <div class="greyLine"></div>
                <img onclick="popupSaveNewCat()"class="checkBtn" src="img/checkMark.ico">
            </div>
        </div>
    `
}

function renderPopupCatColorTemplate(i) {
    document.getElementById('popupCatColorsSelection').innerHTML += `
        <div onclick="popupAddNewCatColor(${i})" class="catColor" id="popupAddNewCatColor${i}" style="background-color: ${color}">
            <div class="d-none" id="popupCatColor${i}">${color}</div>
        </div>
    `
}


function renderPopupContactsDropdownTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="closePopupContacts()" class="dorpdownRow categoryPadding borderBottom">
            Select contacts to assign<img src="img/downIcon.svg" alt="">
        </div>
        <div class="popupDropdownContainer">
            <div class="categoryPadding category spacebetween" onclick="popupAddCurrentUser()">
                You<div class="contactsCheckbox" id="popupCurrentUserCheckbox"></div>
            </div>
            <div id="popupContacts"></div>
            <div onclick="popupAddNewContact()" class="categoryPadding category spacebetween">
                Add new contact <img class="newContactIcon" src="img/newContactIcon.png">
            </div>
        </div>
    `
}

function renderPopupContactsTemplate(j) {
    document.getElementById('popupContacts').innerHTML += `
        <div onclick="popupAddContact(${j})" class="categoryPadding category spacebetween">
            ${contacts[j].lastName} ${contacts[j].firstName}
            <div class="contactsCheckbox" id="popupContactsCheckbox${j}"></div>
        </div>
    `
}

function renderClosePopupContactsTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showPopupContacts()" class="dorpdownRow categoryPadding">
            Select contacts to assign<img src="img/downIcon.svg" alt="">
        </div>
    `
}


function popupDescriptionTemplate() {
    document.getElementById('popupDescription').innerHTML = `
        <div>                                
            <div>Add Contacts</div>
            <div class="popupSubtitle">Tasks are better with a team!</div>   
        </div>
    `
}

function renderPopupTasksTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="popupCloseTasks()" class="dorpdownRow categoryPadding borderBottom">
            Add Subtask<img src="img/downIcon.svg" alt="">
        </div>
        <div class="dropdownContainer">
            <div id="popupTasks"></div>
        </div>
    `
}

function checkpopupContactsCheckboxTemplate(i) {
    document.getElementById(`popupContactsCheckbox${i}`).innerHTML = `
        <div id="popupCheckboxChecked${i}" class="checkboxChecked"></div>
    `
}

function popupRenderEmptyTaskTemplate() {
    document.getElementById('popupTasks').innerHTML = `
        <div class="categoryPadding category">No task available</div>
    `
}


function popupRenderTasksTemplate(i) {
    document.getElementById('popupTasks').innerHTML += `
    <div onclick="popupAddSubtask(${i})" class="categoryPadding category spacebetween">
        ${tasks[i].title} 
        <div class="contactsCheckbox" id="popupSubtaskCheckbox${i}"></div>
    </div>
`
}


function popupCloseTasksTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="popupShowTasks()" class="dorpdownRow categoryPadding">Add Subtask<img src="img/downIcon.svg" alt=""></div>
    `
}

function renderPopupSubtasksCheckboxTemplate(i) {
    document.getElementById(`popupSubtaskCheckbox${i}`).innerHTML = `
        <div id="popupCheckboxSubtaskChecked${i}" class="checkboxChecked"></div>
    `
}
