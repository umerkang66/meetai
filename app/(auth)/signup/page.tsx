import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { SignupView } from '@/modules/auth/ui/views/sign-up-view';

const Signup = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!!session) {
    return redirect('/');
  }

  return <SignupView />;
};

export default Signup;
