import client from "../libs/prismabd"

export interface IListingParams {
    userId?: string
    guestCount?: number
    roomCount?: number
    bathroomCount?: number
    startDate?: string
    endDate?: string
    locationValue?: string
    category?: string
}

export default async function getListings(params: IListingParams) {
    try {
        const {
            userId, bathroomCount, category, endDate,
            guestCount,
            locationValue, roomCount, startDate
        } = params

        let query: any = {}

        if (userId) query.userId = userId

        if (category) query.category = category

        if (roomCount) query.roomCount = {
            gte: +roomCount
        }

        if (guestCount) query.guestCount = {
            gte: +guestCount
        }

        if (bathroomCount) query.bathroomCount = {
            gte: +bathroomCount
        }

        if(locationValue) query.locationValue = locationValue

        if(startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: {gte: startDate},
                                startDate: {lte : startDate},
                            },
                            {
                                startDate: {lte: endDate},
                                endDate: {gte: endDate}
                            }
                        ]
                    }
                }
            }
        }

        const listing = await client.listing.findMany({
            where: query,
            orderBy: {
                createdAt: "desc"
            }
        })

        const safeListings = listing.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListings
    } catch (err: any) {
        throw new Error(err)
    }
}