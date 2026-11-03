import { headers } from 'next/headers';

import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { auth } from '@/lib/auth';

export default async function ProfileViewPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <h2 className='text-2xl font-bold tracking-tight'>Profile</h2>
      <UserAvatarProfile
        className='h-16 w-16'
        showInfo
        user={
          user
            ? {
                imageUrl: user.image ?? undefined,
                fullName: user.name,
                emailAddresses: [{ emailAddress: user.email }]
              }
            : null
        }
      />
    </div>
  );
}
