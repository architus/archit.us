import { AutoResponse, Member } from "@app/utility/types";

export type Author = Member;

export type TransformedAutoResponse = AutoResponse & {
  authorData: AuthorData;
};

export type AuthorData = {
  author: string;
  username: string;
  avatarUrl: string;
  discriminator: string;
};
