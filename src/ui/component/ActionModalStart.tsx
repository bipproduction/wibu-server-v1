import { ActionIcon, Button, Flex, Group, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { MdStar, MdStart } from "react-icons/md";

export function ActionModalStart({ openModal, setOpenModal, onSubmit }: { openModal: any, setOpenModal: any, onSubmit: (value: any) => void }) {
    const [text, setText] = useState({
        port: ""
    })

    const [textError, setTextError] = useState("")

    const onSub = () => {
        if (openModal.port === "") return setTextError("All fields are required")
        onSubmit(openModal)
    }

    return <Modal title={"START " + openModal.name} opened={openModal.open} onClose={() => setOpenModal({ ...openModal, open: false })} withCloseButton >
        <Stack>
            {/* {JSON.stringify(openModal)} */}
            <NumberInput value={text.port} placeholder="8080" label="PORT" onChange={(e) => setOpenModal({ ...openModal, port: e })} />
            {/* <TextInput value={text.command} placeholder="npm start" label="Command" onChange={(e) => setText({ ...text, command: e.target.value })} /> */}
            <Flex justify="end" gap={"md"}>
                <Button onClick={() => setOpenModal({ ...openModal, open: false })} bg={"grey"} size="compact-sm">CANSEL</Button>
                <Button onClick={onSub} bg={"blue"} size="compact-sm">START</Button>
            </Flex>
            {textError && <p style={{ color: "red" }}>{textError}</p>}
        </Stack>
    </Modal>

}