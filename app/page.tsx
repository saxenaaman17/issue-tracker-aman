import { Flex, Grid } from "@radix-ui/themes";
import IssuesSummary from "./IssuesSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import IssuesChart from "./IssuesChart";

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

  const statuses = {
    open,
    inProgress,
    closed,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesSummary {...statuses} />
        <IssuesChart {...statuses} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Home;
