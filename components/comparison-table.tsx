'use client';

interface ComparisonTableProps {
  headers: string[];
  rows: Array<{ feature: string; values: Record<string, string | boolean> }>;
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-fd-border">
            <th className="px-3 py-2 text-left font-medium text-fd-foreground">
              Feature
            </th>
            {headers.map((header) => (
              <th
                key={header}
                className="px-3 py-2 text-left font-medium text-fd-foreground"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-fd-border">
              <td className="px-3 py-2 font-medium text-fd-foreground">
                {row.feature}
              </td>
              {headers.map((header) => {
                const value = row.values[header];
                return (
                  <td key={header} className="px-3 py-2">
                    {typeof value === 'boolean' ? (
                      value ? (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">✗</span>
                      )
                    ) : (
                      <span className="text-fd-foreground">{value}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
