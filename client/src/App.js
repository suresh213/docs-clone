import './App.css';
import Editor from './Components/Editor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to={`document/${uuidV4()}`} />
        </Route>
        <Route path='/document/:id'>
          <Editor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
