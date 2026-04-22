export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-light/10 to-primary/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-3">TaskFlow</h1>
          <p className="text-gray-600 text-lg">Create and manage your tasks with ease</p>
        </header>
        {children}
      </div>
    </main>
  );
}