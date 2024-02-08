import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="4" align="center">
        <IssueStatusFilter />
        <IssueAssigneeFilter />
      </Flex>
      <Button>
        <Link href="/issues/new-issue">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
