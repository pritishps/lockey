$(document).ready(()=>{
    $.ajax({
        url:"./../php/loggedincheck.php",
        method:"get",
        success:(data)=>{
            try{
                data = JSON.parse(data)
                if(data['status']=="success"){
                    $("#welcome-tag").text(`Hello ${data['name']}`)
                    
                } else{
                    window.location="./login.html";
                }
            } catch(error){
                console.log(error);
                console.log(data);
                
            }
            
        }
    })
})