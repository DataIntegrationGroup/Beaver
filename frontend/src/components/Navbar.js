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
    fiefAuth.redirectToLogin(
      `${window.location.protocol}//${window.location.host}/callback`,
    );
  }, [fiefAuth]);

  const logout = useCallback(() => {
    fiefAuth.logout(`${window.location.protocol}//${window.location.host}`);
  }, [fiefAuth]);
  // return (<Button  onClick={()=> setHelpVisible(true)} severity="help" label={"Help"}/>)
  const brand = (
    <a href={"http://newmexicowaterdata.org"}>
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
  const [checked, setChecked] = useState(false);
  let [loginlabel, onClick] =
    isAuthenticated && userinfo ? ["Logout", logout] : ["Login", login];

  const makeTheme = (theme) => {
    return `themes/${theme}/theme.css`;
  };

  let loginout_div = (
    <div>
      {/*<Button*/}
      {/*  label={"Help"}*/}
      {/*  onClick={() => setHelpVisible(true)}*/}
      {/*  severity={"help"}*/}
      {/*  icon={"pi pi-fw pi-question"}*/}
      {/*/>*/}
      <InputSwitch
        checked={checked}
        onChange={(e) => {
          // let [currentTheme, newTheme] = e.value? ['soho-light', 'soho-dark'] : ['soho-dark', 'soho-light']
          let [currentTheme, newTheme] = e.value
            ? ["bootstrap4-light-blue", "bootstrap4-dark-blue"]
            : ["bootstrap4-dark-blue", "bootstrap4-light-blue"];
          changeTheme(
            makeTheme(currentTheme),
            makeTheme(newTheme),
            "theme-link",
          );
          setChecked(e.value);
        }}
      ></InputSwitch>
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
