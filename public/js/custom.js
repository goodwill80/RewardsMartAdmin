$(document).ready(function () {



var server_url = 'http://localhost:7000/api/rewards';
var server_urlUser = 'http://localhost:7000/api/users';
var pathname = window.location.pathname.split('/');

//Create New Rewards
$('.createForm').on('submit',function(e){
  e.preventDefault();
    $.ajax({
      url: server_url,
      method: "POST",
      headers: {
             "Authorization": "Bearer " + localStorage.getItem('token')
           },
      data: $(".createForm").serialize(),
      dataType: 'json',
      beforeSend: function() {
        }
    }).done(function successFunction(data, res) {

       console.log(res);
       console.log(data);
        window.location.replace("/rewards-admin/" + data._id);
      })
      .fail(failFunction)
      .always(alwaysFunction);
    });

  function failFunction(request, textStatus, errorThrown){

    console.log('An error occurred during your request: ' +  request.status + ' ' + textStatus + ' ' + errorThrown);
  }

  // always function
  function alwaysFunction() {

  }

//delete reward
$('#deleteReward').on("click", function(e){

    e.preventDefault();
    $.ajax({
      url: server_url + "/" + pathname[2],
      method: "DELETE",
      headers: {
             "Authorization": "Bearer " + localStorage.getItem('token')
           }
    }).done(successFunction)
      .fail(failFunction)
      .always(alwaysFunction);


    function successFunction(data) {
      console.log(data);
      console.log("DELETED SUCCESSFULLY");
      window.location.replace("/allrewards");
    }

    function failFunction(request, textStatus, errorThrown){
      // $name.text('An error occurred during your request: ' +  request.status + ' ' + textStatus + ' ' + errorThrown);
      console.log('An error occurred during your request: ' +  request.status + ' ' + textStatus + ' ' + errorThrown);
    }

    // always function
    function alwaysFunction() {
    }
  });

//edit reward
$('.editForm').on("submit", function(e){

    e.preventDefault();

    $.ajax({
      url: server_url + "/" + pathname[2],
      method: "PUT",
      headers: {
             "Authorization": "Bearer " + localStorage.getItem('token')
           },
      dataType: 'json',
      data: $('.editForm').serialize(),
      beforeSend: function() {
        }
    }).done(function successFunction(data, res) {

       console.log(res);
       console.log(data);
        window.location.replace("/rewards-admin/" + data._id);
      })
      .fail(failFunction)
      .always(alwaysFunction);
    });

  function failFunction(request, textStatus, errorThrown){

    console.log('An error occurred during your request: ' +  request.status + ' ' + textStatus + ' ' + errorThrown);
  }

  // always function
  function alwaysFunction() {

  }

//Edit Users
$('.userEditForm').on("submit", function(e){

    e.preventDefault();

    $.ajax({
      url: server_urlUser + "/" + pathname[2],
      method: "PUT",
      headers: {
             "Authorization": "Bearer " + localStorage.getItem('token')
           },
      dataType: 'json',
      data: $('.userEditForm').serialize(),
      beforeSend: function() {
        }
    }).done(function successFunction(data, res) {

       console.log(res);
       console.log(data);
        window.location.replace("/users-admin");
      })
      .fail(failFunction)
      .always(alwaysFunction);
    });

  function failFunction(request, textStatus, errorThrown){
    console.log('An error occurred during your request: ' +  request.status + ' ' + textStatus + ' ' + errorThrown);
  }

  // always function
  function alwaysFunction() {

  }


//New Users
$('.newForm').on('submit',function(e){
  e.preventDefault();
    $.ajax({
      url: server_urlUser,
      method: "POST",
      headers: {
             "Authorization": "Bearer " + localStorage.getItem('token')
           },
      data: $(".newForm").serialize(),
      dataType: 'json',
      beforeSend: function() {
        }
    }).done(function successFunction(data, res) {

       console.log(res);
       console.log(data);
        window.location.replace("/users-admin");
      })
      .fail(failFunction)
      .always(alwaysFunction);
    });

  function failFunction(request, textStatus, errorThrown){

    console.log('An error occurred during your request: ' +  request.status + ' ' + textStatus + ' ' + errorThrown);
  }

  // always function
  function alwaysFunction() {

  }






});
