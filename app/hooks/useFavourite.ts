import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {toast} from "react-hot-toast"
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavourite {
    listingId: string
    currentUser? : SafeUser | null
}

const useFavourite = ({listingId, currentUser}: IUseFavourite) => {
    const router = useRouter()
    const loginModal = useLoginModal();

    const hasFavourite = useMemo(() => {
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId)
    }, [currentUser?.favouriteIds, listingId])

    const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser) return loginModal.onOpen();

        try {
            let request;

            if(hasFavourite) {
                request = () => axios.delete(`/api/favourites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            await request();

            router.refresh();
            toast.success("Success")

        } catch(err) {
            toast.error("Something went wrong")
        }
    } , [currentUser, hasFavourite, listingId, loginModal, router])

    return {hasFavourite, toggleFavourite}
}

export default useFavourite
