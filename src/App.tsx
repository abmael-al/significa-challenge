import { Search } from './pages/search/Search';
import { Movie } from './pages/movie/Movie'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound/NotFound'
import { EntertainmentType } from './proxies/config';

/* TODO [GLOBAL]: Persist the entertaiments added to favorites. */
/* TODO [GLOBAL]: Create the header component. */

export const ROUTE_PATHS = {
  movie: '/movie/:id'
}

export const navigateTo = {
  entertainmentDetails: (id: string, type: EntertainmentType) => `${ROUTE_PATHS[type as 'movie']}`.replace(':id', id),
}

function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Search />} />

          <Route  path='/movie' >
            <Route path=':id' element={<Movie />} />
          </Route>
          
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
