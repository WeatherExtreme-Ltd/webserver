import fs from "fs";
import path from "path";
import ImageClient from "./ImageClient";

export default function Home() {
  const imagePath = path.join(process.cwd(), "public", "image.png");
  const stats = fs.statSync(imagePath);
  const modifiedTime = stats.mtimeMs;

  return <ImageClient/>;
}
