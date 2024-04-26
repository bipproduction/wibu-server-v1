'use client'

import { LoadingOverlay, Skeleton, Stack } from "@mantine/core";
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
        <div>
            <h1>ListServer</h1>
            <Stack pos={"relative"}>
                <Skeleton  visible={listServer === null} >
                    <pre>{JSON.stringify(listServer, null, 2)}</pre>
                </Skeleton>
            </Stack>
        </div>
    );
}