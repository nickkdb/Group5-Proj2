$(document).ready (function(){
    // function to send a new user to db
    $("#join").on("click", function(event) {

        event.preventDefault()
      //   console.log('TEST CREATE USER');
      
          var newUser = {
            username: $("#userName").val().trim(),
            password: $("#passWord").val().trim(),
          };
    
        //   console.log(newUser);
      
          // Send the POST request.
          $.ajax("/api/users", {
            type: "POST",
            data: newUser
          }).then(
            function() {
              alert("Account creation Successful. Redirecting to account page");
              // need to decide where to redirect users
              window.location.replace("/account");
            }
          );
        });
  
        // function to validate a login
      $("#login").on("click", function(event) {
  
          event.preventDefault()
        //   console.log('TEST CREATE USER');
        
            var user = {
              username: $("#un").val().trim(),
              password: $("#pw").val().trim()
            };
  
        
            // Send the POST request.
            if (user) {
            //   console.log(user);
              $.ajax(`/api/login/${user.username}/${user.password}`, {
                  type: "GET",
                  data: user
                }).then(
                  function(results) {
                      if (results === null) {
                        //   console.log('Invalid login results')
                          alert("Bad Credentials. Enter different password or create new account.")
                      }
                      else if (results.username === user.username && results.password === user.password) {
                          console.log('Login Success!');
                          window.location.replace("/account");
                          
                      }
                      else {
                          console.log('no match');
                      }
                  }
                );
            }
    
          });
})