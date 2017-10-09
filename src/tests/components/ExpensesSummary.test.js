import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import expenses from '../fixtures/expenses'

test('should render ExpenseSummary correctly for one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={100} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseSummary correctly for two expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={2} expenseTotal={1100} />)
    expect(wrapper).toMatchSnapshot()
})