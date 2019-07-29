var map=$(".map-holder");
map.on("touchstart",function(event)
{
    event.preventDefault();
    alert("Hello");
    if(event.targetTouches.length===2)
    {
        alert("Hello");
    }
});