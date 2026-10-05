import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-8 py-10">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">AI News Platform</h1>
          <p className="mt-2 text-gray-600">Sign in to access the admin dashboard.</p>
        </div>

        <Suspense fallback={<div className="text-center text-sm text-gray-500">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
