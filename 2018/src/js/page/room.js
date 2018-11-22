var hashChange = require('../vendor/hashChange');
var momentTz = require('moment-timezone');

module.exports = function () {
    var overview = document.getElementById('rooms')
    var timeNode = document.getElementById('room-time')
    var rooms = [].slice.call(document.querySelectorAll('.room-list'))
    var allParts = rooms.concat(overview)
    rooms = rooms.map(function (roomNode) {
        var entries = [].slice.call(roomNode.querySelectorAll('li'))
        return {
            node: roomNode,
            entries: entries
        }
    })
    var selectedRoom
    hashChange.addListener(function (hash) {
        var parts = /^[\/|#]?([^-]+)-(.+)/.exec(hash);
        var day = parts && parts[1];
        var roomName = parts && parts[2];
        selectedRoom = null
        if (day) {
            var lookupId = 'list-' + day + '-' + roomName;
            selectedRoom = rooms.filter(function (part) {
                return part.node.id === lookupId;
            })[0];
        }
        console.log(allParts)
        var selectedPart = (selectedRoom && selectedRoom.node) || overview
        allParts.forEach(function (part) {
            if (part === selectedPart) {
                part.style.display = ''
            } else {
                part.style.display = 'none'
            }
        })
    })
    function render () {
        var now = momentTz(Date.now()).tz('Asia/Tokyo')
        timeNode.innerText = now.format('HH:mm')
    }
    render()
    setInterval(render, 100)
}
