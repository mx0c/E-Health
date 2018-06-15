$(document).ready(function () {
  var pname = localStorage.getItem("pname");
  var pdate = localStorage.getItem("pdate");

  pObj = {name:pname,bdate:pdate}

  document.getElementById('pname').innerHTML = ("Ihre Warteliste "+ localStorage.getItem("pname"))

  $.ajax({
    url:"/getQueueInformations",
    type:"GET",
    data: $.param(pObj),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(data, status) {
      var aTime = data.appointmentTime
      var dTime = data.delayDuration
      var position = data.position

      var aTimeNum = (parseInt(aTime.split(":")[0]) * 60) + parseInt(aTime.split(":")[1]);
      var dTimeNum = parseInt(dTime);
      var total = aTimeNum + dTimeNum;
      var hour = Math.floor(total / 60);
      var minutes = total % 60;
      var newTime = hour + ':' + minutes;

      document.getElementById('appointment').innerHTML = ("Ihr Termin ist ursprünglich um "+ aTime +" Uhr.")
      document.getElementById('pdelay').innerHTML = ("Leider gibt es eine Verspätung  von +"+dTime+" Minuten")
      document.getElementById('pos').innerHTML = ("Vor Ihnen sind noch "+ position+" weitere Patienten. Ihr Termin wird vorraussichtlich "+dTime+" Minuten später statt finden!")
      document.getElementById('nTime').innerHTML = ("Geschätzter tatsächlicher Termin: "+newTime+" Uhr.")
    },
    error: function(data) {
        document.getElementById('appointment').innerHTML = "Authorization FAILED"
    }
  });
});
