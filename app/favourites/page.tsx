import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";

import React from 'react'
import FavouritesClient from "./FavouritesClient";

const FavouritePage = async () => {
    const listings = await getFavouriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favourites found"
                    subtitle="Looks like you have no favourite listings."
                />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <FavouritesClient listings={listings} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default FavouritePage
