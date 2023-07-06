import { AutoResponse, PartialUser } from "@app/utility/types";

export type Author = PartialUser;

export type TransformedAutoResponse = AutoResponse & {
  authorData: AuthorData;
};

export type AuthorData = {
  author: string;
  username: string;
  avatarUrl: string;
  discriminator: number;
};
