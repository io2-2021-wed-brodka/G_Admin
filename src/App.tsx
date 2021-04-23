import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./Layout/topbar.tsx";
import { TopBar } from "./Layout/topbar";
import BikeListPage from "./bikesList";
import StationListPage from "./stationList";
import bicycleWallpaper from "./Resources/bikeWP.jpg";
import { AdminLoginPage } from "./adminLogin";
import { ProtectedRoute } from "./ProtectedRoute";

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
            <Route path="/login">
              <AdminLoginPage />
            </Route>
            <Route path="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
