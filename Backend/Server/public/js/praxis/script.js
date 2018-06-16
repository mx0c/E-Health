
// document ready function
$(document).ready(function () {
  console.log("praxis page loaded");

  // load appointments
  GetAppointments()
  
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  document.getElementById("CurrentDate").innerHTML = "Warteliste für den " + dd + '.' + mm + '.' + yyyy
  
  // create user function
  // called after pressing "Termin Anlegen" button
  $("#createuser").click(function () {
    var name = $("#name").val();
    var bdate = $("#bdate").val().toString();
    var date = $("#date").val().toString();
    var time = $("#time").val().toString();
    var duration = $("#duration").val();

    if ((name == "")||(bdate == "")||(date == "")||(time == "")||(duration == ""))
    {
      document.getElementById("invalideText").innerHTML = "Bitte alles ausfüllen!";
    }
    else
    {  
      var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      // clear inpout fields before sending data to the database -> more responsive 
      $("#name").val('')
      $("#bdate").val('')
      $("#date").val('')
      $("#time").val('')
      $("#duration").val('')
      
      // send data to database
      $.ajax({
        url:"/createAppointment",
        type:"POST",
        headers: {
        "authorization":cookieValue
        },
        data:JSON.stringify({name:name,bdate:bdate,date:date,time:time,estDuration:duration}),
        contentType:"application/json; charset=utf8",
        success: function() {
          GetAppointments()
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(thrownError);
        }
      });
    }
  });

  });

// delete appointement function
// called after pressing "Löschen" button of an appointement
function deleteAppointment(id) {

    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    // remove appointment from html before deleting it from the database -> more responsive
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
    FixTableRows()
    
    // delete appointment from database
   $.ajax({
      url:"/deleteAppointment",
      type:"POST",
      headers: {
      "authorization":cookieValue
      },
      data:JSON.stringify({id:id}),
      contentType:"application/json; charset=utf8",
      success: function() {
        console.log("appointment deleted")
        //$(location).attr('href', '/praxis.html')
        //GetAppointments() 
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      }
    });
}

// change status of appointment
// called after checking or unchecking a status checkbox
function ChangeStatus(id) {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  var checkbox = document.getElementById(id+"_c");
  var status = checkbox.checked
  
  $.ajax({
    url:"/changeAppointmentStatus",
    type:"POST",
    headers: {
    "authorization":cookieValue
    },
    data:JSON.stringify({id:id, status:status}),
    contentType:"application/json; charset=utf8",
    success: function() {
      console.log("Status changed")
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
    }
  });
}

// get all appointments from the database and write them in the html
function GetAppointments() {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  $.ajax({
    url:"/getAppointments",
    type:"GET",
    headers: {
      "authorization":cookieValue
    },
    success: function(data, status) {
      document.getElementById('appointments').innerHTML = ""
      var arrayLength = data.length;
      for (var i = 0; i < arrayLength; i++) {
          AddAppointmentToHtml(i, data[i]._id, data[i].name, data[i].bdate, data[i].time, data[i].estDuration, data[i].finished)
      }
    },
    error: function(data) {
      document.getElementById('appointments').innerHTML = "<p>authorization FAILED</p>"
    }
  });
}

// sets correct row number in the first collum
function FixTableRows() {
  var children = document.getElementById('appointments').children;
  for (var i = 0; i < children.length; i++) {
    children[i].getElementsByTagName('th')[0].innerHTML = i+1
  }
}

// append an appointement in the html file
function AddAppointmentToHtml(i, id, name, bdate, time, estDuration, finished) {
  var html = '<tr id=' + id + ' >'
  
  html += '<th scope="row">'
  html += i+1
  html += '</th>'
  
  html += '<td>'
  html += name
  html += '</td>'
  
  html += '<td>'
  var date = new Date(bdate)
  html += date.getDate() + '.'
  html += (date.getMonth()+1)+ '.'
  html += date.getFullYear()
  html += '</td>'
  
  html += '<td>'
  html += time
  html += '</td>'
  
  html += '<td>'
  html += estDuration
  html += '</td>'
  
  html += '<td>'
  var checked = ""
  if (finished) {checked = " checked"}
  html += '<input id=' + id + '_c type="checkbox" onclick="ChangeStatus(\'' + id +'\')"' + checked + '>'
  html += '</td>'
  
  html += '<td>'
  html += '<a class="btn btn-default" onclick="deleteAppointment(\'' + id +'\')">Löschen</a>'
  html += '</td>'
  
  html += '</tr>'
  
  // append new code to appointements table
  document.getElementById('appointments').innerHTML += html
}



