'use client'

import { LoadingOverlay, Skeleton, Stack } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
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
        <div>
            <h1>ListPm2</h1>
            <Stack pos={"relative"}>

                <Skeleton  visible={listPm2 === null} >
                    <pre>
                        {JSON.stringify(listPm2, null, 2)}
                    </pre>
                </Skeleton>
            </Stack>
        </div>
    );
}