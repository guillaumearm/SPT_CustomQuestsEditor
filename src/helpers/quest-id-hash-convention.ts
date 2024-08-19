export const PREFIX_SUFFIX_CQ_CHAR = '#';

export const isSafeId = (id: string): boolean => {
  return id.startsWith(PREFIX_SUFFIX_CQ_CHAR) && id.endsWith(PREFIX_SUFFIX_CQ_CHAR);
};
