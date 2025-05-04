'use client';

import { Conversation } from "../model/conversation";
import React, { createContext, useReducer } from "react";
import { listConversations } from "../services/conversation-services";
import { Message } from "../model/message";

type ConversationsState = {
  conversationList: Conversation[];
  conversationActive: Conversation | null;
}

type ConversationAction = 
  | { type: "SET_CONVERSATION_ACTIVE"; conversation: Conversation }
  | { type: "ADD_CONVERSATION"; conversation: Conversation }
  | { type: "NEW_USER_MESSAGE"; message: Message }
  | { type: "LLM_RESPONSE_MESSAGE"; message: Message }

const initialConversations = listConversations() ?? []; // async ???

const initialConversationsState: ConversationsState = {
  conversationList: initialConversations,
  conversationActive: initialConversations[0] ?? null
}

function conversationsReducer(state: ConversationsState, action: ConversationAction) {
  switch (action.type) {
    case 'SET_CONVERSATION_ACTIVE':
      return {
        ...state,
        conversationActive: action.conversation
      };
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversationList: [action.conversation, ...state.conversationList],
        conversationActive: action.conversation
      };
    case 'NEW_USER_MESSAGE': 
    case 'LLM_RESPONSE_MESSAGE':
      const updatedActive = {
        ...state.conversationActive,
        messages: [action.message, ...(state.conversationActive?.messages ?? [])]
      };
      return {
        ...state,
        conversationActive: updatedActive,
        conversationList: state.conversationList.map(conv => 
          conv.id === state.conversationActive?.id ? updatedActive : conv
        )
      };
    default:
      return state;
  }
}

export const ConversationsContext = createContext<ConversationsState>(initialConversationsState);
export const ConversationsDispatchContext = createContext<React.Dispatch<ConversationAction>>(
  () => { throw new Error("ConversationsDispatchContext must be used within a ConversationsProvider"); }
);

export function ConversationsProvider({ children }: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(conversationsReducer, initialConversationsState);

  return (
    <ConversationsContext.Provider value={state}>
      <ConversationsDispatchContext.Provider value={dispatch}>
        {children}
      </ConversationsDispatchContext.Provider>
    </ConversationsContext.Provider>
  )
}
