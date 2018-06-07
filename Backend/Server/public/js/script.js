
$(document).ready(function () {
  $("#userlogin").click(function () {    
    var name = $("#loginname").val();
    var passwd = sha256($("#loginpassword").val());
	
    $.post( "/login", {username:name,password:passwd}, (data) => 
    {
		console.log(data);
    });
  });
  
  $("#patientlogin").click(function () {    
        
    var name = $("#patientname").val();
    var pdate = $("#patientdate").val();
        
	pObj = {name:name,bdate:pdate}
	
	$.ajax({
		url:"/getQueuePosition",
	    type:"GET",
		data:$.param(pObj),
	    contentType:"application/json; charset=utf-8",
	    dataType:"json",
	    success: function(res){
			console.log(res);
	    }
	}); 
  });
});
