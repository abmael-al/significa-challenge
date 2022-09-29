import { Home } from './pages/home/Home';
import { Movie } from './pages/movie/Movie'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound/NotFound'

/* TODO [GLOBAL]: Persist the entertaiments added to favorites. */
/* TODO [GLOBAL]: Create the header component. */
/* TODO [GLOBAL]: Refactor routes path sharing. */
/* TODO [GLOBAL]: Implement the useEventListener custom hook. */

function App() {
  return (
    <>
      <Routes>
          {/* TODO: Refactor the roth path (search) so that the last
            search is saved in the url's navigation history.
          . */}
          <Route path='/' element={<Home />} />
          
          <Route  path='/movie' >
            <Route path=':id' element={<Movie />} />
          </Route>
          
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
