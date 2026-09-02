import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { redirect } from 'next/navigation'
import WelcomeClientUI from './WelcomeClientUI'

export default async function WelcomePage() {
  const session = await auth()
  if (!session || !session.user?.id) redirect('/login')

  const [rows]: any = await pool.query('SELECT id FROM users WHERE id = ?', [
    session.user.id
  ])
  if (rows.length === 0) {
    redirect('/api/auth/signout?callbackUrl=/login')
  }

  return <WelcomeClientUI userName={session.user?.name} />
}
