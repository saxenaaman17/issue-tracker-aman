"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  total: number;
  pageSize: number;
  currentPage: number;
}

const pageSizeOptions: number[] = [5, 10, 15, 20];

const Pagination = ({ total, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(total / pageSize);
  if (pageCount <= 1) return null;

  const pageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };

  const pageSizeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("pageSize", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">Rows per page:</Text>
      <Select.Root defaultValue={`${pageSize}`} onValueChange={pageSizeChange}>
        <Select.Trigger placeholder="Page Size" />
        <Select.Content>
          {pageSizeOptions.map((pageSizeOption) => (
            <Select.Item key={pageSizeOption} value={`${pageSizeOption}`}>
              {pageSizeOption}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => pageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => pageChange(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => pageChange(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => pageChange(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
