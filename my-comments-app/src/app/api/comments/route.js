import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return new Response(JSON.stringify(comments), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const { comment } = await req.json();
  const newComment = await prisma.comment.create({
    data: { comment }
  });
  return new Response(JSON.stringify(newComment), {
    headers: { 'Content-Type': 'application/json' },
  });
}
