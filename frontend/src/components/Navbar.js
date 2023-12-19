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
import { useCallback } from "react";
// import {Button} from "react-bootstrap";
import user_logo from "../img/icon/user.png";
import nmwdi_logo from "../img/nmwdi_logo11-23.png";
import { Menubar } from "primereact/menubar";
import { Avatar } from "primereact/avatar";

function AppNavbar({ setHelpVisible }) {
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
  const brand = <img src={nmwdi_logo} height="80px" />;
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

  let loginlabel;
  let onClick;
  if (isAuthenticated && userinfo) {
    loginlabel = "Logout";
    // loginout = <Button label={"Logout"} onClick={() => logout()} />;
    onClick = logout;
  } else {
    loginlabel = "Login";
    onClick = login;
  }

  let loginout_div = (
    <div>
      {/*<Button*/}
      {/*  label={"Help"}*/}
      {/*  onClick={() => setHelpVisible(true)}*/}
      {/*  severity={"help"}*/}
      {/*  icon={"pi pi-fw pi-question"}*/}
      {/*/>*/}
      <Avatar
        label={userinfo.fields.username.substring(0, 1).toUpperCase()}
        className="mr-2"
        size="large"
        // shape="circle"
      ></Avatar>
      <Button label={loginlabel} onClick={onClick} icon={"pi pi-fw pi-user"} />
    </div>
  );

  const items = [home, dashboard, documentation];
  console.log("items", items);
  return <Menubar model={items} start={brand} end={loginout_div} />;
}

export default AppNavbar;
