import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectTotalExpenses from '../selectors/expenses-total'

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => (
    <div>
        <h1>Viewing {expenseCount} {expenseCount > 1 ? 'expenses' : 'expense'} totalling {numeral(expenseTotal / 100.0).format('$0,0.00')}</h1>
    </div>
)

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters)
    return {
        expenseCount: visibleExpenses.length,
        expenseTotal: selectTotalExpenses(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)