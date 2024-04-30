import { ListApp } from "@/ui/ListApp";
import { ListProject } from "@/ui/ListProject";
import { ListServer } from "@/ui/ListServer";
import { Anchor, BackgroundImage, Button, Flex, Stack, Title } from "@mantine/core";
import Image from "next/image";

export default function Home() {
  return (
    <BackgroundImage src="/img/bg_1.png" h={"100vh"}>
      {/* <Title>WIBU SERVER</Title>
      <ListApp />
      <ListProject />
      <ListServer /> */}
      <Flex align={"center"} justify={"space-between"} p={"md"}>
        <Title c={"white"}>WIBU SERVER</Title>
        <Anchor href="/admin">
          <Button>Admin</Button>
        </Anchor>
      </Flex>
    </BackgroundImage>
  );
}
