import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Processes from "./components/Processes";
import {FiefAuthProvider} from "@fief/fief/react";
import {Callback, RequireAuth} from "./fief";
import Container from "react-bootstrap/Container";
import MapComponent from "./components/Map/Map";

function Home() {
    return (
        <Container>
            <div className={'text-center'}>
                <h1>Welcome to Beaver!</h1>
                <p>
                    Beaver is a data integration and discovery platform for the New Mexico Water Data Initiative.
                    <br/>
                    <br/>
                    Beaver is currently in active development!!
                    <br/>
                    <br/>
                    If you are interested in learning more about Beaver, please contact us at <a href="mailto:">EMAIL</a>.
                </p>
            </div>
            <MapComponent/>
        </Container>
    );
}
function App() {
  return (
      <FiefAuthProvider
          baseURL="https://fief.newmexicowaterdata.org/beaver"
          clientId='M28sGi4ipk-tO-_HILFSMC-ENXk_VbDuinCgAgVKsow'
      >
          <div className="wrapper">
            <AppNavbar />
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/callback" element={<Callback />} />
                  {/*<Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>}/>*/}
                  <Route path="/processes" element={<RequireAuth><Processes /></RequireAuth>}/>

                {/*<Route path="/dashboard" element={<Dashboard auth={auth} setAuth={setAuth}/>}/>*/}
                {/*<Route path="/preferences" element={<Preferences />}/>*/}
                {/*<Route path="/admin" element={<Admin auth={auth}/>}/>*/}
                {/*<Route path="/documentation" element={<Documentation />}/>*/}
                {/*<Route path="/analytics" element={<Analytics />}/>*/}
              </Routes>
            </BrowserRouter>
            <Footer />
          </div>
      </FiefAuthProvider>
  );
}

export default App;
