import { isDefined } from "./data";
import { constructAvatarUrl } from "./network";
import { Snowflake, MockUser, Guild, PartialGuild } from "./types";

const architusId: Snowflake = "448546825532866560" as Snowflake;
const architusAvatar = "99de1e495875fb5c27ba9ac7303b45b7";
const DISCORD_EPOCH = BigInt(1420070400000);

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
  verified: true,
  bot: true,
};

const MANAGE_SERVERS = 32; // 0x20

/**
 * Determines whether the given guild doesn't have architus, but the current
 * user is a Discord admin (candidate for adding architus to)
 * @param guild - Guild to examine
 */
export function isDiscordAdminWithoutArchitus(guild: PartialGuild): boolean {
  return (
    isDefined(guild.permissions) &&
    // eslint-disable-next-line no-bitwise
    !!(guild.permissions.getOrElse(0) & MANAGE_SERVERS) &&
    !guild.has_architus
  );
}

export function snowflakeToDate(id: Snowflake): Date {
  // eslint-disable-next-line no-bitwise
  return new Date(Number((BigInt(id) >> BigInt(22)) + DISCORD_EPOCH));
}
