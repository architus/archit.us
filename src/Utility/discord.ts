import { Snowflake, MockUser, Guild } from "./types";
import { constructAvatarUrl } from "./network";
import { isDefined } from "./data";

const architusId: Snowflake = "448546825532866560" as Snowflake;
const architusAvatar = "99de1e495875fb5c27ba9ac7303b45b7";

/**
 * Architus bot's mock user to display inside a Discord Mock
 */
export const architusUser: MockUser = {
  id: "-1",
  avatarUrl: constructAvatarUrl({
    clientId: architusId,
    hash: architusAvatar,
  }),
  discriminator: "7145",
  username: "architus",
  nameColor: "#d34c4f",
  bot: true,
};

const MANAGE_SERVERS = 32; // 0x20

/**
 * Determines whether the given guild doesn't have architus, but the current
 * user is a Discord admin (candidate for adding architus to)
 * @param guild - Guild to examine
 */
export function isDiscordAdminWithoutArchitus(guild: Guild): boolean {
  return (
    isDefined(guild.permissions) &&
    // eslint-disable-next-line no-bitwise
    !!(guild.permissions & MANAGE_SERVERS) &&
    !guild.has_architus
  );
}
