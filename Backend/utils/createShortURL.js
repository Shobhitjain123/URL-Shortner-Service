import { nanoid } from "nanoid";

export const createShortURL = (longURL) => {
  const urlCode = nanoid(7);

  if (!urlCode) {
     throw new Error("Error Creating unique urlCode");
  }

  const shortURL = `${process.env.BASE_URL}/${urlCode}`;
  const newURLData = {
    longURL,
    shortURL,
    urlCode,
  };

  return newURLData;
};
