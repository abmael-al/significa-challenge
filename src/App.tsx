import { Search, Movie, PageNotFound } from './pages';
import { Entertainment } from './proxies';
import { Header } from './layout';

import { Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import './assets/styles/globals.css';

export const ENTERTAINMENT_BOOKMARK_KEY = 'ent_bookmark'; 
export const ENTERTAINMENT_TYPE: Entertainment = 'movie';
export const ROUTE_PATHS = {
  movie: '/movie/:movie_id'
}

export const navigateTo = {
  details(movieId: string, type: Entertainment) {
    return `${ROUTE_PATHS[type as 'movie']}`.replace(':movie_id', movieId)
  },
}

export function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<Header />}>
        <Route path='/' element={<Search />}/>

        <Route  path='/movie'>
          <Route path=':movie_id' element={<Movie />}/>
        </Route>
        
        <Route path='*' element={<PageNotFound />} />
      </Route>
    </Routes>  
  )
}
