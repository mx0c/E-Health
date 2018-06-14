$(document).ready(function () {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  var pname = localStorage.getItem("pname");
  var pdate = localStorage.getItem("pdate");

    
  pObj = {name:pname,bdate:pdate}
    
  document.getElementById('pname').innerHTML = ("Ihre Warteliste "+ localStorage.getItem("pname"))

  /*$.ajax({
    url:"/getQueueInformations",
    type:"GET",
    data: $.param(pObj),
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
        console.log(data)
        document.getElementById('appointment').innerHTML = ("Ihr Termin ist ursprünglich um "+time +" Uhr.")
        document.getElementById('pdelay').innerHTML = ("Leider gibt es eine Verspätung +"+delay+" Minuten")
        //document.getElementById('pos').innerHTML = ("Vor Ihnen sind noch "+ position+" weitere Patienten. Ihr Termin wird vorraussichtlich "+delay+" Minuten später statt finden!")
        //document.getElementById('nTime').innerHTML = ("Geschätzter tatsächlicher Termin: "+newTime+" Uhr.")
        },
    error: function(data) {
        document.getElementById('appointment').innerHTML = "Authorization FAILED"
    }
  });*/

	$.ajax({
		url:"/getQueueInformations",
	    type:"GET",
		data:$.param(pObj),
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	    success: function(data){
            
        document.getElementById('pos').innerHTML = ("Patient(en) vor Ihnen: "+ data)
            //Ihr Termin wird vorraussichtlich "+delay+" Minuten später statt finden!")
        },
        error: function(res) {
            alert("No Appointment found");
        }    
	});
  });
