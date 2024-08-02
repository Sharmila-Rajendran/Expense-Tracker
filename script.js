let expenses = [];

function AddExpense() {
    const name = document.getElementById('expname').value;
    const amount = parseFloat(document.getElementById('expamnt').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('event-date').value;

    if (!name || isNaN(amount) || !category || !date) {
        alert('Please fill all the fields');
        return;
    }

    const expense = { name, amount, category, date, id: Date.now() };
    expenses.push(expense);
    displayExp(expenses);
    Total(expenses);
    clearfrm();
}

function displayExp(expensesToDisplay) {
    const expensetab = document.getElementById('id1').querySelector('tbody');
    expensetab.innerHTML = '';
    expensesToDisplay.forEach(expense => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td class="butt">
                <button class="Edit" onclick="Edit(${expense.id})">Edit</button>
                <button class="Delete" onclick="Delete(${expense.id})">Delete</button>
            </td>
        `;

        expensetab.appendChild(row);
    });
}

function Total(expensesToCalculate) {
    const totalAmount = document.getElementById('tot');
    const total = expensesToCalculate.reduce((acc, expense) => acc + expense.amount, 0);
    totalAmount.textContent = total.toFixed(2);
}

function clearfrm() {
    document.getElementById('expname').value = '';
    document.getElementById('expamnt').value = '';
    document.getElementById('category').value = '';
    document.getElementById('event-date').value = '';
}

function Edit(expenseId) {
    const expenseToEdit = expenses.find(expense => expense.id === expenseId);

    document.getElementById('expname').value = expenseToEdit.name;
    document.getElementById('expamnt').value = expenseToEdit.amount;
    document.getElementById('category').value = expenseToEdit.category;
    document.getElementById('event-date').value = expenseToEdit.date;

    Delete(expenseId);
}

function Delete(expenseId) {
    expenses = expenses.filter(expense => expense.id !== expenseId);
    displayExp(expenses);
    Total(expenses);
}

function filterExpenses() {
    const filter = document.getElementById('filter').value;
    if (filter === '') {
        displayExp(expenses);
    } else {
        const filterExp = expenses.filter(expense => expense.category === filter);
        displayExp(filterExp);
    }
}
