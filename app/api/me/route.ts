import { auth } from '@/lib/auth'
import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(request: { json: () => any }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const nickname = body.nickname

  if (!nickname) {
    return NextResponse.json({ error: 'Nickname is required' }, { status: 400 })
  }

  try {
    await pool.query('UPDATE users SET nickname = ? WHERE id = ?', [
      nickname,
      session.user?.id
    ])

    return NextResponse.json({ success: true, nickname })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
