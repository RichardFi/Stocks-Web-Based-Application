import React from "react";
import "./styles.css";
import Admin from './pages/admin';
import { BrowserRouter, Route} from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Route path='/' component={Admin}></Route>
        </BrowserRouter>
    </div>
  );
}
