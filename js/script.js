setURL('https://robert-hahn.developerakademie.net/smallest_backend_ever-master');



async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

async function initContacts() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || contactsLocal;
    charFirstName = [];
    charLastName = [];
    contactColor = [];
    rednerContacts();
}

async function loadContacts() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || contactsLocal;
}

async function saveContactsBackend() {
    await backend.setItem('contacts', JSON.stringify(contacts))
}


async function saveAndRenderContacts() {
    await backend.setItem('contacts', JSON.stringify(contacts))
    initContacts();
}


async function deleteBackend() {
    await backend.deleteItem('tasks')
    await backend.deleteItem('contacts')
}

