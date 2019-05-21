import React from 'react';
import ContactList from './components/contacts/ContactList';
import ContactAdd from './components/contacts/ContactAdd';
import ContactUpdate from './components/contacts/ContactUpdate';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
    const routes =
        <>
        <Route path="/contact/list" component={ContactList} />
        <Route path="/contact/add" component={ContactAdd} />
        <Route path="/contact/update/:id" component={ContactUpdate} />
        </>;

  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/contact/list">List</Link>
                      </li>
                      <li>
                          <Link to="/contact/add">Add</Link>
                      </li>
                  </ul>
              </nav>
              {routes}
          </div>
      </Router>
  );
}

export default App;
