let isNavOpen = false
let menu=$("#nav-bar-contents-mobile")
$("#mobile-nav-icon-holder").click(function(){
    if(isNavOpen){
        menu.slideToggle(function(){
            isNavOpen = false
        });
    }
    else{
        menu.slideToggle()
        isNavOpen = true
    }
})
menu.click(function(){
    menu.slideToggle()
    menu.
    isNavOpen = false
})
