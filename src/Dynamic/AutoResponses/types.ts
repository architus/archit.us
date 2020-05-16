import { HoarFrost, Snowflake } from "Utility/types";

export type AutoResponse = {
  id: HoarFrost;
  authorId: Snowflake;
  trigger: string;
  response: string;
  count: number;
};

export type TransformedAutoResponse = {
  id: HoarFrost;
  authorId: Snowflake;
  trigger: string;
  response: string;
  count: number;
  authorData: AuthorData;
};

export type AuthorData = {
  author: string;
  username: string;
  avatarUrl: string;
  discriminator: string;
};
