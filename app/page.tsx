import React from 'react'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import getListings, { IListingParams } from './actions/getListing'
import ListingCard from './components/listings/ListingCard'
import getCurrentUser from './actions/getCurrentUser'

interface HomeProps {
  searchParams: IListingParams
}

const Home = async ({searchParams}: HomeProps) => {
  const isEmpty = true
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) return (
    <ClientOnly>
      <EmptyState showReset />
    </ClientOnly>
  )

  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((item) => {
            return (
              <ListingCard
                key={item.id}
                data={item}
                currentUser={currentUser}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home

