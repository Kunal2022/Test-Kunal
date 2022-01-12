import React from "react";
import Create from "./page/profile/Create";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Edit from "./page/profile/Edit";
import View from "./page/profile/View";
import Notfound from "./page/Notfound";

function RequireProfile({ children, redirectTo }) {
  let isProfile = localStorage.getItem("profile");
  return !isProfile ? children : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequireProfile redirectTo="/view-profile">
              <Create />
            </RequireProfile>
          }
        />
        <Route exact path="/edit-profile" element={<Edit />} />
        <Route exact path="/view-profile" element={<View />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}
export default App;
