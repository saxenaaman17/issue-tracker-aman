"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value: Status | "ALL" }[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOnValueChange = (status: string) => {
    const params = new URLSearchParams();
    if (status !== "ALL") params.append("status", status);

    const paramKeys = ["orderBy", "assignedToUserId", "pageSize", "search"];

    paramKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params.append(key, value);
    });

    const queryParam = params.size ? `?${params.toString()}` : "";
    router.push(`/issues${queryParam}`);
  };

  return (
    <Select.Root
      onValueChange={handleOnValueChange}
      // defaultValue={searchParams.get("status") ?? ""}
      value={searchParams.get("status") ?? ""}
    >
      <Select.Trigger placeholder="Filter by Status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
