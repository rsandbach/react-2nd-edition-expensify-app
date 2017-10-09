export default (expenses) => {
    if (expenses.length === 0) return 0;
    return expenses.map((expense) => { return expense.amount }).reduce((previous, current) => previous + current, 0)
} 