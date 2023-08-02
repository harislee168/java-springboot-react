import React from 'react'
import ExploreTopBook from './components/ExploreTopBook'
import Carousel from './components/Carousel'
import Heros from './components/Heros'
import LibraryServices from './components/LibraryServices'

const HomePage = () => {
  return (
    <React.Fragment>
      <ExploreTopBook />
      <Carousel />
      <Heros />
      <LibraryServices />
    </React.Fragment>
  )
}

export default HomePage
