import logo from "./logo.svg";

// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //flex

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Processes from "./components/Processes";
import { FiefAuthProvider } from "@fief/fief/react";
import { Callback, RequireAuth } from "./fief";
// import Container from "react-bootstrap/Container";
import MapComponent from "./components/Map/Map";
import { PrimeReactProvider } from "primereact/api";
import Dashboard from "./components/Dashboard/Dashboard";
import { useContext, useState } from "react";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import Documentation from "./components/Documentation/Documentation";
import LocationDetail from "./components/LocationDetail/LocationDetail";
import { PrimeReactContext } from "primereact/api";

//Use in a component

// changeTheme(currentTheme: string, newTheme: string, linkElementId: string, callback: Function)

function Home() {
  return (
    <div className={"text-center"}>
      <h1>Welcome to Beaver!</h1>
      <img
        width="30%"
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/American_Beaver.jpg"
      />
      <div>
        Beaver is a data integration and discovery platform for the{" "}
        <a href={"https://newmexicowaterdata.org"}>
          New Mexico Water Data Initiative
        </a>
        .
        <br />
        <br />
        <Message
          text={"Beaver is currently in active development!!"}
          severity={"warn"}
        />
        <br />
        <br />
        <Message
          text={"Check out the Map page to explore New Mexico's water data"}
        />
        <br />
        {/*If you are interested in learning more about Beaver, please contact us at <a href="mailto:">EMAIL</a>.*/}
      </div>
      <Divider />
      <div className="surface-0 text-700 text-center">
        {/*<div className="text-blue-600 font-bold mb-3"><i className="pi pi-discord"></i>&nbsp;POWERED BY DISCORD</div>*/}
        <div className="text-900 font-bold text-5xl mb-3">
          Join Our Community
        </div>
        <div className="text-700 text-2xl mb-5">
          We are a group of Water Data Specialists trying to improve the flow of
          data from producer to consumer
        </div>
        <Button
          label="Join Now"
          icon="pi pi-slack"
          style={{ marginBottom: "10px" }}
          className="font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap"
          onClick={() =>
            window.open("https://new-mexico-water-data.slack.com", "_blank")
          }
        />
      </div>
    </div>
  );
}

function App() {
  const [helpVisible, setHelpVisible] = useState(false);

  return (
    <PrimeReactProvider>
      <FiefAuthProvider
        baseURL="https://fief.newmexicowaterdata.org"
        clientId="buShmB5KqjE5kirVSz9J2g6of5O276OhHBzUcZLpGEA"
      >
        <AppNavbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  helpVisible={helpVisible}
                  setHelpVisible={setHelpVisible}
                />
              }
            />
            <Route path="/callback" element={<Callback />} />
            <Route path="/docs" element={<Documentation />} />
            {/*<Route path='/location/:pointId' element={<RequireAuth><LocationPrivateDetail /></RequireAuth>}/>*/}
            <Route path="/location/:pointId" element={<LocationDetail />} />
            {/*<Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>}/>*/}
            {/*<Route path="/processes" element={<RequireAuth><Processes /></RequireAuth>}/>*/}

            {/*<Route path="/dashboard" element={<Dashboard auth={auth} setAuth={setAuth}/>}/>*/}
            {/*<Route path="/preferences" element={<Preferences />}/>*/}
            {/*<Route path="/admin" element={<Admin auth={auth}/>}/>*/}
            {/*<Route path="/documentation" element={<Documentation />}/>*/}
            {/*<Route path="/analytics" element={<Analytics />}/>*/}
          </Routes>
        </BrowserRouter>
        <Footer />
      </FiefAuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
