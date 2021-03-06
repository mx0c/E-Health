
$(document).ready(function () {
  $("#userlogin").click(function () {
    var name = $("#loginname").val();
    var passwd = sha256($("#loginpassword").val());

    $.ajax({
      url:"/login",
      type:"POST",
      data:JSON.stringify({username:name,password:passwd}),
      contentType:"application/json; charset=utf8",
      dataType:"json",
      success: function(data, status) {
        console.log("login success");
        // save access token in cookie
        document.cookie="access_token=" + data.token

        $(location).attr('href', '/praxis.html')

      },
        error: function(data) {
        console.log("login failed");
        document.cookie="access_token= "
        $('#praxisLoginAlert').show();
      }
    });
  });

  $("#patientlogin").click(function () {

    var name = $("#patientname").val();
    var pdate = $("#patientdate").val();

    if(name == "" || pdate == ""){
      $('#patientLoginAlert').hide().show();
      return;
    }

	  pObj = {name:name,bdate:pdate}

    localStorage.setItem("pname",name);
    localStorage.setItem("pdate",pdate);

	pObj = {name:name,bdate:pdate}

	$.ajax({
		url:"/getQueueInformations",
	    type:"GET",
		  data:$.param(pObj),
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	    success: function(res){
			console.log("Appointment found");
            $(location).attr('href', '/warteliste.html')
        },
        error: function(res) {
            $('#patientLoginAlert').show();
        }
	});
  });
});
