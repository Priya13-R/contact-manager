document.getElementById('addContactBtn').addEventListener('click', addContact);
document.getElementById('search').addEventListener('input', searchContacts);

let contacts = [];
let editIndex = null;

function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name === '' || phone === '' || email === '') {
        alert('Please fill in all fields');
        return;
    }

    const contact = { name, phone, email };

    if (editIndex !== null) {
        contacts[editIndex] = contact;
        editIndex = null;
    } else {
        contacts.push(contact);
    }

    clearForm();
    displayContacts();
}

function editContact(index) {
    document.getElementById('name').value = contacts[index].name;
    document.getElementById('phone').value = contacts[index].phone;
    document.getElementById('email').value = contacts[index].email;
    editIndex = index;
}

function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts();
}

function searchContacts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm)
    );
    displayContacts(filteredContacts);
}

function displayContacts(filteredContacts = contacts) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';
    filteredContacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${contact.name} - ${contact.phone} - ${contact.email}
            <button class="edit-btn" onclick="editContact(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
        `;
        contactList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}
