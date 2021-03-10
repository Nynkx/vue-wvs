import preloadJrWorker from "./foxit-lib/preload-jr-worker";
import { licenseKey, licenseSN } from "./license-key";

window.readyWorker = preloadJrWorker({
  workerPath: "foxit-lib/",
  enginePath: "jr-engine/gsdk",
  fontPath: "assets/external/brotli",
  licenseSN,
  licenseKey,
});
