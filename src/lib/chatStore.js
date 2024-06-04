import { getDoc, doc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: async (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;

        // Get user data to check block status
        const userDoc = await getDoc(doc(db, 'users', user.id));
        const userData = userDoc.data();

        if (userData.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        // Get current user data to check block status
        const currentUserDoc = await getDoc(doc(db, 'users', currentUser.id));
        const currentUserData = currentUserDoc.data();

        if (currentUserData.blocked.includes(user.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        }

        return set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false,
        });
    },
    changeBlock: () => {
        set((state) => ({
            ...state,
            isReceiverBlocked: !state.isReceiverBlocked,
        }));
    },
}));
