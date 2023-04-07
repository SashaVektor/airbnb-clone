"use client"
import React, { useCallback, useState } from 'react'
import { SafeListings, SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface PropertiesClientProps {
    listings: SafeListings[]
    currentUser: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings, currentUser
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string>("")

    const onCansel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success("Listing deleted")
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.respone?.data?.error)
        })
        .finally(() => {
            setDeletingId("")
        })

    }, [router])

    return (
        <Container>
            <Heading
                title='Properties'
                subtitle="List of your properties"
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {listings.map((listing) => (
                    <ListingCard 
                   key={listing.id}
                   data={listing}
                   actionId={listing.id}
                   onAction={onCansel}
                   disabled={deletingId === listing.id}
                   currentUser={currentUser}
                   actionLabel='Delete property'
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient
