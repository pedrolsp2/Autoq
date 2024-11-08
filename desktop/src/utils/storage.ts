// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setItem = (storage: Storage, key: string, value: any) =>
  storage.setItem(key, value);

export const getItem = (Storage: Storage, key: string) => Storage.getItem(key);

export const removeItem = (Storage: Storage, key: string) =>
  Storage.removeItem(key);
