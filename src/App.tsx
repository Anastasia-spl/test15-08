import { Switch, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAppSelector } from './redux/hooks';
import { tableSelectors } from './redux/table';
import routes from './routes';
import Loader from './components/Loader';
const TablePage = lazy(() => import('./pages/TablePage' /* webpackChunkName: "table-page" */));
const Page404 = lazy(() => import('./pages/Page404' /* webpackChunkName: "404-page" */))

function App() {
  const isLoading = useAppSelector(tableSelectors.getLoader);

  return (
    <div className="App">
      <Suspense fallback={Loader}>
          {isLoading ? <Loader /> : 
          <Switch>
              <Route path={routes.TablePage} exact>
                <TablePage />
              </Route>
              <Route component={Page404} />
          </Switch>
          }
      </Suspense>
    </div>
  );
}

export default App;
