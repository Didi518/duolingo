import { auth } from "@clerk/nextjs";

const adminIds = ["user_2dmYpE4nu7Wv98sjdJip2Soecsg"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
