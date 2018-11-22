var hashChange = require('../vendor/hashChange');

module.exports = function () {
    var overview = document.getElementById('rooms')
    var rooms = [].slice.call(document.querySelectorAll('.room-list'))
    var allParts = rooms.concat(overview)
    hashChange.addListener(function (hash) {
        var parts = /^[\/|#]?([^-]+)-(.+)/.exec(hash);
        var day = parts && parts[1];
        var roomName = parts && parts[2];
        var selectedPart
        if (day) {
            var lookupId = 'list-' + day + '-' + roomName;
            console.log(parts)
            selectedPart = rooms.filter(function (part) {
                console.log(lookupId, '...', part.id)
                return part.id === lookupId;
            })[0];
        }
        if (!selectedPart) {
            selectedPart = overview
        }
        console.log(allParts)
        allParts.forEach(function (part) {
            if (part === selectedPart) {
                part.style.display = ''
            } else {
                part.style.display = 'none'
            }
        })
    })
}
