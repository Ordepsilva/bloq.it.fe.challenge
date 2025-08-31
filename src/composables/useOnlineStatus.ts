import { useOnline } from '@vueuse/core';
export function useOnlineStatus() {
  const online = useOnline();
  return online;
}
