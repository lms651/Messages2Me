const messageSet = new Set();

function init() {
    const form = document.getElementById('input-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        onSubmit();
        displayList();
    })
    const clearBtn = document.getElementById("clear-button");
    const cancelClearBtn = document.getElementById("cancel-clear");
    const confirmClearBtn = document.getElementById("confirm-clear");

    clearBtn.addEventListener('click', () => {
        showWarning();
        showConfirmActions();

        cancelClearBtn.addEventListener('click', () => {
            onCancelClear();
        })

        confirmClearBtn.addEventListener('click', () => {
            onConfirmClear();
            displayList();
        })
    })

    const sendBtn = document.getElementById("send-button");
    sendBtn.addEventListener('click', () => {
        showOnSend();
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
        editBtn.innerText = '✎';
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

function showConfirmActions() {
    const actionsContainer = document.getElementById('confirm-actions');
    actionsContainer.classList.remove('hidden');
}

function onConfirmClear() {
    messageSet.clear();
    const actionsContainer = document.getElementById('confirm-actions');
    actionsContainer.classList.add('hidden');

}

function onCancelClear() {
    const actionsContainer = document.getElementById('confirm-actions');
    actionsContainer.classList.add('hidden');
}

function showWarning() {
    console.log('show warning called');
    toastr.warning("All messages will be forever lost and are unrecoverable. Are you sure?", "Warning:");
}

function showOnSend() {
    toastr.success("Your messages have been sent!", "Success:");

}

export {
    init,
    displayList
}