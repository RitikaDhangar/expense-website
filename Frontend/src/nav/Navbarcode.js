import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { storeToken_user } from "../feature/userSlice";

function Navbarcode() {
  const { token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(storeToken_user(null));
  };
  useEffect(() => {
    if (token) {
      console.log("1");
      navigate("/");
    } else {
      console.log("2");
      navigate("/signup");
    }
  }, [token]);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ display: "flex", gap: "1rem", padding: "1rem" }}
          >
            {token ? (
              <>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Home
                </Link>
                <Button
                  to="/logout"
                  style={{ textDecoration: "none", marginTop: "-5px" }}
                  onClick={logoutUser}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Signup
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarcode;
