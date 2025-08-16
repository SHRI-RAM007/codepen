import { useState } from "react";

export default function ExpenseForm({ addExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!description.trim() || !amt || amt < 0) return;
    addExpense({ description: description.trim(), amount: amt });
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded-xl p-2 flex-1"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded-xl p-2 w-32"
      />
      <button className="px-4 py-2 rounded-xl shadow bg-blue-600 text-white">
        Add
      </button>
    </form>
  );
}
