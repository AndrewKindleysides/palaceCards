$(document).on('click', '.deck', function() {
        $.ajax('deck/pickUp', {
            method: 'GET',
        }).then(success, fail);
    })
    .on('click', '.hand > .card', function(event) {

        $.ajax('table/cardPlayed', {
            method: 'POST',
            data: {
                id: event.target.id
            }
        }).then(success, fail);

    }).on('click', '.playedCards', function() {
        $.ajax('playedCards/pickUp', {
            method: 'GET'
        }).then(success, fail);
    });

function success(res) {
    location.reload(true);
}

function fail(data, status) {
    alert('Request failed.  Returned status of ' + status);
}
