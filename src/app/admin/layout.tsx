import LayoutAdmin from "@/ui/admin/LayoutAdmin";
import { Login } from "@/ui/auth/Login";
import app_config from "@/util/app_config";
import { Stack, Title } from "@mantine/core";
import { cookies } from 'next/headers'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const token = cookies().get('token')?.value
    const user = await fetch(app_config.host + '/api/auth/user', { headers: { Authorization: `Bearer ${token}` } })
    console.log(user)
    if (!token || !user.ok) return <Stack>
        <Login app_config={app_config} />
    </Stack>

    return <LayoutAdmin>{children}</LayoutAdmin>
}