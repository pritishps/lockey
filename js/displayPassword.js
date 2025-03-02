$("#display-toggle-password").click(function(){
    const passwordInput = $('#display-password-field');
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
displayPopulate =(element)=>{
    $("#display-password").removeClass("d-none");
    $("#display-password").addClass("d-block");
    $("#featureList").addClass("d-none");
    $('#add-password-btn').addClass("d-none");
    
    let data=element;
    $("#display-id").val(data['id']);
    $("#display-app-name").val(data['name']);
    $("#display-url").val(data['url']);
    $("#display-username").val(data['username']);
    $("#display-password-field").val(decryptPassword(data['password'],data['username']));
    $("#display-note").val(data['note']);
    if (data['favourite'] === "yes") {
        $('#display-favourite').prop('checked', true); // Check the checkbox
    } else if ( data['favourite']=== "no") {
        $('#display-favourite').prop('checked', false); // Uncheck the checkbox
    }
}