import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./Layout/topbar.tsx";
import { TopBar } from "./Layout/topbar";
import BikeListPage from "./Pages/bikesList";
import StationListPage from "./Pages/stationList";
import { AdminLoginPage } from "./Pages/adminLogin";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { UserListPage } from "./Pages/userList";
import { useStyles } from "./Styles/style"
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.webpageStyle}>
      <Router>
        <div>
          <TopBar />
          <Switch>
            <ProtectedRoute path="/bikes">
              <BikeListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/stations">
              <StationListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/users">
              <UserListPage />
            </ProtectedRoute>
            <ProtectedRoute path="/techs">
              <UserListPage />
            </ProtectedRoute>
            <Route path="/login">
              <AdminLoginPage />
            </Route>
            <Route path="/"></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
