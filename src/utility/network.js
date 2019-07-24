import { isEmptyOrNil } from "./string";
import { isDefined } from "./object";

const avatarSizes = [16, 32, 40, 64, 128, 256, 512, 1024];
const nextLargerSize = size => {
  const number = parseInt(size);
  for (let avatarSize of avatarSizes) {
    if (avatarSize > number) return avatarSize;
  }
  return avatarSizes[avatarSizes.length - 1];
};
export const constructAvatarUrl = (clientId, hash, size, discriminator) => {
  if (!isEmptyOrNil(clientId)) {
    if (!isEmptyOrNil(hash)) {
      const sizeAppend = isDefined(size) ? `?size=${nextLargerSize(size)}` : "";
      return `https://cdn.discordapp.com/avatars/${clientId}/${hash}.png${sizeAppend}`;
    } else {
      // default avatar
      const avatarNumber = discriminator % 5;
      return `https://cdn.discordapp.com/embed/avatars/${avatarNumber}.png`;
    }
  }
};

// probably will be enough
export const HttpVerbs = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE"
};

export const API_BASE = process.env.PRODUCTION_URL
  ? "https://api.archit.us"
  : "https://api.archit.us";

export const WS_API_BASE = process.env.PRODUCTION_URL
  ? "wss://api.archit.us:8300"
  : "wss://api.archit.us:8300";
