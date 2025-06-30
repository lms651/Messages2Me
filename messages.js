const messageSet = new Set();

function init() {
    const form = document.getElementById('input-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        onSubmit();
        displayList();
    })
    const clearBtn = document.getElementById("clear-button");
    clearBtn.addEventListener('click', () => {
        onClear();
        console.log("on clear called")
        displayList();
    })
}

function onSubmit() {
    const messageTxt = document.getElementById('input-text').value;
    console.log(messageTxt);
    messageSet.add(messageTxt);
}

function displayList() {
    const list = document.getElementById('message-list');
    list.innerHTML = ''; // clear before re-adding

    messageSet.forEach(message  => {
        const listItem = document.createElement('li');
        listItem.classList.add("flex", "items-center", "justify-center", "gap-2", "py-1");

        // Input Text
        const inputText = document.createElement('span');
        inputText.innerText = message;
        inputText.classList.add("text-left");

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add("px-2", "py-1", "bg-yellow-200", "rounded", "mr-1", "opacity-40");
        editBtn.addEventListener('click', () => onEdit(message));

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'X';
        deleteBtn.classList.add("px-2", "py-1", "bg-red-200", "rounded", "mr-1", "opacity-40");
        deleteBtn.addEventListener('click', () => onDelete(message));

        // Append to list item
        listItem.appendChild(inputText);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        list.appendChild(listItem);
    });
}

function onEdit(message) {
    const messageToEdit = message;
    onDelete(message);
    displayList();
    const textBox = document.getElementById('input-text');
    textBox.value = messageToEdit;
}

function onDelete(message) {
    const messageToDelete = message;
    messageSet.delete(messageToDelete);
    displayList();
}

function onClear() {
    messageSet.clear();
}

export {
    init,
    displayList
}