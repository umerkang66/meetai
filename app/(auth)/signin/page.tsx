import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SigninView } from '@/modules/auth/ui/views/sign-in-view';

const Signin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    return redirect('/');
  }

  return <SigninView />;
};

export default Signin;
