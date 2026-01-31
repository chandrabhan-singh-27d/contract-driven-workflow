"use client";

interface Props {
  data: Record<string, unknown>;
}

export function ReadOnlyView({ data }: Props) {
  return (
    <div className="space-y-2 text-sm">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="text-gray-500 capitalize">{key}</span>
          <span className="font-medium">{String(value)}</span>
        </div>
      ))}
    </div>
  );
}

