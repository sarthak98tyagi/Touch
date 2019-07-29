var map=$(".map-holder");
map.on("touchstart",function(event)
{
    event.preventDefault();
    alert(event.targetTouches.length);
});