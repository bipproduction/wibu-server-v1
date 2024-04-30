import { Button, Flex, Modal, Stack, TextInput } from "@mantine/core";
import _ from "lodash";

export function ActionModalEditServer({ data, setData, onSubmit }: { data: any, setData: any, onSubmit: any }) {

    const onSub = () => {
        onSubmit(data)
        setData({ ...data, open: false })
    }
    return <Modal  title={_.upperCase(data.type) + " SERVER " + data.name ?? null} opened={data.open} onClose={() => setData({ ...data, open: false })}>
        <Stack >

            <TextInput value={data.server_name} placeholder="wibu-server" label="SERVER NAME" onChange={(e) => setData({ ...data, server_name: e.target.value })} />
            <TextInput value={data.name} placeholder="wibu-server" label="NAME" onChange={(e) => setData({ ...data, name: e.target.value })} />
            <TextInput value={data.port} placeholder="8080" label="PORT" onChange={(e) => setData({ ...data, port: e.target.value })} />
            <Flex align={"center"} justify={"end"} gap={"md"}>
                <Button size="compact-sm" bg={data.type === "add" ? "green" : "yellow"} onClick={onSub} >SUBMIT</Button>
                <Button bg={"gray"} size="compact-sm" onClick={() => setData({ ...data, open: false })}>CANCEL</Button>
            </Flex>
        </Stack>
    </Modal>
}