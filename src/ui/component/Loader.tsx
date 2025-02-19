import { Skeleton } from '@mantine/core';

export function Loader({ visible }: { visible: boolean }) {
    if (!visible) return null
    return (
        <>
            <Skeleton height={50} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </>
    );
}