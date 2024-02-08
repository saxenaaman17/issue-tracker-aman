import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";
import IssueSearch from "./IssueSearch";

const IssueActions = () => {
  return (
    <Flex justify="between">
      <Flex gap="4" align="center">
        <IssueStatusFilter />
        <IssueAssigneeFilter />
      </Flex>

      <Flex gap="4" align="center">
        <IssueSearch />
        <Button>
          <Link href="/issues/new-issue">New Issue</Link>
        </Button>
      </Flex>
    </Flex>
  );
};

export default IssueActions;
