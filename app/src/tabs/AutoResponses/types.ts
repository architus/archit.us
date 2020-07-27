import { AutoResponse } from "@app/utility/types";

export type TransformedAutoResponse = AutoResponse & {
  authorData: AuthorData;
};

export type AuthorData = {
  author: string;
  username: string;
  avatarUrl: string;
  discriminator: string;
};
