import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import './App.css';
import './Layout/topbar.tsx';
import {TopBar} from './Layout/topbar';
import BikeListPage from './bikesList';
import StationListPage from './stationList';

export default function App() {
    return (
        <div className="App" style={{height: "100vh", display: "flex", flexDirection: "column", width: '100%'}}>
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
                    </Switch>
                </div>
            </Router>
        </div>
    );
}