import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./Layout/topbar.tsx";
import { TopBar } from "./Layout/topbar";
import BikeListPage from "./Pages/bikesList";
import StationListPage from "./Pages/stationList";
import bicycleWallpaper from "./Resources/bikeWP.jpg";
import { AdminLoginPage } from "./Pages/adminLogin";
import { ProtectedRoute } from "./Pages/ProtectedRoute";
import { UserListPage } from "./Pages/userList";

export default function App() {
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundImage: `url(${bicycleWallpaper})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
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
