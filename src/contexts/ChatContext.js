import React, { useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext } from './AuthContext';

export const ChatContext = React.createContext();


export function ChatContextProvider({ children }) {
    const { currentUser } = useContext(AuthContext);

    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.email > action.payload.uid ? currentUser.email + action.payload.uid : action.payload.uid + currentUser.email,
                }

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}