import { TaskForm } from '@/presentation/components/TaskForm';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>TaskFlow - Create Task</h1>
      <p>Create a new task to track your work.</p>

      <TaskForm userId={DEMO_USER_ID} />
    </main>
  );
}