import { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import Summary from "./components/Summary.jsx";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`/api/expenses`)
      .then(res => setExpenses(res.data))
      .catch(() => setError("Failed to fetch expenses"))
      .finally(() => setLoading(false));
  }, []);

  const addExpense = async (expense) => {
    try {
      const res = await axios.post(`/api/expenses`, expense);
      setExpenses(prev => [res.data, ...prev]);
    } catch {
      setError("Failed to add expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses(prev => prev.filter(e => e._id !== id));
    } catch {
      setError("Failed to delete expense");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Expense Tracker</h1>
      <div className="bg-white rounded-2xl shadow p-4 space-y-4">
        <ExpenseForm addExpense={addExpense} />
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
            <Summary expenses={expenses} />
          </>
        )}
        {error && <p className="text-center text-red-600">{error}</p>}
      </div>
    </div>
  );
}
