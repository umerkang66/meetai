'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session?.user.name}</p>
      <Button
        className="cursor-pointer"
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.refresh() },
          })
        }
        variant="destructive"
      >
        Logout
      </Button>
    </div>
  );
};
