function hasGetUserMedia() {
  return !!(navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
  <audio autoplay></audio>

<script>
const constraints = {
  audio: true
};

const audio = document.querySelector('audio');

navigator.mediaDevices.getUserMedia(constraints).
  then((stream) => {video.srcObject = stream});
</script>
} else {
  alert('getUserMedia() is not supported by your browser');
}
