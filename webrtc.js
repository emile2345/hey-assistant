async function startMicrophone() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    })

    console.log("Micro OK", stream)
    window.localStream = stream
  } catch (e) {
    alert("Micro refusé : " + e.message)
  }
}
