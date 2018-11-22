var hashChange = require('../vendor/hashChange');
var momentTz = require('moment-timezone');

function compareHmm (time, now) {
    if (time.hours() === now.hours()) {
        if (time.minutes() === now.minutes()) {
            return 0
        }
        if (time.minutes() < now.minutes()) {
            return -1
        }
        return 1
    }
    if (time.hours() < now.hours()) {
        return -1
    }
    return 1
}

function toggle (node, clazz, flag) {
    if (flag) {
        if (!node.classList.contains(clazz)) {
            node.classList.add(clazz)
        }
    } else {
        if (node.classList.contains(clazz)) {
            node.classList.remove(clazz)
        }
    }
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
            var end = entryNode.attributes['data-end']
            entryNode.end = momentTz(end.value).tz('Asia/Tokyo')
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

    function updateTime (time) {
        if (time !== timeNode.innerText) {
            timeNode.innerText = time
        }
    }

    function render () {
        var now = momentTz(Date.now()).tz('Asia/Tokyo')
        if (hour) {
            now.hours(hour)
        }
        if (minute) {
            now.minutes(minute)
        }
        updateTime(now.format('HH:mm'))
        if (!selectedRoom) {
            return
        }
        var beforeStart = true
        var previous
        var before
        var after
        var current
        selectedRoom.entries.forEach(function (entryNode) {
            var isBefore = compareHmm(entryNode.end, now) === -1
            var isAfter = compareHmm(entryNode.start, now) === 1
            // console.log(entryNode.start.format('HH:mm'), now.format('HH:mm'), entryNode.end.format('HH:mm'), isBefore, isAfter)
            var isCurrent = !isBefore && !isAfter
            if (isCurrent || isBefore) {
                beforeStart = false
            }
            if (isCurrent) {
                before = previous
                current = entryNode
            }
            if (isAfter && !after) {
                after = entryNode
            }
            previous = entryNode
            return isCurrent
        })
        var afterFinish = !current && !beforeStart
        if (afterFinish) {
            before = previous
        }
        selectedRoom.entries.forEach(function (entryNode) {
            toggle(entryNode, 'room-entry-current', entryNode === current)
            toggle(entryNode, 'room-entry-after', entryNode === after)
            toggle(entryNode, 'room-entry-before', entryNode === before)
        })
        toggle(selectedRoom.first, 'room-entry-current', beforeStart)
        toggle(selectedRoom.first, 'room-entry-before', selectedRoom.entries[0].classList.contains('room-entry-current'))
        toggle(selectedRoom.last, 'room-entry-current', afterFinish)
        toggle(selectedRoom.last, 'room-entry-after', selectedRoom.entries[selectedRoom.entries.length - 1].classList.contains('room-entry-current'))
        toggle(selectedRoom.node, 'room-before-start', beforeStart)
        toggle(selectedRoom.node, 'room-after-finish', afterFinish)
    }
    render()
    setInterval(render, 100)
}
