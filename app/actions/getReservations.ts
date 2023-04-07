import client from "../libs/prismabd";

interface IParams {
    listingId?: string
    userId?: string
    authorId?: string
}

export default async function getReservations(params: IParams) {
    try {
        const { listingId, authorId, userId } = params

        const query: any = {}
        if (listingId) {
            query.listingId = listingId
        }

        if (userId) {
            query.userId = userId
        }

        if (authorId) {
            query.listing = { userId: authorId }
        }

        const reservations = await client.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        const safeReservations = reservations.map((reserve) => ({
            ...reserve,
            createdAt: reserve.createdAt.toISOString(),
            startDate: reserve.startDate.toISOString(),
            endDate: reserve.endDate.toISOString(),
            listing: {
                ...reserve.listing,
                createdAt: reserve.listing.createdAt.toISOString()
            }
        }))

        return safeReservations
    } catch(err: any) {
        throw new Error(err)
    } 
}