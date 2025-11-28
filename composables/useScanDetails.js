import { ref, onMounted } from 'vue';
import { useScansStore } from '~/stores/scans';

export const useScanDetails = () => {
  const scansStore = useScansStore();
  const currentScanId = ref(null);
  
  const showScanDetails = (scanId) => {
    currentScanId.value = scanId;
    // Stocker dans l'URL
    const url = new URL(window.location.href);
    url.searchParams.set('scanId', scanId);
    window.history.replaceState({}, '', url.toString());
  };

  const clearScanDetails = () => {
    currentScanId.value = null;
    // Nettoyer l'URL
    const url = new URL(window.location.href);
    url.searchParams.delete('scanId');
    window.history.replaceState({}, '', url.toString());
  };

  // Pour utilisation dans secuscan/index.vue
  const initFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const scanIdParam = urlParams.get('scanId');
    
    if (scanIdParam) {
      const scan = scansStore.getScanById(parseInt(scanIdParam));
      if (scan) {
        return scan;
      }
    }
    return null;
  };

  return {
    currentScanId,
    showScanDetails,
    clearScanDetails,
    initFromUrl
  };
};