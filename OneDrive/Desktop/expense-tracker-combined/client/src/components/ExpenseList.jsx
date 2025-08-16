export default function ExpenseList({ expenses, deleteExpense }) {
  if (!expenses.length) {
    return <p className="text-center text-gray-600">No expenses yet.</p>;
  }
  return (
    <ul className="space-y-2">
      {expenses.map((e) => (
        <li key={e._id} className="flex justify-between items-center border rounded-xl p-2">
          <div className="flex flex-col">
            <span className="font-medium">{e.description}</span>
            <span className="text-xs text-gray-500">{new Date(e.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">₹{e.amount}</span>
            <button
              onClick={() => deleteExpense(e._id)}
              className="px-2 py-1 rounded-lg bg-red-600 text-white text-sm"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
