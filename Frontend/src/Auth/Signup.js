import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    useremail: "",
    userpassword: "",
  });
  const [validateuser, setValidateUser] = useState({
    name: false,
    email: false,
    password: false,
    strongpass: false,
  });
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [AlertDetail, setAlertDetail] = useState({ msg: "", success: false });
  const setUserInfoHandler = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  };
  const handlerValidation = () => {
    let isValid = true;
    if (userInfo.username.length < 4) {
      setValidateUser((prev) => {
        return { ...prev, name: true };
      });
      isValid = false;
    }
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|googlemail\.com)$/;
    if (!gmailRegex.test(userInfo.useremail)) {
      setValidateUser((prev) => {
        return { ...prev, email: true };
      });
      isValid = false;
    }
    if (userInfo.userpassword.length < 4) {
      setValidateUser((prev) => {
        return { ...prev, password: true };
      });
      isValid = false;
      return isValid;
    }
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(userInfo.userpassword)) {
      setValidateUser((prev) => {
        return { ...prev, strongpass: true };
      });
      isValid = false;
    }
    return isValid;
  };
  const signupHandler = async () => {
    const isValid = handlerValidation();
    if (isValid) {
      setValidateUser({ email: false, password: false });
    } else {
      return;
    }
    setValidateUser({ email: false, password: false, name: false });
    const res = await axios.post("http://localhost:8000/add-user", userInfo);
    if (res?.data?.success === 1) {
      setShowAlert(true);
      setAlertDetail({ msg: res.data.message, success: true });
      navigate("/login");
    } else if (res?.data?.success === 0) {
      setShowAlert(true);
      setAlertDetail({ msg: res.data.message, success: false });
    }
  };
  useEffect(() => {
    if (!userInfo.username.length) {
      setValidateUser((prev) => {
        return { ...prev, name: false };
      });
    }
    if (!userInfo.useremail.length) {
      setValidateUser((prev) => {
        return { ...prev, email: false };
      });
    }
    if (!userInfo.userpassword.length) {
      setValidateUser((prev) => {
        return { ...prev, password: false, strongpass: false };
      });
    }
  }, [
    userInfo.username.length,
    userInfo.useremail.length,
    userInfo.userpassword.length,
  ]);
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h3 style={{ marginTop: "12px" }}>User Signup</h3>
      <Form.Group
        as={Col}
        md="4"
        controlId="unique-random-name"
        className="mt-1"
      >
        <Form.Label>User name</Form.Label>
        <Form.Control
          style={{ border: validateuser.name ? "1px solid darkred" : "" }}
          required
          type="text"
          placeholder="user's name"
          name="username"
          value={userInfo.username}
          onChange={setUserInfoHandler}
          autoComplete="new-name"
          id="unique-random-name"
        />
        {validateuser.name && (
          <Form.Text className="text-danger">
            Please Provide a valid name.
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group
        as={Col}
        md="4"
        controlId="unique-random-email"
        className="mt-2"
      >
        <Form.Label>Email</Form.Label>
        <Form.Control
          style={{ border: validateuser.email ? "1px solid darkred" : "" }}
          required
          type="email"
          placeholder="user's email"
          name="useremail"
          value={userInfo.useremail}
          onChange={setUserInfoHandler}
          autoComplete="new-email"
          id="unique-random-email"
        />
        {validateuser.email && (
          <Form.Text className="text-danger">Invalid email address.</Form.Text>
        )}
      </Form.Group>
      <Form.Group
        as={Col}
        md="4"
        controlId="unique-random-password"
        className="mt-2"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          style={{
            border:
              validateuser.password || validateuser.strongpass
                ? "1px solid darkred"
                : "",
          }}
          required
          type="password"
          placeholder="user's password"
          name="userpassword"
          value={userInfo.userpassword}
          onChange={setUserInfoHandler}
          autoComplete="new-password"
          id="unique-random-password"
        />
        {validateuser.password && (
          <Form.Text className="text-danger">
            Please Provide a strong password.
          </Form.Text>
        )}
        {validateuser.strongpass && (
          <Form.Text className="text-danger">
            "The password must contain at least one letter, one digit, one
            special character, and have a minimum length of 8 characters."
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="success" className="mt-3" onClick={signupHandler}>
        Complete Signup
      </Button>
      <div style={{ marginTop: "12px", display: "flex" }}>
        Existing User?{" "}
        <p
          style={{ marginLeft: "3px", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Log in
        </p>
      </div>
      {showAlert && (
        <Alert
          variant={AlertDetail.success ? "success" : "danger"}
          style={{
            width: "100%",
            height: "60px",
            position: "absolute",
            top: 0,
          }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <p>{AlertDetail.msg}</p>
        </Alert>
      )}
    </div>
  );
};

export default Signup;
