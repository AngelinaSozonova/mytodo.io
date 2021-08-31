const myInput = document.querySelector('#myInput');
const myButton = document.querySelector('#myButton');
const myList = document.querySelector('#myList');
const myListLength = document.getElementById('myList');
let myListArray = [];
let ndx = 1;

myButton.addEventListener('click', function() {
    const newValue = myInput.value;
    const objListArray = {
        text: newValue,
        id: ndx
    } 
    ndx ++;
    myListArray.push(objListArray);
    createDo(objListArray);
    outputListLocalStorage()
    myInput.value = "";
})
    
document.addEventListener("DOMContentLoaded", function() {
    if(localStorage.getItem('item')) {
        myListArray = JSON.parse(localStorage.getItem('item'));
        myListArray.forEach((item) => {
            createDo(item);
            ndx++;
        })
        counterTasks();
    }
})

function outputListLocalStorage() {
    localStorage.setItem('item', JSON.stringify(myListArray));
}

function counterTasks() { 
    document.getElementById('result').innerHTML = myListArray.length; 
}

function createDo (obj) {
    const newItem = document.createElement('li');
    newItem.classList.add('item');
    newItem.textContent = obj.text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteBut');
    deleteButton.textContent = 'Удалить';

    deleteButton.addEventListener('click', function() {
        myList.removeChild(newItem);    
        const removeIndex = myListArray.findIndex(f => f.id === obj.id);
        myListArray.splice(removeIndex, 1);
        outputListLocalStorage()
        counterTasks();
    })
    newItem.appendChild(deleteButton); 
    myList.appendChild(newItem);
    
    counterTasks();
}
   

