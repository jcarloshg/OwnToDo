# TaskFlow Docker Setup

## Quick Start

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| **front** | http://localhost:3000 | Next.js frontend |
| **back** | http://localhost:3001 | Express.js API |
| **db** | localhost:5432 | PostgreSQL database |

## Database

- **Database Name:** taskflow
- **User:** postgres
- **Password:** postgres
- **Port:** 5432

The schema (`db/01.schema.sql`) is automatically loaded on first start.

## Environment Variables

### Backend (.env)
```env
DB_HOST=db
DB_PORT=5432
DB_NAME=taskflow
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001
```

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Development

Changes to source files are reflected immediately via volume mounts.

```bash
# Rebuild after package.json changes
docker-compose up --build

# Run tests
docker-compose exec back npm test
docker-compose exec front npm test

# Access container shell
docker-compose exec back sh
docker-compose exec front sh
```

## Cleanup

```bash
# Stop and remove containers
docker-compose down

# Remove volumes (deletes database data)
docker-compose down -v
```