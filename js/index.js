function getMedia() {
  if (navigator.mediaDevices.getUserMedia) {
    var promise = localStream = navigator.mediaDevices.getUserMedia({
      'video': true,
      'audio': false
    }).then(successFunc).catch(errorFunc);
  } else {
    alert('Native device media streaming (getUserMedia) not supported in this browser.');
  }
}
var localStream;

function successFunc(stream) {
  video.src = window.URL && window.URL.createObjectURL(stream) || stream;
  renderCvs();
}

function errorFunc(e) {
  console.error(e);
}

function closeMedia() {
  video.src = '';
  var c = canvas.getContext('2d');
  c.clearRect(0,0,canvas.width,canvas.height);  
}
function pauseMedia() {
  video.src = '';
}

function renderCvs() {
  requestAnimationFrame(getVideoToCvs);
}

function getVideoToCvs() {
  // console.count();
  var c = canvas.getContext('2d');
  c.drawImage(video,0,0,canvas.width,canvas.height);
  requestAnimationFrame(getVideoToCvs);
}
