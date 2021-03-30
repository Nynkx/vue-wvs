import preloadJrWorker from './foxit-lib/preload-jr-worker';
import { licenseKey, licenseSN } from './license-key';

window.readyWorker = preloadJrWorker({
  workerPath: process.env.NODE_ENV === 'production' ? 'foxit-lib/' : '/foxit-lib/',
  enginePath: 'jr-engine/gsdk',
  fontPath: 'assets/external/brotli',
  licenseSN,
  licenseKey,
});
