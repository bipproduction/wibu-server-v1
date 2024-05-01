'use client'
import { BackgroundImage, Button, Card, Center, Container, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import _ from "lodash";

export function Login({ app_config }: { app_config: any }) {
    const [loading, setLoading] = useState(false)
    const [dataLogin, setDataLogin] = useState({ email: '', password: '' })

    const onLogin = async () => {
        if (_.flatMap(_.values(dataLogin)).includes('')) return alert("Please fill all fields")
        setLoading(true)
        const res = await fetch(app_config.host + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataLogin)
        }).then(res => res.json())
        if (res.success) {
            window.location.href = '/admin'
        } else {
            alert(res.message)
        }
        setLoading(false)
    }

    return <BackgroundImage src="/img/bg_1.png" w={"100%"} h={"100vh"}>
        <Stack align={"center"} justify={"center"} w={"100%"} h={"100vh"}  >
            <Card p={"md"} withBorder shadow="md" maw={300}>
                <Stack>
                    <Title>Login</Title>
                    <TextInput leftSection={<MdEmail />} placeholder="email" label="Email" type="email" value={dataLogin.email} onChange={(e) => setDataLogin({ ...dataLogin, email: e.target.value })} />
                    <PasswordInput leftSection={<MdPassword />} placeholder="password" label="Password" value={dataLogin.password} onChange={(e) => setDataLogin({ ...dataLogin, password: e.target.value })} />
                    <Button onClick={onLogin} loading={loading}>LOGIN</Button>
                </Stack>
            </Card>
        </Stack>
    </BackgroundImage>

}