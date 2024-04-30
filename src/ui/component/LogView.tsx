import { ActionIcon, Box, Code, Flex, Loader, Paper, Stack, Text } from "@mantine/core"
import { LegacyRef } from "react"
import { MdClose } from "react-icons/md"

const LogView = ({ text, setOpen, loading }: { text: string, setOpen: any, loading: boolean }) => {

    return <Stack p={"md"}>
        <Paper shadow="sm" bg={"black"}>
            <Stack gap={0}  >
                <Flex bg={"dark"} justify={"space-between"} p={"sm"} c={"white"}>
                    <Flex gap={"md"} align={"center"}>
                        {loading && <Loader />}
                        <Text>LOG</Text>
                    </Flex>
                    <ActionIcon onClick={() => setOpen(false)}>
                        <MdClose />
                    </ActionIcon>
                </Flex>
                <Stack h={500} p={"sm"} pos={"static"} style={{ overflow: "auto" }} c={"green"}>
                    <Code c={"green"} bg={"black"}>
                        <pre>
                            {text}
                        </pre>
                    </Code>
                </Stack>
            </Stack>
        </Paper>
    </Stack>


}

export default LogView