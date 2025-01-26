import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { storeToken_user } from "../feature/userSlice";
import { jwtDecode } from "jwt-decode";
const Premiumuser = () => {
  const { token } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isPremiumUser, setIspremiumUser] = useState(false);

  const getPremiumMembership = async () => {
    const res = await axios.get("http://localhost:8000/premiumCustomer", {
      headers: {
        Authorization: token,
      },
    });

    if (res.data.success === 1) {
      const options = {
        key: res.data.key_id,
        order_id: res.data.order.id,
        handler: async function (params) {
          const res = await axios.post(
            "http://localhost:8000/confirmpremiumCustomer",
            {
              order_id: options.order_id,
              payment_id: params.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (res.data.success === 1) {
            toast.success(" Congrats You are a premium member");
            dispatch(storeToken_user(res.data.token));
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (res) => {
        console.log(res);
        toast.error("Something went wrong");
      });
    }
  };
  useEffect(() => {
    const decodeToken = jwtDecode(token);
    setIspremiumUser(decodeToken?.isPremiumUser);
  }, [token]);
  return (
    <>
      {isPremiumUser ? (
        <Button
          variant="danger"
          style={{
            marginTop: "10px",
            width: "200px",
            marginLeft: "165px",
          }}
          onClick={getPremiumMembership}
        >
          Premium Member
        </Button>
      ) : (
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          You are a premium User
        </p>
      )}
    </>
  );
};

export default Premiumuser;
