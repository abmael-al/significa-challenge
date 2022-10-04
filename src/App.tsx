import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCallback } from 'react';

import { Search, Movie, NotFound } from './pages';
import { Entertainment } from './proxies';

/* TODO [GLOBAL]: Persist the entertaiments added to favorites. */
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
  
  const handleOnRedirectRequestToDetails = useCallback(
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
          <Route path='/' element={
            <Search 
              onRedirectRequestToDetails={handleOnRedirectRequestToDetails} 
            />
          }/>

          <Route  path='/movie'>
            <Route path=':id' element={
              <Movie 
                onBackToSearchScreen={handleOnBackToSearchScreen} 
              />
            }/>
          </Route>
          
          <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
