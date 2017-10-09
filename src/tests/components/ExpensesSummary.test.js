import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'
import expenses from '../fixtures/expenses'

test('should render ExpenseSummary correctly', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={0} expenseTotal={0} />)
    expect(wrapper).toMatchSnapshot()
})