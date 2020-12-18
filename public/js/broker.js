$(document).ready (function(){

    var userId;
    var pl;

        // Send the POST request.
        $.ajax("/api/session", {
            type: "GET"
            }).then(
            function(results) {
                userId = results;
                console.log(userId);

                $.ajax(`/api/users/${userId}/playlists`, {
                    type: "GET"
                }).then (function(results) {
                    pl = results[0];
                    console.log(pl);

                    $('#pi').text(`${pl.username}'s 5Wire`);

                    for(let i=0; i < pl.playlists.length; i++){
                        let row = `<p id="${pl.playlists[i].id}">${pl.playlists[i].title}</p><a href="/playlist/${pl.playlists[i].id}">View/Edit</a>`
                        $('#userPlaylists').append(row);
                    }
    
                });
            }
            );



    $("#createPlaylist").on("click", function(event) {

        event.preventDefault()
        //   console.log('TEST CREATE USER');
        
            var newPlaylist = {
            title: $("#title").val().trim(),
            description: $("#desc").val().trim(),
            userId: userId,
            category: "Test"
            };
    
            console.log(newPlaylist);
        
            // Send the POST request.
            $.ajax("/api/playlists", {
            type: "POST",
            data: newPlaylist
            }).then(
            function(res) {
                console.log("created new playlist");
                // need to decide where to redirect users
                window.location.replace(`/playlist/${res.id}`);
            }
            );
        });
  
})
  
  