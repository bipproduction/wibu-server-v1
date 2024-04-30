import { Button, Flex, Modal, PasswordInput, Stack } from "@mantine/core";
import { useState } from "react";

export function ActionModal({ openModal, onClose, text, onSubmit }: { openModal: boolean, onClose: any, text: string, onSubmit: any }) {
    const [password, setPassword] = useState<string>("")
    return <Modal title="CONFIRM" opened={openModal} withCloseButton={true} onClose={onClose}>
        <Modal.Body>
            <Stack>
                <p>{text}</p>
                <PasswordInput placeholder="********" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Stack>
        </Modal.Body>
        <Flex justify={"space-between"}>
            {password === "makuro" && <Button size="compact-sm" bg={"red"} onClick={onSubmit}>Submit</Button>}
            <Button size="compact-sm" bg={"blue"} onClick={onClose}>Cancel</Button>
        </Flex>
    </Modal>
}