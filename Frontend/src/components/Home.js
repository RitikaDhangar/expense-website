import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import Expenses from "./Expenses";
import { useDispatch, useSelector } from "react-redux";
import { manipulate_Expense } from "../feature/expenseSlice";
import { v4 as uuidv4 } from "uuid";
import Premiumuser from "./Premiumuser";
const Home = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const { allExpenses } = useSelector((state) => state.expenses);
  console.log({ allExpenses });
  const [ExpenseInput, setExpenseInput] = useState({
    price: null,
    description: "",
    category: "",
  });
  const expenseInputHandler = (e) => {
    setExpenseInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const addExpenseHandler = async () => {
    if (
      !ExpenseInput.price ||
      !ExpenseInput.description ||
      !ExpenseInput.category
    ) {
      return toast.error("Fill all Fields");
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/add-expense",
        ExpenseInput,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.success === 1) {
        const expenseObj = { ...ExpenseInput, id: uuidv4() };
        dispatch(manipulate_Expense([...allExpenses, expenseObj]));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={{ padding: "10px" }}>
        <h3>Add Your Expenses</h3>
        <Container>
          <Row>
            <Col lg={6}>
              <Form style={{ marginTop: "12px" }}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPrice"
                >
                  <Form.Label column sm="2">
                    Price
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      placeholder="Enter the price"
                      name="price"
                      onChange={expenseInputHandler}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextDescription"
                >
                  <Form.Label column sm="2">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Enter the description"
                      name="description"
                      onChange={expenseInputHandler}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextCategory"
                >
                  <Form.Label column sm="2">
                    Category
                  </Form.Label>
                  <Col sm="10">
                    <Form.Select
                      aria-label="Default select example"
                      name="category"
                      onChange={expenseInputHandler}
                    >
                      <option>Select Category</option>
                      <option value="Food">Food</option>
                      <option value="Patrol">Patrol</option>
                      <option value="Travel">Travel</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "22px",
                }}
              >
                <Button variant="primary" onClick={addExpenseHandler}>
                  Add Expense
                </Button>
              </div>
              <Premiumuser />
            </Col>
          </Row>
        </Container>
      </div>
      <Expenses />
    </>
  );
};
export default Home;
