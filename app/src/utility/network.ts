import { isDefined } from "./data";
import { parseInteger } from "./primitives";
import { Snowflake } from "./types";
import { Option } from "@architus/lib/option";

export { API_BASE, GATEWAY_API_BASE, withBasePath } from "./api.node";

const avatarSizes = [16, 32, 40, 64, 128, 256, 512, 1024];
function getNextLargerSize(size: number): number {
  for (const avatarSize of avatarSizes) {
    if (avatarSize > size) return avatarSize;
  }
  return avatarSizes[avatarSizes.length - 1];
}

interface DefaultAvatarUrlConfig {
  discriminator: string;
}

interface RealAvatarUrlConfig {
  clientId: Snowflake;
  hash: string;
  size?: number;
}

function isRealAvatarUrlConfig(
  a: RealAvatarUrlConfig | DefaultAvatarUrlConfig
): a is RealAvatarUrlConfig {
  return (
    isDefined((a as RealAvatarUrlConfig).hash) &&
    isDefined((a as RealAvatarUrlConfig).clientId)
  );
}

/**
 * Constructs a Discord CDN URL that gets the avatar of the specified user
 * @param clientId - The Discord Snowflake client id
 * @param discriminator - The #XXXX discriminator
 * @param size - The size of the requested avatar
 * @param hash - The avatar hash
 */
export function constructAvatarUrl(
  options: RealAvatarUrlConfig | DefaultAvatarUrlConfig
): string {
  if (isRealAvatarUrlConfig(options)) {
    const { clientId, hash, size } = options;
    const sizeAppend = isDefined(size)
      ? `?size=${getNextLargerSize(size)}`
      : "";
    return `https://cdn.discordapp.com/avatars/${clientId}/${hash}.png${sizeAppend}`;
  }
  // default avatar
  const avatarNumber = Option.from(options.discriminator)
    .flatMap(parseInteger)
    .map((i) => i % 5)
    .getOrElse(0);
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
  DELETE = "DELETE",
}
