import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error(
    "Missing SANITY_API_READ_TOKEN — create one at https://sanity.io/manage"
  );
}

const live = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 60,
  },
});

export const SanityLive = live.SanityLive;

/**
 * Safe wrapper around sanityFetch that returns { data: null } on error.
 * This allows pages to fall back to static data when the Sanity token
 * is invalid or the Content Lake is unreachable.
 */
export async function sanityFetch<T = unknown>(
  ...args: Parameters<typeof live.sanityFetch>
): Promise<{ data: T | null }> {
  try {
    return await live.sanityFetch<T>(...args);
  } catch {
    return { data: null };
  }
}
