<img width="1280" height="627" alt="image" src="https://github.com/user-attachments/assets/ee2c277f-0741-48d3-b0b9-d26f21ca050e" />

# AI News Platform

A full-stack web application focused on AI-related news, built with Next.js, NestJS, TypeScript, and Prisma.

## Tech Stack

### Frontend
- **Next.js** — React framework
- **TypeScript** — Type-safe development
- **React Hook Form** — Form state management and validation integration
- **Zod** — Schema validation
- **Sonner** — Toast notifications
- **shadcn/ui** — UI components

### Backend
- **NestJS** — Backend application framework
- **TypeScript** — Type-safe server-side development
- **Prisma ORM** — Database access and schema management

## Architecture

The application uses a separate frontend and backend:

- **Frontend:** Next.js application for the user interface and client-side interactions.
- **Backend:** NestJS application responsible for server-side logic and API endpoints.
- **Database:** Accessed through Prisma ORM.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (or another compatible package manager)
- A database supported by your Prisma configuration

### Installation

Clone the repository:

```bash
git clone https://github.com/vladryabota/projects.git
cd projects/ai-news-platform
```

Install dependencies in the frontend and backend directories:

```bash
npm install
```

> If the frontend and backend have separate `package.json` files, run `npm install` in each application directory.

### Environment Variables

Configure the environment variables required by the frontend, backend, and Prisma database connection.

Create the appropriate `.env` files based on your project configuration. For example:

```env
DATABASE_URL="your-database-connection-string"
```

Add any other required variables, such as API URLs and authentication secrets, according to your implementation.

**Never commit real credentials, API keys, or secrets to version control.**

### Database Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Run these commands from the directory containing your Prisma schema and configuration.

### Running the Application

Start the frontend and backend using the scripts defined in their respective `package.json` files.

For example, a Next.js frontend can typically be started with:

```bash
npm run dev
```

The NestJS backend can typically be started with:

```bash
npm run start:dev
```

Make sure both applications are configured to communicate with each other.

## Project Structure

The exact directory structure depends on the repository configuration.

Typical responsibilities include:

- **Frontend:** Pages, UI components, forms, validation, and API integration.
- **Backend:** API endpoints, business logic, and server-side functionality.
- **Prisma:** Database schema, migrations, and data access.

## Key Implementation Details

- TypeScript across the application stack.
- Form handling with React Hook Form.
- Schema validation using Zod.
- Database integration through Prisma ORM.
- Frontend and backend separation using Next.js and NestJS.

## Author

**Vladyslav Riabota**

- GitHub: [@vladryabota](https://github.com/vladryabota)

---

*This project is part of my full-stack development portfolio.*
