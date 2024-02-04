import { Flex } from "@radix-ui/themes";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

const Home = async () => {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  return (
    <Flex direction="column" gap="6">
      <LatestIssues />
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
    </Flex>
  );
};

export default Home;
