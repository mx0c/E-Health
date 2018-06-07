$(document).ready(function () {
  
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
  $.ajax({
    url:"/getAppointments",
    type:"GET",
    headers: {
      "authorization":cookieValue
    },
    success: function(data, status) {
      var delay = ""
      var position = ""
      var newTime = ""
      var arrayLength = data.length;
      
      for (var i = 0; i < arrayLength; i++) {
          position += data[i].name
          delay += data[i].time
          delay += data[i].estDuration
      
      }
        document.getElementById('appointment').innerHTML = ("Ihr Termin ist ursprünglich um "+time +" Uhr.")
        document.getElementById('pdelay').innerHTML = ("Leider gibt es eine Verspätung +"+delay+" Minuten")
        document.getElementById('pos').innerHTML = ("Vor Ihnen sind noch "+ position+" weitere Patienten. Ihr Termin wird vorraussichtlich "+delay+" Minuten später statt finden!")
        document.getElementById('nTime').innerHTML = ("Geschätzter tatsächlicher Termin: "+newTime+" Uhr.")
    },
    error: function(data) {
        document.getElementById('appointment').innerHTML = "Authorization FAILED"
    }
  });
});