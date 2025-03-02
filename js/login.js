
$("#toggle-password").click(function(){
    console.log("enter");
    
    const passwordInput = $('#password');
    const icon = $(this); 

    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        icon.removeClass('bi-eye-slash')
        icon.addClass('bi-eye');
    } else {
        passwordInput.attr('type', 'password'); 
        icon.removeClass('bi-eye')
        icon.addClass('bi-eye-slash');
    }
});

$("#toggle-cnf-password").click(function(){
    const passwordInput = $('#cnf-password');
    const icon = $(this); 

    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        icon.removeClass('bi-eye-slash')
        icon.addClass('bi-eye');
    } else {
        passwordInput.attr('type', 'password'); 
        icon.removeClass('bi-eye')
        icon.addClass('bi-eye-slash');
    }
});
$("#login-form").submit((e)=>{
    e.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();
    let iserror = false
    if(email==""){
        $('#email-error').text("Please enter your email");
        iserror=true;
    }
    else{
        $('#email-error').text("");
    }

    if(password===""){
        $('#password-error').text("Please enter your password");
        iserror=true;
    }else if(!password.match(/[0-9]/) || !password.match(/[a-z]/) || !password.match(/[A-Z]/) || !password.match(/[@#$%^&*-_=+?/><]/)){
        $('#password-error').text("Enter a valid password");
        iserror=true;
    }else if(password.length<8){
        $('#password-error').text("Enter a valid password");
        iserror=true;
    }else{
        $('#password-error').text("");
        var pass_hash = CryptoJS.SHA256(password).toString();
        $("#encrypted_password").val(pass_hash);
    }
    if(iserror){
        e.preventDefault();
    } else{
        $.ajax({
            url:"./../php/login.php",
            method:"post",
            data:{email:email,password:pass_hash},
            success:(data)=>{
                try{
                    data = JSON.parse(data);
                    
                    if(data['status']=="success"){
                        window.location="./home.html"
                    } else{             
                        if(data['invalid']=="email"){
                            $("#email-error").text("Email is not registered");
                        } else if(data['invalid']=="password"){
                            $("#password-error").text("Invalid Password");
                        }  
                    }
                }catch(Error){
                    console.log(Error);
                    console.log(data);     
                }
            }
            
        })
    }
    
})