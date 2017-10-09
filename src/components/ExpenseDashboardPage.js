import React from 'react'
import ExpenseList from '../components/ExpenseList'
import ExpenseListFilters from '../components/ExpenseListFilters'
import ExpensesSummary from '../components/ExpensesSummary'

const ExpenseDashboardPage = () => (
    <div>
        <ExpenseListFilters />
        <ExpensesSummary />
        <ExpenseList />
    </div>
)

export default ExpenseDashboardPage