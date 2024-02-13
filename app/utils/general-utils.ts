export type QueryParams = Record<string, string | undefined>;

export const createQueryString = (params: QueryParams): string => {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return null;
    })
    .filter((part) => part !== null)
    .join("&");
};
