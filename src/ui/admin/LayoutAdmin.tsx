'use client'
import { ActionIcon, Anchor, Box, Button, Container, Flex, Stack, Title } from "@mantine/core";
import { MdArrowBackIos, MdHome, MdLogout } from "react-icons/md";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {

    const onLogout = async () => {
        const res = await fetch('/api/auth/logout')
        if (res.ok) window.location.href = '/admin'
    }

    return <Stack>
        <Stack gap={0}>
            <Flex align={"center"} justify={"space-between"} p={"md"}>
                <Flex align={"center"}>
                    <Anchor href="/">
                        <MdArrowBackIos size={32} />
                    </Anchor>
                    <Title>WIBU SERVER</Title>
                </Flex>
                <Button onClick={onLogout} size="compact-sm" leftSection={<MdLogout />}>LOGOUT</Button>
            </Flex>
            <Flex gap={"md"} p={"md"} align={"center"}>
                <Anchor href="/admin">
                    <MdHome size={24} />
                </Anchor>
                <Anchor href="/admin/list-app">List App</Anchor>
                <Anchor href="/admin/list-project">List Project</Anchor>
                <Anchor href="/admin/list-server">List Server</Anchor>
            </Flex>
        </Stack>
        {children}
    </Stack>
}