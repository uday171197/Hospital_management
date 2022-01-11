// function signupvalidateForm(){
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
$(document).ready(function(){
  $("#emailIn").on('keyup keydown',function(){
    $(".codeToVerifyContainer").hide()
    if(validateEmail($(this).val())){
      $(".sendCode").show();
    }
  })

  $(".sendCode").click(function(e){
    e.preventDefault()
    $.ajax({
      url:'/sendcode',
      data:{
        email:$("#emailIn").val()
      },
      type:'post',
      success:function(res){
        if(res==1){
          $(".sendCode").hide()
          $("#email").hide()
          $("#wrongcode").hide()
          $(".codeToVerifyContainer").show()
          $("#emailIn").prop("disabled",true)
          $(".register").prop("disabled",false)
        }
        else{
          $("#emailIn").prop("disabled",false)
          $("#email").css('display','block')
        }
      }
    })
  })
})
$("#signupForm").on('submit', function(e){
    e.preventDefault(); 
    code=$("#codeToVerify").val()
    if ((document.hospitalform.name.value).length < 3) {
      document.getElementById("fullname").style.display = "block";
      return false;
    }
    else if ((document.hospitalform.name.value).length > 3) {
      document.getElementById("fullname").style.display = "none";
      
    }
    if ((document.hospitalform.password.value).length < 8) {
        document.getElementById("password").style.display = "block";
        return false;
    }
    else if ((document.hospitalform.password.value).length >= 8) {
      document.getElementById("password").style.display = "none";
    }
    // console.log($("#signupForm").serialize())
    
    $("#emailIn").prop("disabled",false)
    $.ajax({
      url:'/signup',
      type:'post',
      data:$("#signupForm").serialize(),
      success:function(res){
        if(res==1){
          window.location.href="/patienthome"
        }
        else if(res==2){
          window.location.href="/nursehome"
        }
        else if(res==-3){
          $("#wrongcode").css('display','block')
          $(".register").prop("disabled",true)
          $("#codeToVerify").val("")
        }
        else{
          $("#email").css('display','block')
        }
      },
      error:function(){
        $("#email").show();
      }
    });
});
  // function loginvalidateForm(){
$("#loginForm").on('submit', function(e){
  e.preventDefault(); 
  if ((document.hospitalform.password.value).length < 8) {
      //alert("Length of the password must be minimum 8");
      document.getElementById("incorrectpass").style.display = "block";
      return false;
  }
  else if ((document.hospitalform.password.value).length >= 8) {
    document.getElementById("incorrectpass").style.display = "none";
  }
  // console.log($("#loginForm").serialize())
  $.ajax({
    url:'/signin',
    type:'post',
    data:$("#loginForm").serialize(),
    success:function(res){
      if(res==1){
        window.location.href="/patienthome"
      } else if(res==2){
        window.location.href="/nursehome"
      }
      else if(res==3){
        window.location.href="/subadminnursehome"
      }
      else{
        $("#login").show();
      }
    },
    error:function(){
      $("#login").show();
    }
  });
});