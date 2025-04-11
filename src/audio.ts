export async function initAudio(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const audioCtx = new AudioContext();
    const buffer = await audioCtx.decodeAudioData(arrayBuffer);
  
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
  
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
  
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    source.start();
  
    return { audioCtx, analyser };
  }
  