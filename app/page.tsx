import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { redirect } from 'next/navigation'
import AppUI from './AppUI'

export default async function HomePage() {
  const session = await auth()

  if (!session || !session.user) {
    redirect('/login')
  }

  const [rows]: any = await pool.query(
    'SELECT nickname ,avatar_url FROM users WHERE id = ?',
    [session.user.id]
  )

  const nickname = rows.length > 0 ? rows[0].nickname : null
  const avatarUrl = rows.length > 0 ? rows[0].avatar_url : null

  if (!nickname) {
    redirect('/welcome')
  }

  return (
    <AppUI user={session.user} dbNickname={nickname} avatarUrl={avatarUrl} />
  )
}
