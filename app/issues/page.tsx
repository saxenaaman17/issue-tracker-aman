import prisma from "@/prisma/client";
// import delay from "delay";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

export interface SearchParams {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  userId: string;
}

interface Props {
  searchParams: SearchParams;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status); // this will return an array of strings containing valid status values
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; // if we pass undefined to prisma, it doesn't filter issues for that property
  const where = { status, assignedToUserId: searchParams.userId };

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  // await delay(2000);

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination total={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  );
};

export const dynamic = "force-dynamic"; // export const revalidate=0 will work the same here

export const metadata: Metadata = {
  title: "Issue Tracker - List",
  description: "View all project issues in a table format",
};

export default IssuesPage;
