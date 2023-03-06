function renderContactsHtmlTemplate(i, j) {
    document.getElementById('contactsContainerLeft').innerHTML += `
        <div id="character${i}"></div>
        <div class="contactsRow" id="selectContact${j}" onclick="showContactDetails(${j})">
            <div class="initial" id="initial${j}"></div>
            <div>
                <div class="contactName">${contacts[j].lastName} ${contacts[j].firstName}</div>
                <a class="email" href="mailto:${contacts[j].email}">${contacts[j].email}</a>
            </div>
        </div>
        `
}


function renderLettersHtmlTemplate(i) {
    document.getElementById('character' + i).innerHTML = `
        <div class="contactsCharacter">${alpha[i]}</div>
        `
}


function setInitialHtmlTemplate(i, j) {
    document.getElementById('initial' + j).innerHTML = `
        <div class="circleBg" id="circleBg${j}">${charLastName[i]}${charFirstName[i]}</div>
        `
}


function showContactDetailsHtmlTemplate(j) {
    document.getElementById('contactDetails').innerHTML = `
        <div class="detailsFirstRow">
            <div id="detailsInitial${j}" class="detailsInitial" style="background-color: ${contacts[j].contactColor}";></div>
            <div class="detailsName">${contacts[j].lastName} ${contacts[j].firstName}</div>
        </div>
        <div class="detailsSecondRow">
            <div style="font-size: 21px;">Contact Information</div>
            <div onclick="editContact(${j})" class="editContactRow" id="editContacBtn"><img src="img/pencil.svg" class="pencilImg"> Edit Contact</div>    
        </div>
        <div class="detailsThirdRow">
            <div class="emailDetails">Email</div>
            <a class="email" href="mailto:${contacts[j].email}">${contacts[j].email}</a>
        </div>
        <div class="detailsFourthRow">
            <div class="phoneDetails">Phone</div>
            <div>${contacts[j].phone}</div>
        </div>
        <div class="contactsContainerBtn" id="ContactsBtn">
            <div id="mobileEditContacBtn" onclick="editContact(${j})" class="addContactBtn d-none"><img src="img/pencilImgWhite.svg" class="pencilImg"> Edit Contact</div>
            <div id="addNewContactBtn" onclick="addNewContact()" class="addContactBtn d-none">New contact <img class="contactIcon" src="img/newContact.svg" alt=""></div>
        </div>
        <div>
            <img src="img/backBtn.svg" class="detailsBackBtn d-none" id="detailsBackBtn" onclick="closeContactDetails()">
        </div>
        `
}


function setDetailsInitialHtmlTemplate(i, j) {
    document.getElementById('detailsInitial' + j).innerHTML = `
        <div>${charLastName[i]}${charFirstName[i]}</div>
        `
}


function setEditInnerHtmlTemplate(j) {
    document.getElementById('popupContainerRight').innerHTML = `
        <div id="editInitial" class="popupInitial"></div>
        <form class="editConRightInputfields" onsubmit="saveChanges(${j}); return false">
            <img class="closeIcon" src="img/closeIcon.svg" onclick="closePopup()" alt="">
            <div class="editContactInputfields">
                <input required type="text" class="editInputfield" id="editName" value="${contacts[j].lastName} ${contacts[j].firstName}">
                <img class="editIcons" src="img/contactIcon.svg" alt="">
            </div>
            <div class="editContactInputfields">
                <input required type="email" class="editInputfield" id="editEmail" value="${contacts[j].email}">
                <img class="editIcons" src="img/emailIcon.svg" alt="">
            </div>
            <div class="editContactInputfields">
                <input type="number" class="editInputfield" id="editPhone" value="${contacts[j].phone}" required>
                <img class="editIcons" src="img/phoneIcon.svg" alt="">
            </div>
            <div class="btnCenter">
                <button class="saveBtn" type="submit">Save</button>
            </div>
        </form>
        `
}


function setEditInitialHtmlTemplate(i) {
    document.getElementById('editInitial').innerHTML = `
        <div>${charLastName[i]}${charFirstName[i]}</div>
         `
}


function sucessHtmlTemplate() {
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>Your Changes has been saved!</h3>
        `
}


function addNewContactPopupDescriptionHtmlTemplate() {
    document.getElementById('popupDescription').innerHTML = `
        <div>                                
            <div>Add Contacts</div>
            <div class="popupSubtitle">Tasks are better with a team!</div>   
        </div>
        `
}


function setNewContactInnerHtmlTemplate() {
    document.getElementById('popupContainerRight').innerHTML = `
        <img src="img/contactImg.svg" class="popupInitial">
        <form class="editConRightInputfields" onsubmit="saveNewContact(); return false">
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


function contactAddedHtmlTemplate() {
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>New contact sucessfull added to your contacts!</h3>
        `
}


function sucessHtmlTemplate() {
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>Your Changes has been saved!</h3>
        `
}