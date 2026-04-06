'use client';

import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

interface ApiSignatureProps {
  signature: string;
  description: string;
  params?: Array<{ name: string; type: string; description: string }>;
  returns?: string;
}

export function ApiSignature({
  signature,
  description,
  params,
  returns,
}: ApiSignatureProps) {
  return (
    <div className="not-prose my-6">
      <CodeBlock>
        <Pre data-lang="go">
          <code>{signature}</code>
        </Pre>
      </CodeBlock>

      <p className="mt-3 text-sm text-fd-muted-foreground">{description}</p>

      {params && params.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-fd-border">
                <th className="px-3 py-2 text-left font-medium text-fd-foreground">Name</th>
                <th className="px-3 py-2 text-left font-medium text-fd-foreground">Type</th>
                <th className="px-3 py-2 text-left font-medium text-fd-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {params.map((param) => (
                <tr key={param.name} className="border-b border-fd-border">
                  <td className="px-3 py-2 font-mono text-fd-primary">{param.name}</td>
                  <td className="px-3 py-2 font-mono text-fd-muted-foreground">{param.type}</td>
                  <td className="px-3 py-2 text-fd-foreground">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {returns && (
        <div className="mt-4 text-sm">
          <span className="font-medium text-fd-foreground">Returns: </span>
          <code className="rounded bg-fd-secondary px-1.5 py-0.5 font-mono text-fd-primary">
            {returns}
          </code>
        </div>
      )}
    </div>
  );
}
