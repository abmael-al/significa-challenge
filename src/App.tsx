import { Home } from './pages/home/Home';
import { Movie } from './pages/movie/Movie'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound/NotFound'

function App() {
  return (
    <>
      <Routes>
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
