import { Route, Switch } from 'react-router-dom';
import About from '../pages/about/about';
import HomePage from '../pages/homepage/homepage';
import Login from '../pages/login/login';
import Onboarding from '../pages/onboarding/onboard';
// import Profile from '../pages/profile/'
import Result from '../pages/result/result';
import { ABOUT_PAGE_ROUTE, HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, ONBOARDING_PAGE_ROUTE, PROFILE_PAGE_ROUTE, RESULT_PAGE_ROUTE, TERMS_PAGE_ROUTE } from './route-paths';

function Routes(){
    return(
        <Switch>

        <Route path={ABOUT_PAGE_ROUTE}>
          <About />
        </Route>


        <Route path={LOGIN_PAGE_ROUTE}>
          <Login />
        </Route>


        <Route path={ONBOARDING_PAGE_ROUTE}>
          <Onboarding />
        </Route>


        <Route path={RESULT_PAGE_ROUTE}>
          <Result />
        </Route>


        <Route path={PROFILE_PAGE_ROUTE}>

        </Route>


        <Route path={TERMS_PAGE_ROUTE}>

        </Route>


        <Route path={HOME_PAGE_ROUTE}>
          <HomePage />
        </Route>

      </Switch>
    );
}

export default Routes;