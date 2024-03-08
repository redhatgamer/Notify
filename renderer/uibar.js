var header = document.getElementById("mydiv");
    var btns = header.getElementsByClassName("custom-btn");
    for(var i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", function(){
            var current = 
            document.getElementsByClassName("active");
            current[0].className = 
            current[0].className.replace("active", "");
            this.className += " active";
        })
    }

    function makeBold(elem){
        //elem.classList.toggle('active');
        document.getElementById('note').classList.toggle('bold');
    }