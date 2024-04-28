'use client'

import { LoadingOverlay, Skeleton, Stack, Table, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { Loader } from "./component/Loader";

export function ListServer() {
    const [listServer, setlistServer] = useState<any[] | null>(null)

    useShallowEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const res = await fetch('/bin/list-server').then(res => res.json())
        setlistServer(res)
    }
    return (
        <Stack p={"md"} gap={"md"}>
            <Title>ListServer</Title>
            <Table striped withColumnBorders withRowBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>NAME</Table.Th>
                        <Table.Th>PORT</Table.Th>
                        <Table.Th>SERVER NAME</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        listServer?.map((x, i) => (
                            <Table.Tr key={i} >
                                <Table.Td>{x.id}</Table.Td>
                                <Table.Td>{x.name}</Table.Td>
                                <Table.Td>{x.port}</Table.Td>
                                <Table.Td>{x.server_name}</Table.Td>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>

            {/* <Stack pos={"relative"}>
                <Skeleton visible={listServer === null} >
                    <pre>{JSON.stringify(listServer, null, 2)}</pre>
                </Skeleton>
            </Stack> */}
        </Stack>
    );
}