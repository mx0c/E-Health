$(document).ready(function () {
 // get Patient Infos  
  var pname = localStorage.getItem("pname");
  var pdate = localStorage.getItem("pdate");
  pObj = {name:pname,bdate:pdate}
    
  //shows Patientsname 
  document.getElementById('pname').innerHTML = ("Ihre Warteliste "+ localStorage.getItem("pname"))
//Get Appointmenttime and Position
  $.ajax({
    url:"/getQueueInformations",
    type:"GET",
    data: $.param(pObj),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, status) {
      var aTime = data.appointmentTime
      var position = data.position
// Get DelayTime and write all data into the html
$.ajax({
    url:"/getDifferenceTime",
    type:"POST",
    success: function(data, status) {
      var delay = parseInt(data.dTime/60)
      var aTimeNum = (parseInt(aTime.split(":")[0]) * 60) + parseInt(aTime.split(":")[1]);
      var dTimeNum = parseInt(delay);
      var total = aTimeNum + dTimeNum;
      var hour = Math.floor(total / 60);
      var minutes = total % 60;
        if (minutes <10){
            var newTime = hour + ':0' + minutes;
        }
        else{
      var newTime = hour + ':' + minutes;}
    if (position >= 0 && delay >= 10){ //Mit 10 min Pufferzeit. Keine Verpätung innerhalb dieser Toleranz
      document.getElementById('appointment').innerHTML = ("Ihr Termin ist ursprünglich um "+ aTime +" Uhr.")
      document.getElementById('pdelay').innerHTML = ("Leider gibt es eine Verspätung von "+delay+" Minuten")
    if (position < 1){ //Falls kein Patient vor einem ist, dennoch eine Verspätung existiert
         document.getElementById('pos').innerHTML = ("Ihr Termin wird vorraussichtlich "+delay+" Minuten später statt finden!")
         document.getElementById('nTime').innerHTML = ("Geschätzter tatsächlicher Termin: "+newTime+" Uhr.")
    }
    else{
    if (position < 2){ //Falls ein Patient vor einem ist, dennoch eine Verspätung existiert
      document.getElementById('pos').innerHTML = ("Vor Ihnen ist noch ein weiterer Patient. Ihr Termin wird vorraussichtlich "+delay+" Minuten später statt finden!")
    } else { //Falls min. 2 Patienten vor einem ist, dennoch eine Verspätung existiert
    document.getElementById('pos').innerHTML = ("Vor Ihnen sind noch "+ position+" weitere Patienten. Ihr Termin wird vorraussichtlich "+delay+" Minuten später statt finden!")
    }
    document.getElementById('nTime').innerHTML = ("Geschätzter tatsächlicher Termin: "+newTime+" Uhr.")
    }} else {
    document.getElementById('pdelay').innerHTML = ("Ihr Termin findet pünktlich um "+ aTime + " Uhr statt.")
    }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
    }
  });
    },
    error: function(data) {
        document.getElementById('appointment').innerHTML = "Authorization FAILED"
    }
  });
});