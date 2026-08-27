import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import pool from './db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: 'consent select_account' // บังคับให้โชว์หน้าเลือกบัญชีทุกครั้ง
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const googleId = profile.sub

        const [rows]: any = await pool.query(
          'SELECT id FROM users WHERE google_id = ?',
          [googleId]
        )

        if (rows.length === 0) {
          const [result]: any = await pool.query(
            `INSERT INTO users
            (email, display_name, avatar_url, google_id)
            VALUES (?, ?, ?, ?)`,
            [profile.email, profile.name, profile.picture, googleId]
          )

          token.dbId = result.insertId
        } else {
          token.dbId = rows[0].id
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token.dbId) {
        session.user.id = token.dbId as string
      }

      return session
    }
  }
})
