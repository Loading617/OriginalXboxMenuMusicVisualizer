import { initAudio } from "./audio";
import { initVisualizer } from "./visualizer";

document.getElementById("audio-file")!.addEventListener("change", async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const { audioCtx, analyser } = await initAudio(file);
    initVisualizer(analyser, audioCtx);
  }
});
