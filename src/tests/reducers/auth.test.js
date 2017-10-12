import React from 'react'

import authReducer from '../../reducers/auth'

test('should set uid for login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'TestUserId'
    }
    const state = authReducer(undefined, action)

    expect(state.uid).toEqual(action.uid);
})

test('should clear uid for logout', () => {
    var uid = 'TestUserId'
    var state = authReducer({ uid }, { type: 'LOGOUT' })

    expect(state).toEqual({});
})