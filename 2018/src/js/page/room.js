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

function findNode (type, node, op) {
    node = op(node)
    while (node) {
        if (type.test(node.nodeName)) {
            return node
        }
        node = op(node)
    }
    return null
}

module.exports = function () {
    var overview = document.getElementById('rooms-container')
    var timeNode = document.getElementById('room-time')
    var rooms = [].slice.call(document.querySelectorAll('.room-list'))
    var allParts = rooms.concat(overview)
    rooms = rooms.map(function (roomNode) {
        var entries = [].slice.call(roomNode.querySelectorAll('li'))
        var before = entries.shift()
        var after = entries.pop()
        entries.forEach(function (entryNode) {
            var start = entryNode.attributes['data-start']
            entryNode.start = momentTz(start.value).tz('Asia/Tokyo')
            var end = entryNode.attributes['data-end']
            entryNode.end = momentTz(end.value).tz('Asia/Tokyo')
        })

        return {
            node: roomNode,
            entries: entries,
            allEntries: [before].concat(entries).concat(after),
            before: before,
            after: after
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
        var current
        var firstEntry = selectedRoom.entries[0]
        if (compareHmm(firstEntry.start, now) > 0) {
            current = selectedRoom.before
        } else {
            selectedRoom.entries.forEach(function (entryNode) {
                var isAfter = compareHmm(entryNode.start, now) < 0
                if (isAfter && !current) {
                    current = entryNode
                }
            })
            if (!current) {
                current = selectedRoom.after
            }
        }
        var nextSibling = findNode(/^li$/ig, current, function (curr) { return curr.nextSibling })
        var prevSibling = findNode(/^li$/ig, current, function (curr) { return curr.previousSibling })
        selectedRoom.allEntries.forEach(function (entryNode) {
            toggle(entryNode, 'room-entry-current', entryNode === current)
            toggle(entryNode, 'room-entry-after', entryNode === nextSibling)
            toggle(entryNode, 'room-entry-before', entryNode === prevSibling)
        })
        toggle(selectedRoom.node, 'room-before-start', current === selectedRoom.before)
        toggle(selectedRoom.node, 'room-after-finish', current === selectedRoom.after)
    }
    render()
    setInterval(render, 100)
}
