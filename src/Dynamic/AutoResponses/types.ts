import { AutoResponse } from "Utility/types";

export type TransformedAutoResponse = AutoResponse & {
  authorData: AuthorData;
};

export type AuthorData = {
  author: string;
  username: string;
  avatarUrl: string;
  discriminator: string;
};
