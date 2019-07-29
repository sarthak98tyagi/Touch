var map=document.getElementById("map-holder");
map.addEventListener("touchstart",function(event)
{
    event.preventDefault();
    alert(event.targetTouches.length);
    // if(event.targetTouches.length===2)
    // {
    //     console.log("Double Touch");
    // }
});