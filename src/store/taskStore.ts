import { redis } from "../config/redis";

const PREFIX = `lumiray:${process.env.NODE_ENV}:task:`;

type TaskStatus = "pending" | "processing" | "done" | "failed";

interface Task {
  id: string;
  status: TaskStatus;
  result?: string;
  error?: string;
}

export async function createTask(id: string) {
  const data = {
    id,
    status: "pending"
  };

  await redis.set(`${PREFIX}${id}`, JSON.stringify(data), "EX", 3600);

  return data;
}

export async function updateTask(id: string, update: any) {
  const key = `${PREFIX}${id}`;
  const raw = await redis.get(key);

  if (!raw) return;

  const data = JSON.parse(raw);

  const newData = {
    ...data,
    ...update
  };

  await redis.set(key, JSON.stringify(newData), "EX", 3600);
  // trừ credit sau khi update success
}

export async function getTask(id: string) {
  const raw = await redis.get(`${PREFIX}${id}`);
  if (!raw) return null;

  return JSON.parse(raw);
}