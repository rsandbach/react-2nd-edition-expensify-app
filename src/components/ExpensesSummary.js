import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectTotalExpenses from '../selectors/expenses-total'

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => (
    <div>
        <p>Viewing {expenseCount} {expenseCount > 1 ? 'expenses' : 'expense'} totalling {numeral(expenseTotal / 100.0).format('$0,0.00')}</p>
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenseCount: selectExpenses(state.expenses, state.filters).length,
        expenseTotal: selectTotalExpenses(state.expenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary)