import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "public", "image.png");
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("data: connected\n\n"));

      fs.watchFile(filePath, { interval: 500 }, (curr, prev) => {
        if (curr.mtimeMs !== prev.mtimeMs) {
          try {
            controller.enqueue(encoder.encode("data: changed\n\n"));
          } catch {
            // Controller closed
          }
        }
      });

      req.signal.addEventListener("abort", () => {
        fs.unwatchFile(filePath);
        try {
          controller.close();
        } catch {
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive"
    }
  });
}
