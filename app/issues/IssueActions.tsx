import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAssigneeFilter from "./IssueAssigneeFilter";
import IssueSearch from "./IssueSearch";

const IssueActions = () => {
  return (
    <Flex justify="between" className="flex-col md:flex-row">
      <Flex gap="4" align="center" className="mb-3 md:mb-0">
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
