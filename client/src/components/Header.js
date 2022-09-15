import React , {useContext} from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import { Usercontext } from "./App";



const Header = () => {
  const {state} = useContext(Usercontext);
  const Navs = () => {
    if(state){
      return (<>
      <Nav.Link href="/dashboard">Home</Nav.Link>
      <Nav.Link href="/logout">Log Out</Nav.Link> </>) ;

    } else {
      return(<>
        <Nav.Link href="/dashboard">Home</Nav.Link>
        <Nav.Link href="/login">Log In</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        </>);
    }
  }
  return (
  <Navbar style={{backgroundColor: "#f5ba13", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)"}}>
  <Container>
    <Navbar.Brand style={{fontSize: "2.5rem", color:"#ffffff"}}>Keeper</Navbar.Brand>
    <Nav className="mjustify-content-end" style={{fontSize: "1.2rem"}}>
      <Navs />
    </Nav>
  </Container>
</Navbar>);
}

export default Header;