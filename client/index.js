
import domToImage from 'dom-to-image';

const remoteEl = document.getElementById('remote');

setTimeout(function () {
  domToImage
    .toPng(remoteEl.contentDocument.body)
    .then(function (img) {
      return fetch('/image', {
        body: JSON.stringify({ img: img }),
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    })
    .catch(error => console.log('error', error))
  ;
}, 1000);
