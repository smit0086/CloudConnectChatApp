import { useMutation, useQuery } from "@tanstack/react-query"
import { addFriend, getFriends } from "../service/friendsService"
import { useAuth } from "./useAuth";

interface Friend {
    avatarURL: string;
    name: string;
    email: string;
    sub: string;
    lastMessageDetails?: {
        id: string;
        message: string;
        sentAt: string;
        sender: string;
    }
}
export const useFriends = (addFriendCallback) => {

    const {getIdToken} = useAuth();

    const fetchFriends = async () => {
        const token = await getIdToken();
        const response = await getFriends(token);
        return response;
    }
    
    const query = useQuery({
        queryKey: ['friends'],
        queryFn: fetchFriends
    })

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (email: string) => {
            const token = await getIdToken();
            return await addFriend(email, token);
        },
        onSettled: () => {
            query.refetch();
        },
        onError: (error) => {
            addFriendCallback(false, error);
        },
        onSuccess: () => {
            addFriendCallback(true, null);
        }
    })
    
    let friends: Friend[] = [];
    if(query.data) {
        friends = Object.entries(query.data).map(([, value]) => {
            return {
                avatarURL: value.avatarURL,
                ...value.attr,
                lastMessageDetails: value.last_message_details
            }
        });
    }

    friends = friends.sort((a, b) => {
        if(a.lastMessageDetails && b.lastMessageDetails) {
            return new Date(b.lastMessageDetails.sentAt).getTime() - new Date(a.lastMessageDetails.sentAt).getTime();
        }
        return 0;
    });

    return {
        friends,
        friendsMap: query.data,
        areFriendsLoading: query.isLoading,
        addFriend: mutateAsync,
        isFriendAdding: isPending
    }
}