// app.js Juneau Gawat 301076796 October 8, 2020

// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        let dangerButtons = document.getElementsByClassName("btn-danger");

        for (const button of dangerButtons) {
            button.addEventListener("click",(event)=>{
                if(!confirm("Are you sure?")){ // lol forgot !
                    event.preventDefault();
                    location.href = '/contacts';
                }
            });
        }
    }

    window.addEventListener('load', Start);
})();