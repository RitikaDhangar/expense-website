import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manipulate_Expense } from "../feature/expenseSlice";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const Expenses = () => {
  const dispatch = useDispatch();
  const { allExpenses } = useSelector((state) => state.expenses);
  const { token } = useSelector((state) => state.users);
  const deleteExpenseHandler = async (id) => {
    const filteredExpense = allExpenses.filter((item) => item.id !== id);
    dispatch(manipulate_Expense(filteredExpense));
    try {
      const res = await axios.delete(
        `http://localhost:8000/delete-expense/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const allExpenseHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/fetch-expenses", {
        headers: {
          Authorization: token,
        },
      });
      if (res.data.success) {
        const expenseArray = res.data.data.map((item) => {
          return {
            price: item.price,
            description: item.description,
            category: item.category,
            id: uuidv4(),
          };
        });
        console.log({ expenseArray });
        dispatch(manipulate_Expense(res.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    allExpenseHandler();
  }, []);
  return (
    <div>
      <h3>All Expenses</h3>
      {allExpenses.map((item) => (
        <div key={item.id} style={{ display: "flex", marginTop: "12px" }}>
          <p style={{ marginRight: "10px" }}>{item.price}</p>
          <p style={{ marginRight: "10px" }}>{item.category}</p>
          <p style={{ marginRight: "10px" }}>{item.description}</p>
          <Button
            style={{ marginRight: "10px" }}
            variant="danger"
            onClick={() => deleteExpenseHandler(item.id)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
