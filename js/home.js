document.getElementById("enter-link").addEventListener("click", function(event){
    event.preventDefault();  // Prevent the link from navigating immediately
    document.body.style.opacity = '0';  // Start fading out the body
    setTimeout(function(){
        window.location = this.href;  // Navigate to the link after the fade completes
    }.bind(this), 1000);  // Adjust time based on your desired speed of fade
});