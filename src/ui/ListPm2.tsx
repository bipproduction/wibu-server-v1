'use client'

import { ActionIcon, Box, Code, Divider, Flex, Paper, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { MdClose, MdLogoDev, MdRestartAlt, MdStop } from 'react-icons/md'
import _ from "lodash";
import { Loader } from "./component/Loader";

export function ListPm2() {
    const [listPm2, setlistPm2] = useState<any[] | null>(null)
    const [openLog, setOpenLog] = useState(false)
    const [textLog, setTextLog] = useState<string>("")
    const [loading, setLoading] = useState(false)

    useShallowEffect(() => {
        loadList()
    }, [])
    const loadList = async () => {
        const list = await fetch('/bin/list-pm2').then(res => res.json())
        setlistPm2(list)
    }

    const onRestart = async (id: string) => {
        setLoading(true)
        const res = await fetch(`/bin/pm2-restart?id=${id}`).then(res => res.json())
        console.log(res)
        loadList()
        setLoading(false)
    }

    const onStop = async (id: string) => {
        setLoading(true)
        const res = await fetch(`/bin/pm2-stop?id=${id}`).then(res => res.json())
        console.log(res)
        loadList()
        setLoading(false)
    }

    const onLog = async (id: string) => {
        setTextLog("")
        setOpenLog(true)
        const res: any = await fetch(`/bin/pm2-log?id=${id}`)
        
        // get response stream
        const reader = res.body.getReader()

        // read stream
        let result = ""
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder().decode(value)
            setTextLog(result)
        }

    }

    if (openLog) return <PM2Log text={textLog} setOpen={setOpenLog} />

    return (
        <Stack p={"md"}>
            <Title>ListPm2</Title>
            <Stack pos={"relative"}>
                <Table striped withColumnBorders withRowBorders withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>NAME</Table.Th>
                            <Table.Th>PORT</Table.Th>
                            <Table.Th>STATUS</Table.Th>
                            <Table.Th>ACTION</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            listPm2?.map((x, i) => (
                                <Table.Tr key={i} >
                                    <Table.Td>{x.id}</Table.Td>
                                    <Table.Td>{x.name}</Table.Td>
                                    <Table.Td>{x.port}</Table.Td>
                                    <Table.Td bg={x.status === "online" ? "green" : "red"} c={"white"}>{x.status}</Table.Td>
                                    <Table.Td>
                                        <Flex gap={"md"}>
                                            <ActionIcon loading={loading} onClick={() => onRestart(x.id)}>
                                                <MdRestartAlt />
                                            </ActionIcon>
                                            <ActionIcon loading={loading} onClick={() => onStop(x.id)}>
                                                <MdStop />
                                            </ActionIcon>
                                            <ActionIcon loading={loading} onClick={() => onLog(x.id)}>
                                                <MdLogoDev />
                                            </ActionIcon>
                                        </Flex>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
                <Skeleton visible={listPm2 === null} h={"md"} ></Skeleton>
            </Stack>

        </Stack>
    );
}

const PM2Log = ({ text, setOpen }: { text: string, setOpen: any }) => {

    return <Stack p={"md"}>
        <Paper shadow="sm" bg={"black"}>
            <Stack gap={0}  >
                <Flex bg={"dark"} justify={"space-between"} p={"sm"} c={"white"}>
                    <Text>LOG</Text>
                    <ActionIcon onClick={() => setOpen(false)}>
                        <MdClose />
                    </ActionIcon>
                </Flex>
                <Stack h={500} p={"sm"} pos={"static"} style={{ overflow: "auto" }} c={"green"}>
                    <Code c={"green"} bg={"black"}>
                        <pre>
                            {text}
                        </pre>
                    </Code>
                </Stack>
            </Stack>
        </Paper>
    </Stack>


}