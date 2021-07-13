export const toUrlFriendly = (str) => str.replace(/\s+/g, "-").toLowerCase();

export const toSpacedTitleCase = (str) => {
  return str
    .toLowerCase()
    .replace(/(?:^|[\s-/])\w/g, function (match) {
      return match.toUpperCase();
    })
    .replace("-", " ");
};
