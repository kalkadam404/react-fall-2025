export function EmptyState({ text = "Нет данных" }) {
  return <div className="text-center text-gray-400 py-10 text-lg">{text}</div>;
}
