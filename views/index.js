/* eslint-env browser */
/* eslint-disable semi */
console.log('hallo')
console.log('TEST')
var remove = document.getElementById('js-remove')
console.log(remove)
var id = node.dataset.id
console.log(id)

if (remove) {
  remove.addEventListener('click', onremove)
}


function onremove(ev) {
  var node = ev.target
  var id = node.dataset.id


  fetch('/' + id, {method: 'delete'})
    .then(onresponse)
    .then(onload, onfail)

  function onresponse(res) {
    return res.json()
  }

  function onload() {
    window.location = '/matches'
  }

  function onfail() {
    throw new Error('Could not delete!')
  }
}
