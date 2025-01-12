'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from './login-form';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.includes('auth-token');
    if (token) {
      router.push('/profile-list');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Bot Profile Manager</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your bots</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}