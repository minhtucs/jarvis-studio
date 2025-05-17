'use client';

import { Conversation } from "../model/conversation";
import React, { createContext, useReducer } from "react";
import { Message } from "../model/message";
import { ConversationService } from "../services/conversation-services";
import { MessageService } from "../services/message-service";

type ConversationsState = {
  conversationList: Conversation[];
  conversationActive: Conversation;
}

type ConversationAction = 
  | { type: "ACTIVE_CONVERSATION_CHANGED"; conversation: Conversation }
  | { type: "NEW_CONVERSATION"; conversation: Conversation }
  | { type: "CONVERSATION_CHANGED"; conversation: Conversation }
  | { type: "NEW_USER_MESSAGE"; message: Message }
  | { type: "LLM_RESPONSE_MESSAGE"; message: Message }

const conversationService = new ConversationService();
const messageService = new MessageService();

const initialConversations = await conversationService.getConversations() || [];

let conversationActive = null;
if (initialConversations.length > 0) {
  conversationActive = initialConversations[0];
  conversationActive.messages = await messageService.getLatestMessages(conversationActive.id);
} else {
  conversationActive = conversationService.newDraftConversation();
  initialConversations.push(conversationActive);
}

const initialConversationsState: ConversationsState = {
  conversationList: initialConversations,
  conversationActive: conversationActive
}

function conversationsReducer(state: ConversationsState, action: ConversationAction) {
  switch (action.type) {
    case 'ACTIVE_CONVERSATION_CHANGED':
      return {
        ...state,
        conversationActive: action.conversation
      };
    case 'NEW_CONVERSATION':
      return {
        ...state,
        conversationList: [action.conversation, ...state.conversationList],
        conversationActive: action.conversation
      };
    case 'CONVERSATION_CHANGED':
      return {
        ...state,
        conversationList: state.conversationList.map(conv => 
          conv.id === action.conversation.id ? action.conversation : conv
        )
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
