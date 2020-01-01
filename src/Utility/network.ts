import { isDefined } from "./data";

export { API_BASE, GATEWAY_API_BASE } from "./api.node";

const avatarSizes = [16, 32, 40, 64, 128, 256, 512, 1024];
function getNextLargerSize(size: number): number {
  for (const avatarSize of avatarSizes) {
    if (avatarSize > size) return avatarSize;
  }
  return avatarSizes[avatarSizes.length - 1];
}

/**
 * Constructs a Discord CDN URL that gets the avatar of the specified user
 * @param clientId - The Discord Snowflake client id, as a string
 * @param discriminator - The #XXXX discriminator
 * @param size - The size of the requested avatar
 * @param hash - The avatar hash
 */
export function constructAvatarUrl(
  clientId: string,
  discriminator: number,
  size?: number,
  hash?: string
): string {
  if (isDefined(hash)) {
    const sizeAppend = isDefined(size)
      ? `?size=${getNextLargerSize(size)}`
      : "";
    return `https://cdn.discordapp.com/avatars/${clientId}/${hash}.png${sizeAppend}`;
  }
  // default avatar
  const avatarNumber = discriminator % 5;
  return `https://cdn.discordapp.com/embed/avatars/${avatarNumber}.png`;
}

/**
 * Defines HTTP verbs used for RESTful communication
 */
export enum HttpVerbs {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE"
}
