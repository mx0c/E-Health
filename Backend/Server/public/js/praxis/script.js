function deleteAppointment(id) {
    
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    
   $.ajax({
      url:"/deleteAppointment",
      type:"POST",
      headers: {
      "authorization":cookieValue
      },
      data:JSON.stringify({id:id}),
      contentType:"application/json; charset=utf8",
      success: function() {
        $(location).attr('href', '/praxis.html')
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      }
    });
    
    
    
}
  
$(document).ready(function () {
  console.log("praxis page loaded");
  
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  $.ajax({
    url:"/getAppointments",
    type:"GET",
    headers: {
      "authorization":cookieValue
    },
    success: function(data, status) {    
      var html = ""   
      var arrayLength = data.length; 
      for (var i = 0; i < arrayLength; i++) {
          html += '<tr>'
          html += '<th scope="row">'
          html += i+1
          html += '</th>'
          html += '<td>'
          html += data[i].name
          html += '</td>'
          html += '<td>'
          var date = new Date(data[i].bdate)
          html += date.getDate() + '.'
          html += date.getMonth()+ '.'
          html += date.getFullYear()
          html += '</td>'
          html += '<td>'
          html += data[i].time
          html += '</td>'
          html += '<td>'
          html += data[i].estDuration
          html += '</td>'
          html += '<td>'
          html += '<input type="checkbox">'
          html += '</td>'
          html += '<td>'        
          html += '<a id="' + i + '" class="btn btn-default" onclick="deleteAppointment(\'' + data[i]._id +'\')">Löschen</a>'    
          html += '</td>'
          html += '</tr>'
      }
      
      document.getElementById('appointments').innerHTML = html
      
    },
    error: function(data) {
      document.getElementById('appointments').innerHTML = "<p>authorization FAILED</p>"
    }
  });

  $("#createuser").click(function () {  
    var name = $("#name").val();
    var bdate = $("#bdate").val().toString();
    var date = $("#date").val().toString();
    var time = $("#time").val().toString();
    var duration = $("#duration").val();
    
    if ((name == "")||(bdate == "")||(date == "")||(time == "")||(duration == ""))
    {
      console.log("test")
      
      document.getElementById("invalideText").innerHTML = "Bitte alles ausfüllen!";
    }
    else
    { 
      var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      $.ajax({
        url:"/createAppointment",
        type:"POST",
        headers: {
        "authorization":cookieValue
        },
        data:JSON.stringify({name:name,bdate:bdate,date:date,time:time,estDuration:duration}),
        contentType:"application/json; charset=utf8",
        success: function() {
          $(location).attr('href', '/praxis.html')
          
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(thrownError);
        }
      });
    }
    
  }); 
  
});