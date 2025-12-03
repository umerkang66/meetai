'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: session } = authClient.useSession();

  const onSignup = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => window.alert('Something went wrong'),
        onSuccess: () => window.alert('Success'),
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => window.alert('Something went wrong'),
        onSuccess: () => window.alert('Success'),
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button
          className="cursor-pointer"
          onClick={() => authClient.signOut()}
          variant="destructive"
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={onSignup} className="cursor-pointer">
          Create user
        </Button>
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <Input
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button onClick={onLogin} className="cursor-pointer">
          Create user
        </Button>
      </div>
    </div>
  );
}
