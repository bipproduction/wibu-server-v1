'use client'

import { ActionIcon, Box, Button, Flex, LoadingOverlay, Skeleton, Stack, Table, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { Loader } from "./component/Loader";

export function ListProject() {
    const [listProject, setlistProject] = useState<any[] | null>(null)

    useShallowEffect(() => {
        loadData()
    }, [])
    const loadData = async () => {
        const res = await fetch('/bin/list-project').then(res => res.json())
        setlistProject(res)
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
                                                <Button >BUILD</Button>
                                                : x.type === null ? null : <Button >INSTALL</Button>}
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