import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "../../../validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

// we send PATCH request if we have to update some properties of an object and if we
// need to update whole object then we send PUT request
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // if user is not logged in, don't let them update issues by calling api
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const { title, description, assignedToUserId, status } = body;

  // now firstly we need to validate the data
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // After validating data, we can check if user exists or not before assigning issue to user
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user) NextResponse.json({ error: "Invalid User." }, { status: 400 });
  }

  // secondly, we also need to check if the issue we want to update exist in our db or not
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  // finally we'll update the issue
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // if user is not logged in, don't let them delete issues by calling api
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });

  return NextResponse.json({});
}
