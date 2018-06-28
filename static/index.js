/* eslint-env browser */
/* eslint-disable semi */
console.log('TEST')
var remove = document.getElementById('js-remove')
console.log(remove)

if (remove) {
  remove.addEventListener('click', onremove)
}

function onremove(ev) {
  var node = ev.target
  var id = node.dataset.id
  console.log(id)
  console.log(node)


  fetch('/' + id, {method: 'delete'})
    .then(onresponse)
    .then(onload, onfail)
    console.log(id)

  function onresponse(res) {
    return res.json()
  }

  function onload() {
    window.location = '/matches'
    console.log("deleted")
  }

  function onfail() {
    throw new Error('Could not delete!')
  }
}

//addEventListener voor berichten
var speechbubble = document.getElementById('speechbubble')
var text = document.getElementById('text')

console.log(speechbubble)


speechbubble.addEventListener('click', function () {
    text.classList.add('active')
})
