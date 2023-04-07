import client from "../libs/prismabd";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) return []

        const favourites = await client.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        })

        const safeFavourites = favourites.map((fav) => ({
            ...fav,
            createdAt: fav.createdAt.toISOString()
        }))

        return safeFavourites
    } catch (err: any) {
        throw new Error(err)
    }
}