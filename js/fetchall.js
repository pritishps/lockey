function copy_clipboard(password, event) {
    // Get the icon element
    const icon = event.target; // This is the <i> element that was clicked

    // Try using the modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(password)
            .then(() => changeIcon(icon))
            .catch(() => fallbackCopy(password, event, icon));
    } else {
        fallbackCopy(password, event, icon);
    }
}

function fallbackCopy(password, event, icon) {
    // Create a temporary div element with contentEditable
    const tempDiv = document.createElement("div");
    tempDiv.textContent = password;
    tempDiv.style.position = "fixed"; // Prevent scrolling
    tempDiv.style.opacity = "0"; // Make it invisible
    tempDiv.style.height = "0"; // Avoid rendering
    tempDiv.style.width = "0"; // Avoid rendering
    document.body.appendChild(tempDiv);

    tempDiv.contentEditable = true;
    tempDiv.focus();
    document.execCommand("selectAll");

    // Copy the text
    try {
        document.execCommand("copy");
        changeIcon(icon); // Change the icon if copy is successful
    } catch (err) {
        console.error("Fallback: Failed to copy password", err);
        alert("Failed to copy password. Please copy manually.");
    }

    document.body.removeChild(tempDiv);
}

function changeIcon(icon) {
    icon.classList.remove("bi-copy");
    icon.classList.add("bi-clipboard-check-fill");

    setTimeout(() => {
        icon.classList.remove("bi-clipboard-check-fill");
        icon.classList.add("bi-copy");
    }, 1000); 
}


function show_details(element) {
    $('#appname').text(element.name);
    $('#detail-modal').css('display', 'flex');
    // launch
    $("#launch").click(()=>{
        window.location=element.url
    })
    // copy password
    $("#copypassword").click(() => {
        const password = decryptPassword(element.password, element.username);
        copy_clipboard(password, event); 
    });
    $("#copyusername").click(() => {
        copy_clipboard(element.username, event); 
    });
    $("#copyurl").click(() => {
        copy_clipboard(element.url, event); 
    });
    $("#view").click(() => {
        $('#detail-modal').css('display', 'none');
        $('#passwords-display').css('display', 'none');
        displayPopulate(element);
        $('#display-close').click(()=>{
            $('#display-password').addClass("d-none");
            $("#featureList").removeClass("d-none");
            $('#passwords-display').css('display', 'block');   
            $('#add-password-btn').removeClass("d-none");

        });
    });
    
    $("#edit-user-details-btn").click(()=>{
        $('#detail-modal').css('display', 'none');
        $('#passwords-display').css('display', 'none');
        populateDetails(element);
        $('#update-close').click(()=>{
            $('#update-password').addClass("d-none");
            $("#featureList").removeClass("d-none");
            $('#passwords-display').css('display', 'block');  
            $('#add-password-btn').removeClass("d-none");

        });
    })
    $("#delete-user-details-btn").click(()=>{
        $('#detail-modal').css('display', 'none');
        $('#delete-modal').css('display', 'flex');
        $('#cancel-btn').click(()=>{
            $('#delete-modal').css('display', 'none');
            $('#detail-modal').css('display', 'flex');
        })
        $('#delete-btn').click(()=>{
            $.ajax({
                url:"./../php/delete-password.php",
                method:"POST",
                data:{
                    "id":element.id
                },
                success:(data)=>{
                    window.location="home.html";
                }
            })
        })
    })
}

$('.close').click(()=>{
    $('#detail-modal').css('display', 'none');
});


function displayPasswords(data) {
    if (data.length === 0) {
        $("#passwords-display").html("<h1 class='mt-5 txt-secondary-dark text-center'>No Data Available<h1>");
        return;
    }

    let str = `<div class="card-container d-flex flex-wrap p-2">`;
    data.forEach(element => {
        str += `
            <div class="row col-12 col-md-6 col-lg-4 g-0 p-2">
                <div class="row g-0 card-container-inner p-2">
                    <div class="col-2">
                        <i class="bi bi-file-lock2-fill display-1 txt-prime"></i>
                    </div>
                    <div class="col-8 ps-lg-3 my-auto" onclick='show_details(${JSON.stringify(element)})'>
                        <h5 class="m-0 text-truncate">${element.name}</h5>
                        <p class="m-0 text-truncate" style="max-width: 100%;">${element.username}</p>
                    </div>
                    <div class="col-2 my-auto text-end p-2">
                        <i class="bi bi-copy fs-3 txt-prime" onclick="copy_clipboard('${decryptPassword(element.password, element.username)}', event)"></i>
                    </div>
                </div>
            </div>
        `;
    });
    str += `</div>`;
    $("#passwords-display").html(str);
}

$(document).ready(() => {
    let allPasswords = []; 
    // Fetch all passwords on page load
    $.ajax({
        url: "./../php/getallpasswords.php",
        method: "get",
        success: (data) => {
            try {
                allPasswords = JSON.parse(data); 
                displayPasswords(allPasswords);
                $("#favourite-passwords").removeClass("scrollable-content-clicked")
                $("#all-passwords").addClass("scrollable-content-clicked")
            } catch (error) {
                console.log(error);
                console.log(data);
            }
        }
    });

    // Search functionality
    $("#search-input").on("input", function () {
        const query = $(this).val().toLowerCase();
        const filteredData = allPasswords.filter(element =>
            element.name.toLowerCase().includes(query)
        );
        displayPasswords(filteredData);
    });
    $("#search-input-mobile").on("input", function () {
        const query = $(this).val().toLowerCase();
        const filteredData = allPasswords.filter(element =>
            element.name.toLowerCase().includes(query)
        );
        displayPasswords(filteredData);
    });
});

$("#favourite-passwords").click(()=>{
    $.ajax({
        url:"./../php/getfavouritepasswords.php",
        method:"get",
        success:(data)=>{
            try{
                data = JSON.parse(data);
                displayPasswords(data)
                $("#all-passwords").removeClass("scrollable-content-clicked")
                $("#favourite-passwords").addClass("scrollable-content-clicked")

            }catch(error){
                console.log(error);
                console.log(data);
            }
        }
    })
})

$("#all-passwords").click(()=>{
    $.ajax({
        url:"./../php/getallpasswords.php",
        method:"get",
        success:(data)=>{
            try{
                data = JSON.parse(data);
                displayPasswords(data)
                $("#favourite-passwords").removeClass("scrollable-content-clicked")
                $("#all-passwords").addClass("scrollable-content-clicked")

            }catch(error){
                console.log(error);
                console.log(data);      
            }
        }
    })
})

