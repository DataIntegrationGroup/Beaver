import { Button } from "primereact/button";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import "./Navbar.css";
import {
  useFiefAuth,
  useFiefIsAuthenticated,
  useFiefUserinfo,
} from "@fief/fief/react";
import { useCallback, useContext, useState } from "react";
// import {Button} from "react-bootstrap";
import user_logo from "../img/icon/user.png";
import nmwdi_logo from "../img/nmwdi_logo11-23.png";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";
import { InputSwitch } from "primereact/inputswitch";
import { PrimeReactContext } from "primereact/api";

function AppNavbar() {
  const fiefAuth = useFiefAuth();
  const isAuthenticated = useFiefIsAuthenticated();
  const userinfo = useFiefUserinfo();

  const login = useCallback(() => {
    try {
      fiefAuth.redirectToLogin(
        `${window.location.protocol}//${window.location.host}/callback`,
      );
    } catch (error) {
      console.log("login error", error);
      logout();
    }
  }, [fiefAuth]);

  const logout = useCallback(() => {
    fiefAuth.logout(`${window.location.protocol}//${window.location.host}`);
  }, [fiefAuth]);
  // return (<Button  onClick={()=> setHelpVisible(true)} severity="help" label={"Help"}/>)
  const brand = (
    <a href={"https://newmexicowaterdata.org"}>
      <img src={nmwdi_logo} height="80px" />
    </a>
  );
  const home = {
    label: "Home",
    icon: "pi pi-fw pi-home",
    command: () => {
      window.location.href = "/";
    },
  };
  const dashboard = {
    label: "Map",
    icon: "pi pi-fw pi-map",
    command: () => {
      window.location.href = "/dashboard";
    },
  };
  const documentation = {
    label: "Docs",
    icon: "pi pi-fw pi-question-circle",
    command: () => {
      window.location.href = "/docs";
    },
  };

  const { changeTheme } = useContext(PrimeReactContext);
  const [darkMode, setDarkMode] = useState(false);
  let [loginlabel, onClick] =
    isAuthenticated && userinfo ? ["Logout", logout] : ["Login", login];

  const makeTheme = (theme) => {
    return `themes/${theme}/theme.css`;
  };
  const [iconClassName, setIconClassName] = useState("pi-sun");

  let loginout_div = (
    <div>
      <Button
        onClick={(e) => {
          let [currentTheme, newTheme] = darkMode
            ? ["bootstrap4-dark-blue", "bootstrap4-light-blue"]
            : ["bootstrap4-light-blue", "bootstrap4-dark-blue"];
          changeTheme(
            makeTheme(currentTheme),
            makeTheme(newTheme),
            "theme-link",
          );
          setDarkMode((prevDarkMode) => !prevDarkMode);
          setIconClassName((prevClasName) =>
            prevClasName === "pi-moon" ? "pi-sun" : "pi-moon",
          );
        }}
      >
        <i className={`dark:text-white pi ${iconClassName}`} />
      </Button>
      {/*</button>*/}
      <span style={{ padding: "10px" }}></span>

      {isAuthenticated && userinfo ? (
        <Avatar
          label={userinfo?.email.substring(0, 1).toUpperCase()}
          className="mr-2"
          size="large"
        ></Avatar>
      ) : (
        ""
      )}
      <Button label={loginlabel} onClick={onClick} icon={"pi pi-fw pi-user"} />
    </div>
  );

  const items = [home, dashboard, documentation];
  return <Menubar model={items} start={brand} end={loginout_div} />;
}

export default AppNavbar;
