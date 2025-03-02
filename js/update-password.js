// Toggle passwrd view
$("#updated-toggle-password").click(function(){
    const passwordInput = $('#updated-password');
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
populateDetails=(element)=>{
    // $("#passwords-display").addClass("d-none");
    $("#update-password").removeClass("d-none");
    $("#update-password").addClass("d-block");
    $("#featureList").addClass("d-none");
    $('#add-password-btn').addClass("d-none");
    
    let data=element;
    $("#updated-id").val(data['id']);
    $("#updated-app-name").val(data['name']);
    $("#updated-url").val(data['url']);
    $("#updated-username").val(data['username']);
    $("#updated-password").val(decryptPassword(data['password'],data['username']));
    $("#updated-note").val(data['note']);
    if (data['favourite'] === "yes") {
        $('#updated-favourite').prop('checked', true); // Check the checkbox
    } else if ( data['favourite']=== "no") {
        $('#updated-favourite').prop('checked', false); // Uncheck the checkbox
    }
}

$("#update-password-form").submit((e)=>{
    let appname = $("#updated-app-name").val();
    let username = $("#updated-username").val();
    let password = $("#updated-password").val();
    let check = $("#updated-favourite");
    let favourite = "no";
    if(check.is(":checked")){
        favourite="yes";
    }
    let isError=false;
    if(appname==""){
        $("#updated-app-name-error").text("Please enter the app name");
        isError=true;
    }else{
        $("#updated-app-name-error").text("");
    }
    if(username==""){
        $("#updated-username-error").text("Please enter the username");
        isError=true;
    }else{
        $("#updated-username-error").text("");
    }
    if(password==""){
        $("#updated-password-error").text("Please enter the password");
        isError=true;
    }else{
        $("#updated-password-error").text("");
        $("#updated-encrypted_password").val(encryptPassword(password,username))
    }
    if(isError){
       e.preventDefault(); 
    }
})
