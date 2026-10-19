<img width="1280" height="627" alt="image" src="https://github.com/user-attachments/assets/ee2c277f-0741-48d3-b0b9-d26f21ca050e" />
<img width="1280" height="599" alt="image" src="https://github.com/user-attachments/assets/42aaa5d3-b3ef-4e1a-8e84-b5d7882adb77" />
<img width="1280" height="636" alt="image" src="https://github.com/user-attachments/assets/50235ea7-6e1d-4926-aabc-e95a55a26bf8" />


# AI News Platform

A full-stack web application for working with AI-related news, built with Next.js, NestJS, TypeScript, and Prisma. The platform also includes AI-powered article summaries generated with Ollama using a locally running language model.

## Features

- **AI-powered article summaries** generated with a locally running Ollama model.
- **Full-stack architecture** with a Next.js frontend and NestJS backend.
- **Type-safe development** with TypeScript across the application.
- **Database access** through Prisma ORM.
- **Form handling and validation** with React Hook Form and Zod.
- **Toast notifications** with Sonner.
- **UI components** using shadcn/ui.

> Add or adjust this list to reflect the exact features implemented in your application.

## Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Sonner](https://sonner.emilkowal.ski/)
- [shadcn/ui](https://ui.shadcn.com/)

### Backend

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)

### Local AI

- [Ollama](https://ollama.com/) — runs a language model locally for article summarization.

### Database

- Database supported by the project's Prisma configuration. Set the connection string in the appropriate environment file.

## AI-Powered Article Summaries

The application can generate concise summaries of articles using Ollama and a language model running on the local machine.

At a high level, the flow is:

1. An article is selected for summarization.
2. The application sends the relevant article content to the configured backend/AI integration.
3. Ollama runs the configured local model to generate a summary.
4. The generated summary is returned to the application.

The exact model name and integration details depend on the local Ollama configuration. This approach can avoid relying on a paid cloud AI API for summarization when inference and article processing remain local.

## Architecture

The application is split into a frontend and backend:

- **Frontend:** Next.js UI and client-side interactions.
- **Backend:** NestJS server-side logic and API.
- **Data layer:** Prisma ORM for database access.
- **AI summarization:** Ollama with a locally running language model.

## Getting Started

### Prerequisites

Install the tools required by your project:

- Node.js
- npm, or another package manager used by the repository
- A database supported by your Prisma setup
- [Ollama](https://ollama.com/) for local AI summaries

### 1. Clone the repository

```bash
git clone https://github.com/vladryabota/projects.git
cd projects/ai-news-platform
```

### 2. Install dependencies

If the frontend and backend are separate applications, install dependencies in each directory containing a `package.json`:

```bash
npm install
```

Repeat this command in the other application directory if it has its own `package.json`.

### 3. Configure environment variables

Create the required `.env` files based on your project configuration. For example, the backend may need a database connection string:

```env
DATABASE_URL="your-database-connection-string"
```

Add any other variables required by your implementation, such as the backend API URL or Ollama endpoint. Use the variable names expected by your code.

**Do not commit real credentials, API keys, or secrets to Git.**

### 4. Configure Ollama

Install Ollama from [ollama.com](https://ollama.com/) and download the model configured in your application.

For example, if your application uses a model named `MODEL_NAME`, pull that model using:

```bash
ollama pull MODEL_NAME
```

Replace `MODEL_NAME` with the actual model identifier used by your project. Ensure Ollama is running and that the backend is configured to reach its local endpoint.

### 5. Set up the database

Run Prisma commands from the directory containing your Prisma schema and configuration.

Generate Prisma Client:

```bash
npx prisma generate
```

Apply development migrations if migrations are included in the project:

```bash
npx prisma migrate dev
```

Use the database setup procedure appropriate to your repository and environment.

### 6. Start the application

Run the frontend and backend using the scripts defined in their respective `package.json` files.

A typical Next.js development command is:

```bash
npm run dev
```

A typical NestJS development command is:

```bash
npm run start:dev
```

Run each command from the relevant application directory. Make sure the frontend, backend, database, and Ollama are configured to communicate with one another.

## Project Structure

The exact folder layout may vary. The main responsibilities are:

- **Next.js frontend:** Pages, UI components, forms, validation, and API integration.
- **NestJS backend:** API endpoints and server-side application logic.
- **Prisma:** Database schema, migrations, and data access.
- **Ollama integration:** Local language-model inference for article summaries.

## Development Notes

- Keep frontend and backend environment variables configured separately if the applications use separate environments.
- Make sure the selected Ollama model is downloaded before testing AI summaries.
- Avoid committing generated secrets, local database files, or environment files containing credentials.
- Add tests, screenshots, and deployment instructions here as the project evolves.

## Screenshots

_Add screenshots of the application here._


## Author

**Vladyslav Riabota**

- GitHub: [@vladryabota](https://github.com/vladryabota)

---

This project is part of my full-stack development portfolio.
