import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import WelcomeClientUI from './WelcomeClientUI'

export default async function WelcomePage() {
  const session = await auth()
  if (!session) redirect('/login')

  return <WelcomeClientUI userName={session.user?.name} />
}
