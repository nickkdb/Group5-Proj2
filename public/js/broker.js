$(document).ready (function(){

    var allSongs;
    $.ajax("/api/songs", {
        type: "GET"
    }).then (function(results) {
        allSongs = results;
        console.log(allSongs)
    });

    // function to send a new user to db
    $("#createUser").on("submit", function(event) {

      event.preventDefault()
    //   console.log('TEST CREATE USER');
    
        var newUser = {
          username: $("#userName").val().trim(),
          password: $("#pw").val().trim(),
        };
  
        console.log(newUser);
    
        // Send the POST request.
        $.ajax("/api/users", {
          type: "POST",
          data: newUser
        }).then(
          function() {
            console.log("created new user");
            // need to decide where to redirect users
            location.reload();
          }
        );
      });

      // function to validate a login
    $("#login").on("submit", function(event) {

        event.preventDefault()
      //   console.log('TEST CREATE USER');
      
          var user = {
            username: $("#un").val().trim(),
            password: $("#pw2").val().trim()
          };

      
          // Send the POST request.
          if (user) {
            console.log(user);
            $.ajax(`/api/login/${user.username}/${user.password}`, {
                type: "GET",
                data: user
              }).then(
                function(results) {
                    if (results === null) {
                        console.log('Invalid login results')
                    }
                    else if (results.username === user.username && results.password === user.password) {
                        console.log('Good!');
                    }
                    else {
                        console.log('no match');
                    }
                }
              );
          }
  
        });
  
    $("#createPlaylist").on("submit", function(event) {

        event.preventDefault()
        //   console.log('TEST CREATE USER');
        
            var newPlaylist = {
            title: $("#title").val().trim(),
            description: $("#desc").val().trim(),
            userId: $('#userId').val().trim(),
            category: "Test"
            };
    
            console.log(newPlaylist);
        
            // Send the POST request.
            $.ajax("/api/playlists", {
            type: "POST",
            data: newPlaylist
            }).then(
            function() {
                console.log("created new playlist");
                // need to decide where to redirect users
                location.reload();
            }
            );
        });
  
    // need to create some validation over if a song already exists or not
    $("#addSong").on("submit", function(event) {

        event.preventDefault()
        //   console.log('TEST CREATE USER');
        
            var newSong = {
            title: $("#songTitle").val().trim(),
            artist: $("#artist").val().trim(),
            album: $('#album').val().trim(),
            genre: $('#genre').val().trim(),
            playlistId: $('#playlistId').val().trim(),
            };

            var querySong = {    
                title: $("#songTitle").val().trim(),
                artist: $("#artist").val().trim(),
                album: $('#album').val().trim()
            }
            console.log(querySong);

            var match;
            var oldId;

            for (let i=0; i < allSongs.length; i++) {
                if (querySong.title === allSongs[i].title && querySong.artist === allSongs[i].artist && querySong.album === allSongs[i].album ) {
                    match = true
                    oldId = allSongs[i].id
                }
                else {
                    match = false;
                }
            }

            if (match === true) {
                $.ajax("/api/ps", {
                    type: "POST",
                    data: {playlistId: newSong.playlistId, songId: oldId}
                })
            }
            else {
                $.ajax("/api/songs", {
                    type: "POST",
                    data: newSong
                    }).then(
                    function(results) {
                        console.log("created new song");
                        // need to decide where to redirect users
                        location.reload();
                    }
                    );
            }
    
            // console.log(newSong);
     

            // $.ajax("/api/songs", {
            //     type: "GET",
            //     data: querySong
            // }).then(function(results){
            //     if (results === null) {
            //     // Send the POST request.
            //     $.ajax("/api/songs", {
            //         type: "POST",
            //         data: newSong
            //         }).then(
            //         function(results) {
            //             console.log(results);
            //             // need to decide where to redirect users
            //             // location.reload();
            //             }
            //         );
            //     }
            //     else {
            //         $.ajax("/api/ps", {
            //             type: "POST",
            //             data: {playlistId: newSong.playlistId, songId: results.id}
            //         })
            //     }
            // })
        
        });
})
  
  