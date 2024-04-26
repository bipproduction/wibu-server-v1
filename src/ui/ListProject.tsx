'use client'

import { Box, LoadingOverlay, Skeleton, Stack } from "@mantine/core";
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
        <div>
            <h1>ListProject</h1>
            <Stack pos={"relative"}>

                <Skeleton  visible={listProject === null} >
                    <pre>{JSON.stringify(listProject, null, 2)}</pre>
                </Skeleton>
            </Stack>
        </div>
    );
}