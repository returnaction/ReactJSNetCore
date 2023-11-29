import "./App.css";
import { Home } from "./Home";
import { Department } from "./Department";
import { Employee } from "./Employee";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          c#, .NET, SQL, React.js, Postman, Bootstrap
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item- m-1">
              <NavLink className="btn btn-light btn-outline-success" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-success"
                to="/department"
              >
                Department
              </NavLink>
            </li>
            <li className="nav-item- m-1">
              <NavLink
                className="btn btn-light btn-outline-success"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/department" Component={Department} />
          <Route path="/employee" Component={Employee} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// test
