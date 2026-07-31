import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "public", "image.png");

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(`data: connected\n\n`);

      const watcher = fs.watch(filePath, (eventType) => {
        if (eventType === "change") {
          controller.enqueue(`data: changed\n\n`);
        }
      });

      req.signal.addEventListener("abort", () => {
        watcher.close();
        controller.close();
      });
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    }
  });
}
