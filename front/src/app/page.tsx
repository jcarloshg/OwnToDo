import { TaskForm } from '@/presentation/components/TaskForm';

// For demo purposes, using a fixed user ID
const DEMO_USER_ID = '00000000-0000-0000-0000-000000000000';

export default function Home() {
  const handleTaskCreated = () => {
    console.log('Task created successfully!');
    // In a real app, you would refresh the task list here
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>TaskFlow - Create Task</h1>
      <p>Create a new task to track your work.</p>

      <TaskForm userId={DEMO_USER_ID} onSuccess={handleTaskCreated} />
    </main>
  );
}