'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn, signUp } from '@/lib/auth-client';

// Email/password against the site's own Better Auth instance. Sign-up is
// open only until the first account exists (see lib/auth.ts) — after that
// the server rejects it and the error is surfaced here.
export default function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const creating = mode === 'sign-up';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const result = creating
      ? await signUp.email({ name: name || email.split('@')[0], email, password })
      : await signIn.email({ email, password });
    setBusy(false);
    if (result.error) {
      toast.error(result.error.message ?? 'Something went wrong. Try again.');
      return;
    }
    router.push('/dashboard/overview');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className='w-full space-y-4'>
      {creating && (
        <div className='space-y-2'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete='name'
            disabled={busy}
          />
        </div>
      )}
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
          disabled={busy}
        />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={creating ? 'new-password' : 'current-password'}
          disabled={busy}
        />
      </div>
      <Button type='submit' className='w-full' disabled={busy}>
        {busy ? 'Working…' : creating ? 'Create the owner account' : 'Sign in'}
      </Button>
      <p className='text-muted-foreground text-center text-sm'>
        {creating ? (
          <>
            Already set up? <Link className='underline underline-offset-4' href='/auth/sign-in'>Sign in</Link>
          </>
        ) : (
          <>
            First time here? <Link className='underline underline-offset-4' href='/auth/sign-up'>Create the owner account</Link>
          </>
        )}
      </p>
    </form>
  );
}
