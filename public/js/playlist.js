$(document).ready(function () {

    // grab all songs to use as needed for validation
    var allSongs;
    $.ajax("/api/songs", {
        type: "GET"
    }).then(function (results) {
        allSongs = results;
        console.log(allSongs)
    });

    // grab the playlist id from the url
    var url = window.location.href;
    let regex= /playlist\/[\d]+/;
    var id = url.match(regex);
    id= id[0].split("/")[1];
    console.log(id);

    // grab all of the playlist songs to display on page
    var plSongs;
    $.ajax(`/api/playlists/${id}`, {
        type: "GET"
    }).then(function (results) {
        console.log(results)

        // set the headers equal to playlist data
        $('#plTitle').text(results.title);
        $('#plCat').text(results.category);
        $('#plDesc').text(results.description);

        var songs = results.playlistSong;

        // create a row for each song in the playlist
        for (let i = 0; i < songs.length; i++) {
            let songRow = `<li>${songs[i].title}<br>${songs[i].artist}<br>${songs[i].album}<button data-songid='${songs[i].id}' class='delSong uk-button'>Delete</button><hr></li>`
            $('#plSongs').append(songRow);
        }
    });

    // add a song and add to playlist; validate if a song already exists or not
    $(document).on("click", ".addSong", function (event) {

        event.preventDefault()
        //   console.log('TEST CREATE USER');
        console.log($(this).data('title'));

        // the new song to add
        var newSong = {
            title: $(this).data('title').trim(),
            artist: $(this).data('artist').trim(),
            album: $(this).data('album').trim(),
            // genre: $('#genre').val().trim(),
            playlistId: id,
        };

        // song - the id to query its existence in DB
        var querySong = {
            title: $(this).data('title').trim(),
            artist: $(this).data('artist').trim(),
            album: $(this).data('album').trim()
        }
        console.log(querySong);

        var match;
        var oldId;

        // see if the current song matches in the DB
        for (let i = 0; i < allSongs.length; i++) {
            if (querySong.title === allSongs[i].title && querySong.artist === allSongs[i].artist && querySong.album === allSongs[i].album) {
                match = true
                oldId = allSongs[i].id
            }
            else {
                match = false;
            }
        }

        // if it matches, don't create new song; just create new association in playlist_songs
        if (match === true) {
            $.ajax("/api/ps", {
                type: "POST",
                data: { playlistId: newSong.playlistId, songId: oldId }
            })
        }
        // otherwise, create new song and new association
        else {
            $.ajax("/api/songs", {
                type: "POST",
                data: newSong
            }).then(
                function (results) {
                    console.log("created new song");
                    // need to decide where to redirect users
                }
            );
        }
        location.reload();

    });


    // Grab spotify tokens and make a call 
    $("#searchSpotify").on("click", function (event) {
        event.preventDefault();

        // Get the values from the search form
        var type = $('#type').val().trim().toLowerCase();
        var search = $('#search').val().trim();
        search = search.replace(/\s/g, '%20');
        console.log(search, type);

        // make an ajax call to get the spotify tokens
        // then make spotify call for data
        // then append html with data
        $.ajax("/api/tokens", {
            type: "GET"
        }).then(function (key) {
            $.ajax(`https://api.spotify.com/v1/search?q=${search}&limit=10&type=${type}`, {
                type: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${key.tokenType} ${key.accessToken}`
                }
            }).then(function (results) {
                console.log(results)
                var spot;
                var spotDiv = $('#spotResults');

                if (type === 'artist') {
                    spot = results.artists.items;
                    spotDiv.empty();

                    // header
                    var resultTable = `<h4>Results</h4><table id="table"><tr><th>Artist</th><th>Followers</th><th>Actions</th><th>Actions</th></tr></table>`;
                    spotDiv.append(resultTable);

                    // append rows
                    for (let i = 0; i < spot.length; i++) {
                        let row = `<tr>
                            <td>${spot[i].name}</td>
                            <td>${spot[i].followers.total}</td>
                            <td><button class="viewAlb">View Albums</button></td>
                            <td><button class="viewSongs">View Songs</button></td>
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
                    for (let i = 0; i < spot.length; i++) {
                        let row = `<li>${spot[i].name}<br>
                        ${spot[i].artists[0].name}<br>
                        ${spot[i].album.name}<br>
                        <img src="${spot[i].album.images[2].url}"><br>
                        <button class="uk-button add-btn" uri= "${spot[i].uri}" data-title="${spot[i].name}" data-album="${spot[i].album.name}" data-artist="${spot[i].artists[0].name}" id="${spot[i].id}" 
                        class="addQ" action="submit">Add Song</button><hr>`;

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
                    for (let i = 0; i < spot.length; i++) {
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

    //Function for deleting specific songs from a playlist
    // $(document).on("click", ".delSong", function () {

    
    //     let remove = $(this).data("songid");
        
    //     console.log(id);

        // $.ajax("/" + id, {
        //     type: "DELETE"
        // }).then(
        //     function () {
        //         console.log("deleted id ", id);

        //         location.reload();
        //     }
        // );
    //});


    // Function for handling what happens when the delete button is pressed
    $("#deletePlaylist").on("click", function () {

        //targets playlist that was clicked
        let deleted = $(this).data(id);

        console.log(deleted);

        //ajax call to delete a playlist
        $.ajax("/api/playlists" + deleted, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted id ", deleted);

                location.reload();
            }
        );
    });



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