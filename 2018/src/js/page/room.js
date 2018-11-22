var hashChange = require('../vendor/hashChange');
var momentTz = require('moment-timezone');

function replaceFlag (oldNode, newNode, flag) {
    oldNode && oldNode.classList.remove(flag)
    newNode && newNode.classList.add(flag)
    return newNode
}

module.exports = function () {
    var overview = document.getElementById('rooms')
    var timeNode = document.getElementById('room-time')
    var rooms = [].slice.call(document.querySelectorAll('.room-list'))
    var allParts = rooms.concat(overview)
    rooms = rooms.map(function (roomNode) {
        var entries = [].slice.call(roomNode.querySelectorAll('li'))
        var first = entries.shift()
        var last = entries.pop()
        entries.forEach(function (entryNode) {
            var start = entryNode.attributes['data-start']
            entryNode.start = momentTz(start.value).tz('Asia/Tokyo')
        })

        return {
            node: roomNode,
            entries: entries,
            first: first,
            last: last
        }
    })
    var selectedRoom
    var hour
    var minute
    hashChange.addListener(function (hash) {
        var parts = /^[\/|#]?([^-]+)-([^-]+)(-(\d{2}):(\d{2}))?/.exec(hash);
        var day = parts && parts[1];
        var roomName = parts && parts[2];
        hour = parts && parts[4];
        minute = parts && parts[5];
        selectedRoom = null
        if (day) {
            var lookupId = 'list-' + day + '-' + roomName;
            selectedRoom = rooms.filter(function (part) {
                return part.node.id === lookupId;
            })[0];
        }
        var selectedPart = (selectedRoom && selectedRoom.node) || overview
        allParts.forEach(function (part) {
            if (part === selectedPart) {
                part.style.display = ''
            } else {
                part.style.display = 'none'
            }
        })
    })

    var before
    var after
    var current

    function render () {
        var now = momentTz(Date.now()).tz('Asia/Tokyo')
        if (hour) {
            now.hours(hour)
        }
        if (minute) {
            now.minutes(minute)
        }
        timeNode.innerText = now.format('HH:mm')
        if (!selectedRoom) {
            return
        }
        var newBefore
        var newCurrent = selectedRoom.first
        var newAfter = selectedRoom.entries[0]
        selectedRoom.entries.forEach(function (entryNode) {
            var isBefore = entryNode.start.hours() < now.hours() ||
                entryNode.start.hours() === now.hours() && entryNode.start.minutes() < now.minutes()
            if (isBefore) {
                newBefore = newCurrent
                newCurrent = entryNode
                newAfter = null
            } else if(!newAfter) {
                newAfter = entryNode
            }
        })
        if (!newAfter) {
            newAfter = selectedRoom.last
        }
        current = replaceFlag(current, newCurrent, 'room-entry-current')
        before = replaceFlag(before, newBefore, 'room-entry-before')
        after = replaceFlag(after, newAfter, 'room-entry-after')
    }
    render()
    setInterval(render, 100)
}
