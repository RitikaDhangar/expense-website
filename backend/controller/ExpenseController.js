const Expense = require("../model/Expense");
exports.addNewExpense = async (req, res) => {
  try {
    let { price, description, category } = req.body;
    price = Number(price);
    if (!price) {
      res.send({ message: "Please provide valid price", success: 0 });
    }
    await req.user.createExpense({
      price,
      description,
      category,
    });
    res.send({ message: "New expense created", success: 1 });
  } catch (err) {
    res.send({ message: "something went wrong", success: 0, err });
  }
};
exports.fetchAllExpenses = async (req, res) => {
  try {
    let allExpenses = await req.user.getExpenses();
    allExpenses = allExpenses.map((expense) => expense.toJSON());
    res.send({ message: "all expenses", success: 1, data: allExpenses });
  } catch (err) {
    res.send({ message: "something went wrong", success: 0, err });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await req.user.removeExpense(id);
    res.send({ message: "Expense delete successfully", success: 1 });
  } catch (err) {
    res.send({ message: "something went wrong", success: 0, err });
  }
};
