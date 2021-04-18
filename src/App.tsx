import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import './App.css';
  import './Layout/topbar.tsx';
  import { TopBar } from './Layout/topbar';
  import BikeListPage from './bikesList';
  import StationListPage from './stationList'
  import bicycleWallpaper from './Resources/bikeWP.jpg';
  import { RegisterLoginPage } from "./registerLogin";
  
  export default function App() {
    return (
        <div className="App" style={{height: "100vh", display: "flex", flexDirection: "column", width: '100%', 
        backgroundImage:`url(${bicycleWallpaper})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <Router>
                <div>
                    <TopBar/>
                    <Switch>
                        <Route path="/bikes">
                            <BikeListPage/>
                        </Route>
                        <Route path="/stations">
                            <StationListPage/>
                        </Route>
                        <Route path="/register">
                            <RegisterLoginPage/>
                        </Route>
                        <Route path="/login">
                            <RegisterLoginPage/>
                        </Route>
                        <Route path="/">
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
  }