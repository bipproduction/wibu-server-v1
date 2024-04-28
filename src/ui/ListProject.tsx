'use client'

import { ActionIcon, Box, Button, Flex, LoadingOverlay, Skeleton, Stack, Table, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { Loader } from "./component/Loader";
import LogView from "./component/LogView";

export function ListProject() {
    const [listProject, setlistProject] = useState<any[] | null>(null)
    const [openLog, setOpenLog] = useState(false)
    const [textLog, setTextLog] = useState<string>("")
    const [loading, setLoading] = useState(false)

    useShallowEffect(() => {
        loadList()
    }, [])
    const loadList = async () => {
        const res = await fetch('/bin/list-project').then(res => res.json())
        setlistProject(res)
    }

    const onBuild = async (id: string) => {
        setOpenLog(true)
        setLoading(true)
        // const res = await fetch(`/bin/nextjs-build?id=${id}`).then(res => res.json())
        // console.log(res)
        loadList()
        setLoading(false)
    }

    const onInstall = async (id: string) => {
        setOpenLog(true)
        setLoading(true)
        // const res = await fetch(`/bin/nextjs-install?id=${id}`).then(res => res.json())
        // console.log(res)
        loadList()
        setLoading(false)
    }

    if (openLog) {
        return <LogView text={textLog} setOpen={setOpenLog} />
    }
    return (
        <Stack p={"md"} gap={"md"}>
            <Title>ListProject</Title>
            <Stack pos={"relative"}>
                <Table striped withColumnBorders withRowBorders withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>NAME</Table.Th>
                            <Table.Th>TYPE</Table.Th>
                            <Table.Th>ACTION</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            listProject?.map((x, i) => (
                                <Table.Tr key={i} >
                                    <Table.Td>{x.name}</Table.Td>
                                    <Table.Td>{x.type}</Table.Td>
                                    <Table.Td>
                                        <Button.Group>
                                            {x.type === "nextjs" ?
                                                <Button onClick={() => onBuild(x.id)} >BUILD</Button>
                                                : x.type === null ? null : <Button onClick={() => onInstall(x.id)} >INSTALL</Button>}
                                            <Button variant="outline" c={"red"}>DELETE</Button>
                                        </Button.Group>
                                    </Table.Td>
                                </Table.Tr>

                            ))
                        }
                    </Table.Tbody>
                </Table>
                <Skeleton visible={listProject === null} h={"md"} ></Skeleton>
            </Stack>
        </Stack>
    );
}