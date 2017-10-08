import React from 'react'
import { shallow } from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />)
    expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[2]} />)
    expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('form').simulate('submit', { preventDefault: () => { } })
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = 'Water Bill Description'
    wrapper.find('input').at(0).simulate('change', { target: { value } })
    expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = 'Water Bill Note'
    wrapper.find('textarea').simulate('change', { target: { value } })
    expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = '23.50'
    wrapper.find('input').at(1).simulate('change', { target: { value } })
    expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid input', () => {
    const wrapper = shallow(<ExpenseForm />)
    const value = '12.122'
    wrapper.find('input').at(1).simulate('change', { target: { value } })
    expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid from submission', () => {
    const onSubmitSpy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
    wrapper.find('form').simulate('submit', { preventDefault: () => { } })
    expect(wrapper.state('error')).toBe('')
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        "amount": expenses[0].amount,
        "createdAt": expenses[0].createdAt,
        "description": expenses[0].description,
        "note": expenses[0].note
    })
})

test('should set new date on date change', () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
    expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />)
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
    expect(wrapper.state('calendarFocused')).toEqual(focused)
})