'use client'

import { ActionIcon, ActionIconGroup, Box, Code, Divider, Flex, Paper, Skeleton, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { MdClose, MdDelete, MdLogoDev, MdRemove, MdRestartAlt, MdStop } from 'react-icons/md'
import _ from "lodash";
import { Loader } from "./component/Loader";
import LogView from "./component/LogView";

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

    const onDelete = async (id: string) => {
        setLoading(true)
        const res = await fetch(`/bin/pm2-delete?id=${id}`).then(res => res.json())
        console.log(res)
        loadList()
        setLoading(false)
    }

    const onLog = async (id: string) => {
        setTextLog("loading ...")
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

    if (openLog) return <LogView loading={loading} text={textLog} setOpen={setOpenLog} />

    return (
        <Stack p={"md"}>
            <Title>List App</Title>
            <Stack pos={"relative"}>
                <Table striped withColumnBorders withRowBorders withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>#</Table.Th>
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
                                    <Table.Td>{i + 1}</Table.Td>
                                    <Table.Td>{x.id}</Table.Td>
                                    <Table.Td>{x.name}</Table.Td>
                                    <Table.Td>{x.port}</Table.Td>
                                    <Table.Td bg={x.status === "online" ? "green" : "red"} c={"white"}>{x.status}</Table.Td>
                                    <Table.Td>
                                        <ActionIconGroup>
                                            <Tooltip label="Restart">
                                                <ActionIcon loading={loading} onClick={() => onRestart(x.id)} >
                                                    <MdRestartAlt />
                                                </ActionIcon>
                                            </Tooltip>
                                            {x.status === "online" && <Tooltip label="Stop">
                                                <ActionIcon loading={loading} onClick={() => onStop(x.id)}>
                                                    <MdStop />
                                                </ActionIcon>
                                            </Tooltip>}
                                            {x.status === "stopped" && <Tooltip label="Delete">
                                                <ActionIcon loading={loading} onClick={() => onDelete(x.id)}>
                                                    <MdDelete />
                                                </ActionIcon>
                                            </Tooltip>}
                                            <Tooltip label="Log">
                                                <ActionIcon loading={loading} onClick={() => onLog(x.id)}>
                                                    <MdLogoDev />
                                                </ActionIcon>
                                            </Tooltip>
                                        </ActionIconGroup>
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

