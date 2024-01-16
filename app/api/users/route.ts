import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// we don't need request param here but we'll keep it otherwise next.js caches the output of this api call
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

  return NextResponse.json(users, { status: 200 });
}
