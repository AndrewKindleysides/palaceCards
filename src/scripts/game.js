  $(document).ready(function() {
      var socket = io.connect('http://localhost:3000');
      socket.on('news', function(data) {
          socket.emit('my other event', {
              my: 'data'
          });
      });
  });

  $(document).on('click', '.deck', function() {
          $.ajax('deck/pickUp', {
              method: 'GET',
          }).then(success, fail);
      })
      .on('click', '.hand > .card', function(event) {

          console.log(event.target);
          if (event.target.id) {
              $.ajax('table/cardPlayed', {
                  method: 'POST',
                  data: {
                      id: event.target.id,
                      source: 'hand'
                  }
              }).then(success, fail)
          };
      }).on('click', '.table > .card:not(.faceDown)', function(event) {
          if (event.target.id) {
              $.ajax('table/cardPlayed', {
                  method: 'POST',
                  data: {
                      id: event.target.id,
                      source: 'table',
                      faceUp: true
                  }
              }).then(success, fail)
          };
      }).on('click', '.table > .faceDown', function(event) {
          if (event.target.id) {
              $.ajax('table/cardPlayed', {
                  method: 'POST',
                  data: {

                      id: event.target.id,
                      source: 'table',
                      faceUp: false
                  }
              }).then(success, fail)
          };
      })
      .on('click', '.playedCards', function() {
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
