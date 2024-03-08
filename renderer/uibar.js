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
        elem.classList.toggle('active');
        document.getElementById('note').classList.toggle('bold');
    }

    function makeItalic(elem){
        elem.classList.toggle('active');
        document.getElementById('note').classList.toggle('italic');
    }

    function makeUnderline(elem){
        elem.classList.toggle('active');
        let formattedText = document.getElementById('note');
        if (formattedText.classList.contains('underline')){
            formattedText.classList.remove('underline');
        }else{
            formattedText.classList.add('underline');
        }
    }

    function alignText(elem, alignType){
        elem.classList.toggle('active');
        document.getElementById('note').classList.style.textAlign = alignType;
        let buttonsList = document.getElementByClassName('align');
        for(let i = 0; i < buttonsList.length; i++){
            buttonsList[i].classList.remove('active');
        }
        elem.classList.add('active');

    }