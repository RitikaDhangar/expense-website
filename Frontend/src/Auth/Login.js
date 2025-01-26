import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeToken_user } from "../feature/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    useremail: "",
    userpassword: "",
  });
  const [validateuser, setValidateUser] = useState({
    email: false,
    password: false,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [AlertDetail, setAlertDetail] = useState({ msg: "", success: false });
  const setUserInfoHandler = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  };
  const handlerValidation = () => {
    let isValid = true;
    if (!userInfo.useremail.length) {
      setValidateUser((prev) => {
        return { ...prev, email: true };
      });
      isValid = false;
    }
    if (!userInfo.userpassword.length) {
      setValidateUser((prev) => {
        return { ...prev, password: true };
      });
      isValid = false;
    }
    return isValid;
  };
  const LoginHandler = async () => {
    const isValid = handlerValidation();
    if (isValid) {
      setValidateUser({ email: false, password: false });
    } else {
      return;
    }
    const res = await axios.post("http://localhost:8000/login-user", userInfo);
    if (res?.data?.success === 1) {
      setShowAlert(true);
      setAlertDetail({ msg: res.data.message, success: true });
      dispatch(storeToken_user(res.data.token));
      // navigate('/');
    } else if (res?.data?.success === 0) {
      setShowAlert(true);
      setAlertDetail({ msg: res.data.message, success: false });
    }
  };
  useEffect(() => {
    if (!userInfo.useremail.length) {
      setValidateUser((prev) => {
        return { ...prev, email: false };
      });
    }
    if (!userInfo.userpassword.length) {
      setValidateUser((prev) => {
        return { ...prev, password: false };
      });
    }
  }, [userInfo.useremail.length, userInfo.userpassword.length]);
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h3 style={{ marginTop: "12px" }}>User Login</h3>
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
          <Form.Text className="text-danger">
            Please provide your Email.
          </Form.Text>
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
            border: validateuser.password ? "1px solid darkred" : "",
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
            Please Provide your password.
          </Form.Text>
        )}
      </Form.Group>
      <Button variant="success" className="mt-3" onClick={LoginHandler}>
        Login
      </Button>
      <div style={{ marginTop: "12px", display: "flex" }}>
        New to Expense Tracker?{" "}
        <p
          style={{ marginLeft: "3px", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Create an account
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

export default Login;
