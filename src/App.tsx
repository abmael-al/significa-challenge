import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCallback } from 'react';

import { Search, Movie, NotFound } from './pages';
import { Header } from './layout';
import { Entertainment } from './proxies';

/* TODO [GLOBAL]: Create the header component. */

export const ENTERTAINMENT_BOOKMARK_KEY = 'ent_bookmark'; 

export const ROUTE_PATHS = {
  movie: '/movie/:id'
}

export const navigateTo = {
  entertainmentDetails: (id: string, type: Entertainment) => `${ROUTE_PATHS[type as 'movie']}`.replace(':id', id),
}

export function App() {
  const navigate = useNavigate();
  
  const handleOnRedirectToDetails = useCallback(
    ({ target }: React.MouseEvent) => {
      if(!(target instanceof HTMLElement)) return;

      const id = target.getAttribute('data-entertainment-id');
      const type = target.getAttribute('data-entertainment-type') as Entertainment;

      if(!id || !type) return;

      navigate(navigateTo.entertainmentDetails(id, type));
    }, 
    [navigate]
  );

  const handleOnBackToSearchScreen = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      <Routes>
          <Route element={<Header />}>
            <Route path='/' element={
              <Search 
                handleOnRedirectToDetails={handleOnRedirectToDetails} 
              />
            }/>

            <Route  path='/movie'>
              <Route path=':id' element={
                <Movie 
                  handleOnBackToSearchScreen={handleOnBackToSearchScreen} 
                />
              }/>
            </Route>
            
            <Route path='*' element={<NotFound />} />
          </Route>
      </Routes>
    </>
  )
}
