const messageSet = new Set();

function init() {
    const form = document.getElementById('input-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        onSubmit();
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
    list.innerHTML = ''; 

    messageSet.forEach(element => {
        const listItem = document.createElement('li');
        listItem.innerText = element;
        list.appendChild(listItem);
    })
}

export {
    init,
    displayList
}