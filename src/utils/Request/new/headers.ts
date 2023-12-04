const CONTENT_TYPE = "application/json";
const DEFAULT_LOCALE = "en";

export const requestHeaders = async (
  withoutAsyncStorage?: boolean
): Promise<Headers> => {
  let headers: { sessionId?: string; token?: string } = {
    sessionId: undefined,
    token: undefined,
  };

  if (!withoutAsyncStorage) {
    headers = await (await import("./cookies")).getCookies();
  }

  return new Headers({
    "content-type": CONTENT_TYPE,
    ...(headers && headers),
    "X-UNI": process.env.NEXT_UNITOKEN ?? "",
    accept: CONTENT_TYPE,
  });
};
