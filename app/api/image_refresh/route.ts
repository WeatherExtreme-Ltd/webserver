import { NextRequest } from "next/server";
import chokidar from "chokidar";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const filePath = path.join(process.cwd(), "storage", "image.png");
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("data: connected\n\n"));

      // Chokidar handles atomic replacements and file locks
      const watcher = chokidar.watch(filePath, {
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 150,
          pollInterval: 50,
        },
      });

      const notifyClient = () => {
        try {
          controller.enqueue(encoder.encode("data: changed\n\n"));
        } catch {
          watcher.close();
        }
      };

      watcher.on("change", notifyClient);
      watcher.on("add", notifyClient);

      req.signal.addEventListener("abort", () => {
        watcher.close();
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}