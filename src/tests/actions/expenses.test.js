import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
    startAddExpense,
    addExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach(() => {
    const expenseData = {}

    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt }
    })

    return database.ref('expenses')
        .set(expenseData)
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should remove expense from firebase', () => {
    const store = createMockStore({})
    const id = expenses[2].id

    return store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions()

        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id            
        })

        return database.ref(`expenses/${id}`).once('value')
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy()
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    })
})

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', () => {
    const store = createMockStore({})
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }

    return store.dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })

            return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData)
        })
})

test('should add expense with defaults to database and store', () => {
    const store = createMockStore({})
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    return store.dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions()

            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            })

            return database.ref(`expenses/${actions[0].expense.id}`).once('value')
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults)
        })
})

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses: expenses
    })
})

test('should fetch the expenses from firebase', () => {
    const store = createMockStore({})
    return store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
    })
})