// createJsonFile.ts
import fs from "fs";
import path from "path";

/**
 * Creates a JSON file with the given data.
 * @param fileName The name of the file to be created.
 * @param data The data to be written in the JSON file.
 * @returns A promise that resolves to the path of the created file.
 */
export async function createJsonFile(
  fileName: string,
  data: any
): Promise<string> {
  const filePath = path.join(process.cwd(), "data", fileName);

  // Ensuring the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Writing the file
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");

  return filePath;
}
