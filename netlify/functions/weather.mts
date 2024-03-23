import type { Context } from "@netlify/functions"
export default async (req: Request, context: Context) => {
  console.log(req)
  return new Response("Hello, world!")
}