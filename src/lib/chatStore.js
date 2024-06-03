import { getDoc, doc } from 'firebase/firestore'
import { create } from 'zustand'
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUsreBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) =>{
        const currentUser = useUserStore.getState().currentUser

        //CHECK IF CURRENT USER IS BLOCKED
        if(user.blocked.includes(currentUser.id)){
            return set({ chatId,
                user: null,
                isCurrentUsreBlocked: true,
                isReceiverBlocked: false,
            })
        }

        //CHECK IF RECEIVER USER IS BLOCKED
        else if(user.blocked.includes(user.id)){
            return set({ chatId,
                user: null,
                isCurrentUsreBlocked: false,
                isReceiverBlocked: true,})
        } else{
            return set({ 
                chatId,
                user,
                isCurrentUsreBlocked: false,
                isReceiverBlocked: false,})
        }

      
    },
    changeBlock: () =>{
        set(state=>({...state, isReceiverBlocked: !state.isCurrentUsreBlocked}))
    }
}))
