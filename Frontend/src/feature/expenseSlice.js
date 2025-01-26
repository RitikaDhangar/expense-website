import { createSlice } from "@reduxjs/toolkit";
const expenseSlice = createSlice({
  name: "expenses",
  initialState: { allExpenses: [] },
  reducers: {
    manipulate_Expense: (state, action) => {
      state.allExpenses = action.payload;
    },
  },
});
export const { manipulate_Expense } = expenseSlice.actions;
export default expenseSlice.reducer;
