import pool from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await pool.query('SELECT 1')

    return NextResponse.json({
      ok: true,
      message: 'Database is alive'
    })
  } catch (error) {
    console.error('[Keepalive] Database error:', error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Database connection failed'
      },
      { status: 500 }
    )
  }
}
