var map=$(".map-holder");
map.on("touchmove",function(event)
{
    event.preventDefault();
    alert(event.targetTouches.length);
});