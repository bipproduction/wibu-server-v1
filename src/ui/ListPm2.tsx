'use client'

import { ActionIcon, Box, Divider, Flex, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
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
        <Stack>
            <Title>ListPm2</Title>
            <Stack pos={"relative"}>
                <Flex wrap={"wrap"} gap={"md"}>
                    {listPm2?.map((x, i) => (
                        <Paper w={300} shadow="sm" key={i} p={"md"} bg={x.status === "online" ? "green" : "red"} c={"white"}>
                            <Stack key={i} gap={0}>
                                <Flex>
                                    <Text w={100}>Id  </Text>
                                    <Text >: {x.id}</Text>
                                </Flex>
                                <Flex>
                                    <Text w={100}>Name </Text>
                                    <Text >: {x.name}</Text>
                                </Flex>
                                <Flex>
                                    <Text w={100}>Port </Text>
                                    <Text >: {x.port}</Text>
                                </Flex>
                                <Flex>
                                    <Text w={100}>Status </Text>
                                    <Text >: {x.status}</Text>
                                </Flex>
                                <Divider mt={"md"} />
                                <Flex gap={"sm"} pt={"md"} >
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
                            </Stack>
                        </Paper>
                    ))}
                </Flex>
                <Loader visible={listPm2 === null} />
            </Stack>

        </Stack>
    );
}