import { Search } from './pages/search/Search';
import { Movie } from './pages/movie/Movie'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { NotFound } from './pages/notfound/NotFound'
import { Entertainment } from './proxies/config';
import { useCallback } from 'react';

/* TODO [GLOBAL]: Persist the entertaiments added to favorites. */
/* TODO [GLOBAL]: Create the header component. */

export const ROUTE_PATHS = {
  movie: '/movie/:id'
}

export const navigateTo = {
  entertainmentDetails: (id: string, type: Entertainment) => `${ROUTE_PATHS[type as 'movie']}`.replace(':id', id),
}

function App() {
  const navigate = useNavigate();
  
  const handleOnRedirectRequestToDetails = useCallback(
    ({ target }: React.MouseEvent) => {
      if(!(target instanceof HTMLElement)) return;

      const id = target.getAttribute('data-entertainment-id');
      const type = target.getAttribute('data-entertainment-type') as Entertainment;

      if(!id || !type) return;

      navigate(navigateTo.entertainmentDetails(id, type));
    }, [navigate]
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

export default App
