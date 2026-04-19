import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TaskFlow - Create Task',
  description: 'Create a new task in TaskFlow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}