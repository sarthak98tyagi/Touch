var map=document.getElementById("map-holder");
map.addEventListener("touchstart",function(event)
{
    event.preventDefault();
    if(event.targetTouches.length===2)
    {
        console.log("Double Touch");
    }
});