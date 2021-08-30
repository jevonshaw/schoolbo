import './App.css';
import Login from './login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardPage from './DataDisplayPages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={DashboardPage} />
    </BrowserRouter>
  );
}

export default App;
