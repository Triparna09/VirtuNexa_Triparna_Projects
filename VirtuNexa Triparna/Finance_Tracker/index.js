let transactions = [];

        function addTransaction() {
            let desc = document.getElementById('desc').value;
            let amount = parseFloat(document.getElementById('amount').value);
            let type = document.getElementById('type').value;

            if (desc && amount) {
                transactions.push({ desc, amount, type });
                updateUI();
            }
        }

        function updateUI() {
            let income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
            let expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

            let transactionList = document.getElementById('transactions');
            transactionList.innerHTML = transactions.map(t =>
                `<li class='list-group-item d-flex justify-content-between'>
                    ${t.desc} <span class="${t.type === 'income' ? 'text-success' : 'text-danger'}">$${t.amount}</span>
                </li>`).join('');

            updateChart(income, expense);
        }

        function updateChart(income, expense) {
            let ctx = document.getElementById('summaryChart').getContext('2d');
            if (window.myChart) window.myChart.destroy();
            window.myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Income', 'Expense'],
                    datasets: [{
                        data: [income, expense],
                        backgroundColor: ['#28a745', '#dc3545']
                    }]
                }
            });
        }