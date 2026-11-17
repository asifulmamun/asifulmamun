export default function SocialIcon({ name }: { name: string }) {
  if (name === 'facebook') {
    return (
      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6C16.7 2.6 15.8 2.5 14.8 2.5 12.5 2.5 11 3.9 11 6.4v2.1H8.5V12H11v9.5h3V12h2.4l.4-3.5z" />
      </svg>
    );
  }

  if (name === 'dribbble') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M5 5.5c4 1 8 5 10.5 13M2.8 11c5 .3 10-.7 14-4M8.5 2.8c3 3.5 5 8 5.8 14.5" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v12H3zm6 0h2.9v1.7c.5-.9 1.7-2 3.6-2 3.4 0 4 2.2 4 5.1V21h-3v-6.2c0-1.5 0-3.3-2-3.3s-2.4 1.6-2.4 3.2V21H9z" />
      </svg>
    );
  }

  return <span aria-hidden="true">Bē</span>;
}
