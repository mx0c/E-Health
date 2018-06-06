
$(document).ready(function () {
  $("#userlogin").click(function () {    
    var name = $("#loginname").val();
    var passwd = sha256($("#loginpassword").val());
	
    $.post( "/login", {username:name,password:passwd}, (data) => 
    {
		console.log(data);
    });
  });
});
