// Animate each element flying from different sides and meeting in the middle
gsap.from("#mind", { duration: 1.5, xPercent: -100, opacity: 0, ease: "power3.out" });
gsap.from("#scape", { duration: 1.5, xPercent: 100, opacity: 0, ease: "power3.out" });

// After the initial animation, slightly move them towards each other
gsap.to("#mind", { duration: 0.5, yPercent: 20, delay: 1.5, ease: "power3.out" });
gsap.to("#scape", { duration: 0.5, yPercent: -20, delay: 1.5, ease: "power3.out" });

// Add a scale effect to make the meeting more dynamic
gsap.to(".container", { duration: 0.5, scale: 1.1, delay: 1.5, ease: "elastic.out(1, 0.3)" });

// Add clickable text after the previous animations
gsap.to("#enter-link", { duration: 0.5, opacity: 1, visibility: 'visible', delay: 2 });

document.getElementById("enter-link").addEventListener("click", function(event){
    event.preventDefault();  // Prevent the link from navigating immediately
    document.body.style.opacity = '0';  // Start fading out the body
    setTimeout(function(){
        window.location = this.href;  // Navigate to the link after the fade completes
    }.bind(this), 1000);  // Adjust time based on your desired speed of fade
});