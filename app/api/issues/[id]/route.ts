import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../../validationSchemas";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

// we send PATCH request if we have to update some properties of an object and if we
// need to update whole object then we send PUT request
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // if user is not logged in, don't let them create issues by calling api
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  // now firstly we need to validate the data
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

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
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // if user is not logged in, don't let them create issues by calling api
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
