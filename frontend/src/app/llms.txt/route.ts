const llmsContent = `# Asiful Mamun

> Web developer building fast, clean websites.

## Portfolio

- Website: https://asifulmamun.info.bd/
- Focus: Web development
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}