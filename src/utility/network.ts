import { isDefined } from "./data";

const avatarSizes = [16, 32, 40, 64, 128, 256, 512, 1024];
function getNextLargerSize(size: number) {
  for (let avatarSize of avatarSizes) {
    if (avatarSize > size) return avatarSize;
  }
  return avatarSizes[avatarSizes.length - 1];
}

/**
 * Constructs a Discord CDN URL that gets the avatar of the specified user
 *
 * @param clientId The Discord Snowflake client id, as a string
 * @param discriminator The #XXXX discriminator
 * @param size The size of the requested avatar
 * @param hash The avatar hash
 */
export function constructAvatarUrl(
  clientId: string,
  discriminator: number,
  size?: number,
  hash?: string
) {
  if (isDefined(hash)) {
    const sizeAppend = isDefined(size)
      ? `?size=${getNextLargerSize(size)}`
      : "";
    return `https://cdn.discordapp.com/avatars/${clientId}/${hash}.png${sizeAppend}`;
  } else {
    // default avatar
    const avatarNumber = discriminator % 5;
    return `https://cdn.discordapp.com/embed/avatars/${avatarNumber}.png`;
  }
}

const _httpVerbs = <const>["GET", "POST", "PUT", "PATCH", "DELETE"];
/**
 * Defines HTTP verbs used for RESTful communication
 */
export type HttpVerb = typeof _httpVerbs[number];
/**
 * Maps HTTP verbs to themselves
 */
export const HttpVerbs: Record<HttpVerb, HttpVerb> = Object.assign(
  _httpVerbs.map(v => ({ [v]: v }))
);

/**
 * Gets the RESTful API base URL to use
 */
export const API_BASE: string = process.env.PRODUCTION_URL
  ? "https://api.archit.us:8000"
  : "https://api.archit.us:8000";

/**
 * Gets the Gateway API base URL to use
 */
export const WS_API_BASE: string = process.env.PRODUCTION_URL
  ? "wss://ws.archit.us:8000"
  : "wss://ws.archit.us:8000";
