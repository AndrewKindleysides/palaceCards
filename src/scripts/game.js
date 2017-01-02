$(document).on('click', '.deck', function () {
    $.ajax('deck/pickUp', {
        method: 'GET',
    }).then(success, fail);
});

function success(res) {
    location.reload(true);
}

function fail(data, status) {
    alert('Request failed.  Returned status of ' + status);
}
