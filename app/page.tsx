import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AppUI from './AppUI'

export default async function HomePage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login')
  }

  return <AppUI user={session.user} />
}
