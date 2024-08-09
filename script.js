document.addEventListener('DOMContentLoaded', () => {
    const groceryForm = document.getElementById('grocery-form');
    const groceryInput = document.getElementById('grocery-input');
    const groceryList = document.getElementById('grocery-list');

    let groceries = JSON.parse(localStorage.getItem('groceries')) || [];

    const renderGroceries = () => {
        groceryList.innerHTML = '';
        groceries.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item}</span>
                <div>
                    <button class="edit" data-index="${index}"><i class="fas fa-pencil-alt"></i></button>
                    <button class="delete" data-index="${index}"><i class="fas fa-times"></i></button>
                </div>
            `;
            groceryList.appendChild(li);
        });
    };

    const addGrocery = (e) => {
        e.preventDefault();
        const newItem = groceryInput.value.trim();
        if (newItem) {
            groceries.push(newItem);
            groceryInput.value = '';
            localStorage.setItem('groceries', JSON.stringify(groceries));
            renderGroceries();
        }
    };

    const editGrocery = (index) => {
        const newItem = prompt('Redaguoti prekę:', groceries[index]);
        if (newItem) {
            groceries[index] = newItem;
            localStorage.setItem('groceries', JSON.stringify(groceries));
            renderGroceries();
        }
    };

    const deleteGrocery = (index) => {
        groceries.splice(index, 1);
        localStorage.setItem('groceries', JSON.stringify(groceries));
        renderGroceries();
    };

    groceryForm.addEventListener('submit', addGrocery);
    groceryList.addEventListener('click', (e) => {
        if (e.target.closest('.edit')) {
            const index = e.target.closest('.edit').getAttribute('data-index');
            editGrocery(index);
        } else if (e.target.closest('.delete')) {
            const index = e.target.closest('.delete').getAttribute('data-index');
            deleteGrocery(index);
        }
    });

    renderGroceries();
});
