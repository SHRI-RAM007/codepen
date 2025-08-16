export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const count = expenses.length;
  return (
    <div className="text-center font-semibold">
      <p>Total Expense: ₹{total}</p>
      <p className="text-sm text-gray-500">Items: {count}</p>
    </div>
  );
}
