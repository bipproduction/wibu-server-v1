'use client'

import { ActionIcon, Box, Button, Flex, LoadingOverlay, Skeleton, Stack, Table, Title, Tooltip } from "@mantine/core";
import { useScrollIntoView, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { Loader } from "./component/Loader";
import LogView from "./component/LogView";
import { MdAdd, MdBuild, MdDelete, MdDownload, MdInstallDesktop, MdRunningWithErrors } from "react-icons/md";
import { ActionModal } from "./component/ActionModal";

export function ListProject() {
    const [listProject, setlistProject] = useState<any[] | null>(null)
    const [openLog, setOpenLog] = useState(false)
    const [textLog, setTextLog] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 60,
    });
    const [openModal, setOprnModal] = useState(false)

    useShallowEffect(() => {
        loadList()
    }, [])
    const loadList = async () => {
        const res = await fetch('/bin/list-project').then(res => res.json())
        setlistProject(res)
    }

    const onPull = async (id: string) => {

        setTextLog("loading ...")
        setOpenLog(true)
        setLoading(true)
        const res: any = await fetch(`/bin/project-pull?name=${id}`)
        if (!res.ok) return setLoading(false)
        const reader = res.body.getReader()
        let result = ""
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder("utf-8").decode(value)
            setTextLog(result)
            // scrollIntoView({ alignment: 'start' })
        }
        setLoading(false)

    }

    const onBuild = async (id: string) => {
        setTextLog("loading ...")
        setOpenLog(true)
        setLoading(true)
        const res: any = await fetch(`/bin/project-build?name=${id}`)
        if (!res.ok) return setLoading(false)
        const reader = res.body.getReader()
        let result = ""
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder("utf-8").decode(value)
            setTextLog(result)
            // scrollIntoView({ alignment: 'start' })
        }
        setLoading(false)
    }

    const onInstall = async (name: string) => {
        setTextLog("loading ...")
        setOpenLog(true)
        setLoading(true)
        const res = await fetch(`/bin/project-install?name=${name}`).then(res => res.json())
        const reader = res.body.getReader()
        let result = ""
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder("utf-8").decode(value)
            setTextLog(result)
        }
        loadList()
        setLoading(false)
    }

    const onDelete = async (id: string) => {

    }

    if (openLog) {
        return <LogView loading={loading} text={textLog} setOpen={setOpenLog} />
    }
    return (
        <Stack p={"md"} gap={"md"}>
            <Title>ListProject</Title>
            <ActionIcon.Group>
                <ActionIcon>
                    <MdAdd />
                </ActionIcon>
            </ActionIcon.Group>
            <Stack pos={"relative"}>
                <Table striped withColumnBorders withRowBorders withTableBorder highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>#</Table.Th>
                            <Table.Th>NAME</Table.Th>
                            <Table.Th>TYPE</Table.Th>
                            <Table.Th>STUDIO</Table.Th>
                            <Table.Th>ACTION</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            listProject?.map((x, i) => (
                                <Table.Tr key={i} >
                                    <Table.Td>{i + 1}</Table.Td>
                                    <Table.Td>{x.name}</Table.Td>
                                    <Table.Td>{x.type}</Table.Td>
                                    <Table.Td>{x.studio ? "true" : "false"}</Table.Td>
                                    <Table.Td>
                                        <ActionIcon.Group >
                                            <Tooltip label="pull">
                                                <ActionIcon onClick={() => onPull(x.name)}>
                                                    <MdDownload />
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip label="install">
                                                <ActionIcon>
                                                    <MdInstallDesktop onClick={() => onInstall(x.name)} />
                                                </ActionIcon>
                                            </Tooltip>
                                            {x.script && x.script.build && <Tooltip label="Build">
                                                <ActionIcon>
                                                    <MdBuild onClick={() => onBuild(x.name)} />
                                                </ActionIcon>
                                            </Tooltip>}
                                        </ActionIcon.Group>
                                    </Table.Td>
                                </Table.Tr>

                            ))
                        }
                    </Table.Tbody>
                </Table>
                <Skeleton visible={listProject === null} h={"md"} ></Skeleton>
            </Stack>
            <ActionModal openModal={openModal} onClose={() => setOprnModal(false)} text={"Add Project"} onSubmit={() => {
                setOprnModal(false)
                console.log("add")
            }} />
        </Stack>
    );
}