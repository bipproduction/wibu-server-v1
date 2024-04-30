'use client'

import { ActionIcon, Box, Button, Flex, LoadingOverlay, Skeleton, Stack, Table, Title, Tooltip } from "@mantine/core";
import { useScrollIntoView, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { Loader } from "./component/Loader";
import LogView from "./component/LogView";
import { MdAdd, MdBuild, MdDelete, MdDownload, MdInstallDesktop, MdRunningWithErrors, MdStart } from "react-icons/md";
import { ActionModal } from "./component/ActionModal";
import { ActionModalStart } from "./component/ActionModalStart";
import { showNotification } from '@mantine/notifications'
import mqttGlobal from "@/util/mqtt"

export function ListProject() {
    const [listProject, setlistProject] = useState<any[] | null>(null)
    const [openLog, setOpenLog] = useState(false)
    const [textLog, setTextLog] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState({
        open: false,
        name: "",
        type: "",
        port: ""
    })

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
        const res: any = await fetch(`/bin/project-install?name=${name}`)
        const reader = res.body.getReader()
        let result = ""
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder("utf-8").decode(value)
            setTextLog(result)
        }
        // loadList()
        setLoading(false)
    }

    const onStart = async (val: any) => {
        const res: any[] = await fetch('/bin/list-pm2').then(res => res.json())
        const ada = res.find(x => +x.port === +val.port)

        if (ada) return alert("port already in use")
        const cmd = `pm2 start "yarn start --port ${val.port}" --name ${val.name}_${val.port}`
        setOpenModal({ ...openModal, open: false })


        setTextLog("loading ...")
        setOpenLog(true)
        setLoading(true)
        const res2: any = await fetch('/bin/pm2-start?cmd=' + cmd + '&name=' + val.name)
        const reader = res2.body.getReader()
        let result = ""
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder("utf-8").decode(value)
            setTextLog(result)
        }
        setLoading(false)
        mqttGlobal.publish('pm2', 'pm2')
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
                                            <Tooltip label="start">
                                                <ActionIcon onClick={() => setOpenModal({ ...openModal, open: true, name: x.name, type: x.type })}>
                                                    <MdStart />
                                                </ActionIcon>
                                            </Tooltip>
                                        </ActionIcon.Group>
                                    </Table.Td>
                                </Table.Tr>

                            ))
                        }
                    </Table.Tbody>
                </Table>
                {listProject === null && <Skeleton h={300} bg={"cyan"}></Skeleton>}
            </Stack>
            <ActionModalStart openModal={openModal} setOpenModal={setOpenModal} onSubmit={onStart} />
        </Stack>
    );
}