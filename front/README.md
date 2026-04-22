# TaskFlow Frontend

A Next.js task management application with App Router architecture.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Validation:** Zod
- **Architecture:** Clean Architecture (Domain → Application → Infrastructure → Presentation)

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Route group (no URL impact)
│   │   ├── layout.tsx            # Main layout wrapper
│   │   ├── page.tsx              # Landing page with hero section
│   │   └── tasks/
│   │       ├── layout.tsx        # Tasks section layout with header
│   │       ├── loading.tsx        # Tasks list loading state
│   │       ├── error.tsx          # Tasks error boundary
│   │       ├── page.tsx          # GET /tasks - Task list (SSR)
│   │       ├── new/
│   │       │   ├── loading.tsx   # New task loading state
│   │       │   └── page.tsx      # GET /tasks/new - Create task form
│   │       └── [id]/
│   │           ├── loading.tsx   # Task detail loading state
│   │           ├── error.tsx     # Task detail error boundary
│   │           ├── page.tsx      # GET /tasks/:id - Task detail
│   │           └── edit/
│   │               └── page.tsx  # GET /tasks/:id/edit - Edit task
├── domain/entities/              # Domain layer - Business entities
│   └── Task.ts                   # Task & CreateTaskInput interfaces
├── infrastructure/api/           # Infrastructure layer - External services
│   └── taskApi.ts                # API client (createTask, getTasks)
└── presentation/                  # Presentation layer - UI components
    ├── components/
    │   └── TaskForm.tsx          # Task creation form component
    └── hooks/
        └── useCreateTask.ts      # Create task custom hook
```

## URL Routes

| Method | Path              | Component                         | Description                |
| ------ | ----------------- | --------------------------------- | -------------------------- |
| GET    | `/`               | `(main)/page.tsx`                 | Landing page with hero     |
| GET    | `/tasks`          | `(main)/tasks/page.tsx`           | Task list page (SSR)       |
| GET    | `/tasks/new`      | `(main)/tasks/new/page.tsx`       | Create task form           |
| GET    | `/tasks/:id`      | `(main)/tasks/[id]/page.tsx`      | Task detail view           |
| GET    | `/tasks/:id/edit` | `(main)/tasks/[id]/edit/page.tsx` | Edit task form             |

### Parallel Routes

- `/tasks/new` (static) - Create task form
- `/tasks/[id]` (dynamic) - Task detail
- `/tasks/[id]/edit` (dynamic) - Edit task form

## Loading & Error States

Each route segment can have optional `loading.tsx` and `error.tsx` files:

| Segment      | Loading                  | Error                  |
| ------------ | ------------------------ | ---------------------- |
| `/tasks`     | `tasks/loading.tsx`      | `tasks/error.tsx`      |
| `/tasks/:id` | `tasks/[id]/loading.tsx` | `tasks/[id]/error.tsx` |
| `/tasks/new` | `tasks/new/loading.tsx`  | -                      |

## API Endpoints

Backend expected at `NEXT_PUBLIC_API_URL` (default: `http://localhost:3001`)

| Endpoint                | Method | Description              |
| ----------------------- | ------ | ------------------------ |
| `/api/tasks`            | POST   | Create a new task        |
| `/api/tasks?userId=:id` | GET    | Get all tasks for a user |

## Environment Variables

| Variable                    | Default                 | Description   |
| --------------------------- | ----------------------- | ------------- |
| `NEXT_PUBLIC_API_URL`       | `http://localhost:3001` | API base URL  |
| `NEXT_PUBLIC_API_BASE_PATH` | `/api`                  | API base path |

## Task Entity

```typescript
interface Task {
  id: string;
  title: string;
  description: string | null;
  effortPoints: number;
  status: "pending" | "completed";
  dueDate: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTaskInput {
  title: string;
  description?: string;
  effortPoints: number;
  dueDate?: string | null;
  userId: string;
}
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run Jest tests
```

## Architecture Layers

1. **Domain** (`domain/`) - Business entities and interfaces
2. **Application** - Use cases (currently in hooks)
3. **Infrastructure** (`infrastructure/`) - External API clients
4. **Presentation** (`presentation/`) - UI components and hooks

## Notes

- `/` serves a visually appealing landing page with hero, features, and CTA sections
- `/tasks` displays the task management interface
- All data fetching in Server Components uses async/await
- Dynamic route params are received as Promises (Next.js 14 pattern)
- Error boundaries use `'use client'` directive
- Demo user ID: `00000000-0000-0000-0000-000000000000`
