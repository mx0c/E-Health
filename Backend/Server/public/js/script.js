
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
      }
    }); 
  });
});
