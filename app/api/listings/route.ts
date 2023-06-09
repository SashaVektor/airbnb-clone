import { NextResponse } from "next/server";
import client from "@/app/libs/prismabd";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.error();

    const body = await req.json();
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

    Object.keys(body).forEach((value: any) => {
        if(!body[value]) {
        NextResponse.error();
        }
    })

    const listing = await client.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
            guestCount,
        }
    })

    return NextResponse.json(listing)
}