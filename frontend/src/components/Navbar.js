import {Button} from "primereact/button";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css'
import {useFiefAuth, useFiefIsAuthenticated, useFiefUserinfo} from "@fief/fief/react";
import {useCallback} from "react";
// import {Button} from "react-bootstrap";
import user_logo from "../img/icon/user.png";
import nmwdi_logo from "../img/nmwdi_logo11-23.png";
import {Menubar} from "primereact/menubar";

function AppNavbar({setHelpVisible}) {
    const fiefAuth = useFiefAuth();
    const isAuthenticated = useFiefIsAuthenticated();
    const userinfo = useFiefUserinfo();

    const login = useCallback(() => {
        fiefAuth.redirectToLogin(`${window.location.protocol}//${window.location.host}/callback`);
    }, [fiefAuth]);

    const logout = useCallback(() => {
        fiefAuth.logout(`${window.location.protocol}//${window.location.host}`);
    }, [fiefAuth]);
    // return (<Button  onClick={()=> setHelpVisible(true)} severity="help" label={"Help"}/>)
    const brand = <img src={nmwdi_logo}  height='60px'/>
    const home= {label: 'Home', icon: 'pi pi-fw pi-home', command: () => {window.location.href = '/'}}
    const dashboard= {label: 'Map', icon: 'pi pi-fw pi-map', command: () => {window.location.href = '/dashboard'}}
    var loginout;
    if (isAuthenticated && userinfo){
        loginout = <Button label={"Logout"} onClick={() => logout()}/>
    }else{
        loginout = <div>
            <Button label={"Help"} onClick={() => setHelpVisible(true)} severity={'help'} icon={'pi pi-fw' +
                ' pi-question'}/>
            <Button label={"Login"} onClick={() => login()} icon={'pi pi-fw pi-user'}/>
        </div>
    }
    const items = [
        home,
        dashboard,
        // loginout
    ]
    console.log('items', items)
    return (
        <Menubar model={items} start={brand} end={loginout}/>
    )

    // return (
    //     <div>
    //
    //
    //     <Navbar  className="beaver-navbar">
    //
    //         {/*<Container>*/}
    //         {/*    <Nav>*/}
    //         {/*        <Nav.Link href="dashboard">Dashboard</Nav.Link>*/}
    //         {/*        <Nav.Link href="documentation">Documentation</Nav.Link>*/}
    //
    //         {/*    /!*<Navbar.Brand href="/">*!/*/}
    //         {/*    /!*    <img src={nmwdi_logo}/>*!/*/}
    //         {/*    /!*    FantasyWaterLeague</Navbar.Brand>*!/*/}
    //         {/*    /!*<Navbar.Collapse id="basic-navbar-nav">*!/*/}
    //         {/*    /!*    <Navbar.Toggle aria-controls="basic-navbar-nav" />*!/*/}
    //         {/*    /!*    <Nav className="me-auto">*!/*/}
    //         {/*    /!*        <Nav.Link href="dashboard">Dashboard</Nav.Link>*!/*/}
    //         {/*    /!*        <Nav.Link href="documentation">Documentation</Nav.Link>*!/*/}
    //         {/*    /!*        <Nav.Link href="#link">Link</Nav.Link>*!/*/}
    //         {/*    /!*        <NavDropdown title="Dropdown" id="basic-nav-dropdown">*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.2">*!/*/}
    //         {/*    /!*                Another action*!/*/}
    //         {/*    /!*            </NavDropdown.Item>*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*!/*/}
    //         {/*    /!*            <NavDropdown.Divider />*!/*/}
    //         {/*    /!*            <NavDropdown.Item href="#action/3.4">*!/*/}
    //         {/*    /!*                Separated link*!/*/}
    //         {/*    /!*            </NavDropdown.Item>*!/*/}
    //         {/*    /!*        </NavDropdown>*!/*/}
    //         {/*        </Nav>*/}
    //         {/*    /!*</Navbar.Collapse>*!/*/}
    //         {/*</Container>*/}
    //         <Nav>
    //             <Navbar.Brand href='https://newmexicowaterdata.org' >
    //                 <img src={nmwdi_logo} height='60px'/>
    //             </Navbar.Brand>
    //         </Nav>
    //         <Container>
    //             <Nav>
    //                 <Navbar.Brand href="/">Beaver</Navbar.Brand>
    //                 <Nav.Link href="dashboard">Dashboard</Nav.Link>
    //                 {/*<Nav.Link href="documentation">Documentation</Nav.Link>*/}
    //                 {/*<Nav.Link href="analytics">Analytics</Nav.Link>*/}
    //                 {/*<Nav.Link href="discovery">Discovery</Nav.Link>*/}
    //                 {/*<Nav.Link href="match">Matches</Nav.Link>*/}
    //             </Nav>
    //         </Container>
    //         <Container style={{"justifyContent": "right"}}>
    //             <Button  rounded onClick={()=> setHelpVisible(true)} severity="help" label={"Help"}/>
    //             {!isAuthenticated && <Button onClick={() => login()} label={"Login"}/>}
    //             {isAuthenticated && userinfo && (
    //                 <div>
    //                     <img src={user_logo} style={{"width": "50px", "height": "50px"}}/>
    //                     <span style={{"padding": "10px"}}>{userinfo.email}</span>
    //                     <Button onClick={() => logout()} label={"Logout"}/>
    //                 </div>
    //             )}
    //         </Container>
    //     </Navbar>
    //     </div>
    // );
}

export default AppNavbar;