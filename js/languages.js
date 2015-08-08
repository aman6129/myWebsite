        
        _opacity = 1;
        // var array = ["C++", "C", "Java", "Javascript", "Python", "Haskell", "C#", "HTML", "CSS", "Photoshop", "Flash", "Illustrator" ];
        var array = ["c++", "c", "java", "javascript", "coffescript", "python", "haskell", "c#", "html", "css", "photoshop", "flash", "Illustrator"];
        var index = 1;
        
        function fadein() //text fadein function handles text fading in
        {
            if(_opacity <= 1)
            {
                _opacity += .05;
                var text = document.getElementsByClassName("mtw"); //returns an array so we have to cycle through them
                i = text.length;
                while(i--)
                {
                    text[i].style.opacity = String(_opacity);
                }
                setTimeout("fadein()",50); //recursively call fadein until wanted color is acheived
            }
            
            else
            {
                _opacity = 1; //reset hex value
                setTimeout("fadeout()", 2000); //callto fadout, with a timer of 2 seconds
            }
        }
        
        function fadeout()///text fadeout function handles text fading out
        { 
            if(_opacity >= 0) //same as fadein except we increase the hex value
            { 
                _opacity -= .05; // increase color darkness
                var text = document.getElementsByClassName("mtw");
                i = text.length;
                while(i--)
                {
                    text[i].style.opacity = String(_opacity);
                }
                setTimeout("fadeout()",25); 
            }
            else
            {
                _opacity = 0; //reset hex value
                var text = document.getElementsByClassName("mtw");
                i = text.length;
                
                //choosing the index of the new word
                if(index + 1 > array.length - 1)
                    index = 0;
                else
                    index++;
                
                while(i--)
                {
                    text[i].innerText = array[index]; //assigning new word to the html
                    text[i].textContent = array[index]; //for firefox :|
                    text[i].style.opacity = "0";
                }
                setTimeout("fadein()", 500); //start fading in after 1 second
            }
        }