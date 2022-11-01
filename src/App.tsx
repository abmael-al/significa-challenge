import { Routes, Route, useLocation } from 'react-router-dom';

import { Search, Movie, NotFound } from './pages';
import { Header } from './layout';
import { Entertainment } from './proxies';

import './assets/styles/globals.css';
import { useLayoutEffect } from 'react';

export const ENTERTAINMENT_BOOKMARK_KEY = 'ent_bookmark'; 
export const ENTERTAINMENT_TYPE: Entertainment = 'movie';
export const ROUTE_PATHS = {
  movie: '/movie/:id'
}

export const navigateTo = {
  details: (id: string, type: Entertainment) => `${ROUTE_PATHS[type as 'movie']}`.replace(':id', id),
}

export function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <Routes>
      <Route element={<Header />}>
        <Route path='/' element={<Search />}/>

        <Route  path='/movie'>
          <Route path=':id' element={<Movie />}/>
        </Route>
        
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>  
  )
}
