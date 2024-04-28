'use client'

import { ActionIcon, Box, Divider, Flex, Paper, Skeleton, Stack, Table, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { MdLogoDev, MdRestartAlt, MdStop } from 'react-icons/md'
import _ from "lodash";
import { Loader } from "./component/Loader";

export function ListPm2() {
    const [listPm2, setlistPm2] = useState<any[] | null>(null)

    useShallowEffect(() => {
        loadList()
    }, [])
    const loadList = async () => {
        const list = await fetch('/bin/list-pm2').then(res => res.json())
        setlistPm2(list)
    }
    return (
        <Stack p={"md"}>
            <Title>ListPm2</Title>
            <Stack pos={"relative"}>
                <Table striped withColumnBorders withRowBorders withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>NAME</Table.Th>
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
                                    <Table.Td bg={x.status === "online" ? "green" : "red"} c={"white"}>{x.status}</Table.Td>
                                    <Table.Td>
                                        <Flex gap={"md"}>
                                            <ActionIcon>
                                                <MdRestartAlt />
                                            </ActionIcon>
                                            <ActionIcon>
                                                <MdStop />
                                            </ActionIcon>
                                            <ActionIcon>
                                                <MdLogoDev />
                                            </ActionIcon>
                                        </Flex>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }
                    </Table.Tbody>
                </Table>
                <Loader visible={listPm2 === null} />
            </Stack>

        </Stack>
    );
}