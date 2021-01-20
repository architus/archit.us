import { AutoResponse, User } from "@app/utility/types";

export type Author = User;

export type TransformedAutoResponse = AutoResponse & {
  authorData: AuthorData;
};

export type AuthorData = {
  author: string;
  username: string;
  avatarUrl: string;
  discriminator: string;
};
