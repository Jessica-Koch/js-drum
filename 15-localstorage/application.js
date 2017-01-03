const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items')) || [];
const selectAllButton = document.querySelector('.selectAll');
const deleteButton = document.querySelector('.delete');

function addItem(e) {
    // prevent page from refreshing 
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false  // done state
    }

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

// pass in empty object 
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
                
            </li>    
        `;
    }).join('');
}

function selectAll(e){
    let checkboxes = itemsList.querySelectorAll('input[type=checkbox]')
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;    
    })
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;

    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function deleteItem(e){
    items.map(item => {
        if (item.done) {
            const index = items.indexOf(item);
            if (index > -1) {
                items.splice(index, 1);
                localStorage.removeItem(item);
            }
            localStorage.setItem('items', JSON.stringify(items))
            populateList(items, itemsList);
            console.log(items)
        }
    })
}

deleteButton.addEventListener('click', deleteItem);
selectAllButton.addEventListener('click', selectAll);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList);
