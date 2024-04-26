import { ListPm2 } from "@/ui/ListPm2";
import { ListProject } from "@/ui/ListProject";
import { ListServer } from "@/ui/ListServer";
import { Title } from "@mantine/core";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Title>Hello</Title>
      <ListPm2 />
      <ListProject />
      <ListServer />
    </main>
  );
}
