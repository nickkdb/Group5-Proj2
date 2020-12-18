$(document).ready (function(){

    var url = window.location.href;
    var id = url[url.length-1];
    console.log(id);
    
    // grab all songs to use as needed for validation
    var plSongs;
    $.ajax(`/api/playlists/${id}`, {
        type: "GET"
    }).then (function(results) {
        console.log(results)
        $('#plTitle').text(results.title);
        $('#plCat').text(results.category);
        $('#plDesc').text(results.description);

        var songs = results.playlistSong;

        for (let i=0; i < songs.length; i++){
            let songRow = `<li>${songs[i].title} | ${songs[i].artist} | ${songs[i].album} </li>`
            $('#plSongs').append(songRow);
        }
    });

    // need to create some validation over if a song already exists or not
    $(document).on("submit",".addSong", function(event) {

        event.preventDefault()
        //   console.log('TEST CREATE USER');
        console.log($(this).)

        // grab all songs to use as needed for validation
        var allSongs;
        $.ajax("/api/songs", {
            type: "GET"
        }).then (function(results) {
            allSongs = results;
            console.log(allSongs)
        });
        
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
        
        });


    // Grab spotify tokens and make a call 
    $("#searchSpotify").on("click", function(event){
        event.preventDefault();

        // Get the values from the search form
        var type = $('#type').val().trim().toLowerCase();
        var search = $('#search').val().trim();
        search = search.replace(/ /g, '%20');
        console.log(search, type);

       // make an ajax call to get the spotify tokens
       // then make spotify call for data
       // then append html with data
        $.ajax("/api/tokens", {
            type: "GET"
        }).then(function(key){
            $.ajax(`https://api.spotify.com/v1/search?q=${search}&limit=10&type=${type}`, {
                type: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${key.tokenType} ${key.accessToken}`
                }
            }).then(function(results){
                console.log(results)
                var spot;
                var spotDiv = $('#spotResults');

                if (type === 'artist'){
                    spot = results.artists.items;
                    spotDiv.empty();

                    // header
                    var resultTable = `<h4>Results</h4><table id="table"><tr><th>Artist</th><th>Followers</th><th>Actions</th><th>Actions</th></tr></table>`;
                    spotDiv.append(resultTable);

                    // append rows
                    for (let i=0; i < spot.length; i++) {
                        let row = `<tr>
                            <td>${spot[i].name}</td>
                            <td>${spot[i].followers.total}</td>
                            <td><button class="viewAlb">View Albums</button></td>
                            <td><button class="viewSongs">View Albums</button></td>
                        </tr>`;

                        $('#table').append(row);

                    }
                }
                else if (type === 'track') {
                    spot = results.tracks.items;
                    spotDiv.empty();

                    // table header
                    var resultTable = `<h4>Results</h4><table id="table"><tr><th>Track</th><th>Artist</th><th>Album</th><th>Actions</th></tr></table>`;
                    spotDiv.append(resultTable);

                    // table rows
                    for (let i=0; i < spot.length; i++) {
                        let row = `<form class="addSong"><tr>
                            <td name="title">${spot[i].name}</td>
                            <td name="album">${spot[i].album.name}</td>
                            <td name="artist">${spot[i].artists[0].name}</td>
                            <td><button data-title="${spot[i].name}" id="${spot[i].id}" action="submit">Add Song</button></td>
                        </tr></form>`;

                        $('#table').append(row);

                    }
                }
                else {
                    spot = results.albums.items;
                    spotDiv.empty();

                    // table header
                    var resultTable = `<h4>Results</h4><table id="table"><tr><th>Track</th><th>Artist</th><th>Album</th><th>Actions</th></tr></table>`;
                    spotDiv.append(resultTable);

                    // table rows
                    for (let i=0; i < spot.length; i++) {
                        let row = `<tr>
                            <td>${spot[i].name}</td>
                            <td>${spot[i].artists[0].name}</td>
                            <td><img src=${spot[i].images[2].url}></td>
                            <td><button class="addBtn">View Songs</button></td>
                        </tr>`;

                        $('#table').append(row);

                    }
                }

                
        
            });
            
        })

    })

    // $(document).on("click",".addQ", function(event) {
    //     var qdiv = $('#q');
    //     var qId = $(this).attr('id');
    //     var qTitle = $(this).attr('data-title');
    //     console.log(qTitle);
    //     var newQ = `<p id="${qId}" class="playTrack">${qTitle}</p>`;

    //     qdiv.append(newQ);

    // })

    // $(document).on("click",".playTrack", function(event) {
    //     var qdiv = $('#q');

    //     var trackId = $(this).attr('id');
         
    //     var embed = 
    //     `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
    

    //     qdiv.append(embed);

    // })

})