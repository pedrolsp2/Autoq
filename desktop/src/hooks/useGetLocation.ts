export const useGetLocation = (pathname: string) => {
  if (!pathname) return;
  if (pathname === '/') return ['Inicio'];
  const arrays = pathname.trim().split('/');
  return arrays
    .filter((item) => item)
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    });
};
