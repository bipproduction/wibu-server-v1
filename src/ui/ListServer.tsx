'use client'

import { ActionIcon, LoadingOverlay, Skeleton, Stack, Table, Title, Tooltip } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { Loader } from "./component/Loader";
import { MdAdd, MdCheck, MdClose, MdEdit } from "react-icons/md";
import { ActionModalEditServer } from "./component/ActionModalEditServer";

export function ListServer() {
    const [listServer, setlistServer] = useState<any[] | null>(null)
    const [dataServer, setDataServer] = useState({
        open: false,
        name: "",
        port: "",
        server_name: "",
        type: ""
    })

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
            <ActionIcon.Group>
                <Tooltip label="Add Server">
                    <ActionIcon onClick={() => setDataServer({ ...dataServer, open: true, type: "add" })}>
                        <MdAdd />
                    </ActionIcon>
                </Tooltip>
            </ActionIcon.Group>
            <Table striped withColumnBorders withRowBorders withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>NAME</Table.Th>
                        <Table.Th>PORT</Table.Th>
                        <Table.Th>IS SSL</Table.Th>
                        <Table.Th>SERVER NAME</Table.Th>
                        <Table.Th>ACTION</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        listServer?.map((x, i) => (
                            <Table.Tr key={i} >
                                <Table.Td>{i + 1}</Table.Td>
                                <Table.Td>{x.id}</Table.Td>
                                <Table.Td>{x.name}</Table.Td>
                                <Table.Td>{x.port}</Table.Td>
                                <Table.Td>{x.is_ssl ? <MdCheck /> : <MdClose />}</Table.Td>
                                <Table.Td>{x.server_name}</Table.Td>
                                <Table.Td>
                                    <ActionIcon.Group>
                                        <ActionIcon onClick={() => setDataServer({ open: true, name: x.name, port: x.port, server_name: x.server_name, type: "edit" })}>
                                            <MdEdit />
                                        </ActionIcon>
                                    </ActionIcon.Group>
                                </Table.Td>
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>
            {listServer == null && <Skeleton h={300} ></Skeleton>}
            <ActionModalEditServer data={dataServer} setData={setDataServer} onSubmit={(value: any) => {
                console.log(value)
            }} />
        </Stack>
    );
}