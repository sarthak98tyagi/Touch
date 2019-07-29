var map=$(".map-holder");
map.on("touchstart",function(event)
{
    event.preventDefault();
    if(event.targetTouches.length===2)
    {
        alert("Hello");
    }
});