export function WorkflowTimeline({ history }: { history: string[] }) {
  return (
    <div className="border-t pt-4 space-y-2 text-sm">
      <p className="font-medium text-gray-700">History</p>
      <ul className="space-y-1">
        {history.map((state, idx) => (
          <li key={idx} className="text-gray-500">
            • {state}
          </li>
        ))}
      </ul>
    </div>
  );
}
