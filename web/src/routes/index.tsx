import { Switch, Route } from 'react-router-dom';

import RegisterForm from '../pages/RegisterForm';
import RegisterList from '../pages/RegisterList';
import RegisterFormEdit from '../pages/RegisterFormEdit';

export default function Routes() {
  return (
    <Switch>
      <Route component={RegisterList} path="/" exact />
      <Route component={RegisterForm} path="/create-enroll" />
      <Route component={RegisterFormEdit} path="/edit-enroll/:id" />
    </Switch>
  )
}