"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    {
      label: "Open",
      value: "OPEN",
    },
    {
      label: "In progress",
      value: "IN_PROGRESS",
    },
    {
      label: "Closed",
      value: "CLOSED",
    },
  ];

  const router = useRouter();

  const handleOnValueChange = (status: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        status,
      })
      .then(() => router.refresh())
      .catch(() => toast.error("Changes could not be saved."));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={handleOnValueChange}
      >
        <Select.Trigger placeholder="Change Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {statuses?.map((status) => (
              <Select.Item value={status.value} key={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default StatusSelect;
