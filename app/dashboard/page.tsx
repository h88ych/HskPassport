import { auth, signOut } from '@/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold">แดชบอร์ดของคุณ</h1>

          <div className="flex items-center gap-4">
            {/* โชว์รูปโปรไฟล์และชื่อจาก Google */}
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="font-medium">{session.user?.name}</span>

            {/* ปุ่มออกจากระบบ */}
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button
                type="submit"
                className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ออกจากระบบ
              </button>
            </form>
          </div>
        </div>

        <div className="text-center py-20 text-gray-500">
          <p>🎉 ล็อกอินสำเร็จแล้ว!</p>
          <p>เดี๋ยวเราจะมาสร้างส่วนเลือก Level 1-6 ตรงนี้กันต่อ</p>
        </div>
      </div>
    </main>
  )
}
