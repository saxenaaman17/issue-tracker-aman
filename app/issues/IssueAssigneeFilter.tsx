"use client";
import { Skeleton } from "@/app/components";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsers } from "./[id]/AssigneeSelect";
import { createQueryString, QueryParams } from "../utils/general-utils";

const IssueAssigneeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="1.8rem" width="8rem" />;

  if (error) return null;

  const handleOnValueChange = (userId: string) => {
    const params: QueryParams = {};

    if (userId !== "ALL") {
      params["assignedToUserId"] = userId;
    }

    const paramKeys = ["orderBy", "status", "pageSize", "search"];

    paramKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key] = value;
      }
    });

    const queryString = createQueryString(params);
    const queryParam = queryString ? `?${queryString}` : "";
    router.push(`/issues${queryParam}`);
  };

  return (
    <Select.Root
      onValueChange={handleOnValueChange}
      // defaultValue={searchParams.get("assignedToUserId") ?? ""}
      value={searchParams.get("assignedToUserId") ?? ""}
    >
      <Select.Trigger placeholder="filter by User..." />
      <Select.Content>
        <Select.Item value="ALL">All</Select.Item>
        {users?.map((user) => (
          <Select.Item value={user.id} key={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAssigneeFilter;
