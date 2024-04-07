import { useMutation, useQuery } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { getUserDetails, updateProfile } from "../service/profileService";

export const useProfile = () => {
    const {getIdToken} = useAuth();
    const data = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const token = await getIdToken();
            return await getUserDetails(token);
        }
    })
    const {mutate} = useMutation({
        mutationFn: async (body: any) => {
            const token = await getIdToken();
            return await updateProfile(token, body);
        },
        onSettled: () => {
            data.refetch();
        }
    })
    return {
        userDetails: data.data,
        isUserDetailsLoading: data.isLoading,
        updateUserDetails: mutate
    };
}