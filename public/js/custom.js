$(document).ready(function () {


//post new product (single)

var server_url = 'http://localhost:7000/api/rewards';

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








});
