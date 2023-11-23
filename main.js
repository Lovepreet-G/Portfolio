//Smooth scroll

var navManu =document.querySelectorAll('.nav-menu a');

var interval;

for(var i=0; i< navManu.length;i++)
{
    navManu[i].addEventListener('click',function(event)
    {
        event.preventDefault();

        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);

        interval = setInterval(scroll,20,targetSection);

    });
}

function scroll(targetSection)
{
    var targetSectionCoordinates = targetSection.getBoundingClientRect();
    if(targetSectionCoordinates.top <= 0)
    {
        clearInterval(interval);
        return;
    }
    
    window.scrollBy(0,50);
    
}