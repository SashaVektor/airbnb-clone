import { NextResponse } from "next/server";
import client from "@/app/libs/prismabd";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) return NextResponse.error();

    const body = await req.json();

    const {listingId, startDate, endDate, totalPrice} = body

    if(!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservation = await client.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate, 
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation)
}