import { ref } from 'vue';

export function useOnlineStatus() {
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true);

  function updateStatus() {
    isOnline.value = navigator.onLine;
    console.log('NEW STATUS: ', isOnline.value);
  }
  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);

  return isOnline.value;
}
