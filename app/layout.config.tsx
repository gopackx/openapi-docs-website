import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="size-5 shrink-0"
          >
            <path
              d="M 50 18 A 32 32 0 1 1 18 50"
              stroke="#F97316"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              opacity={0.35}
            />
            <path
              d="M 50 30 A 20 20 0 1 1 30 50"
              stroke="#F97316"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              opacity={0.7}
            />
            <circle cx={50} cy={50} r={14} fill="#F97316" />
          </svg>
          <span className="font-semibold whitespace-nowrap">OPEN SWAG GO</span>
        </span>
      ),
      url: '/',
    },
    githubUrl: 'https://github.com/gopackx/open-swag-go',
  };
}
