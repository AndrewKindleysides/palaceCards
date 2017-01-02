$(document).on('click', '.deck', function () {
    $.ajax('deck/pickUp', {
        method: 'GET',
    }).then(success, fail);
});

$(document).on('click', '.hand', function (event) {
    $.ajax('table/cardPlayed', {
        method: 'POST',
        data: {
            id: event.target.id
        }
    }).then(success, fail);
});

function success(res) {
    location.reload(true);
}

function fail(data, status) {
    alert('Request failed.  Returned status of ' + status);
}
