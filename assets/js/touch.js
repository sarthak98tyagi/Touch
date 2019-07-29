var map=document.getElementById("map-holder");
map.addEventListener("touchstart",function(event)
{
    event.preventDefault();
    if(event.targetTouches.length===2)
    {
        var w=parseInt(getComputedStyle(map).getPropertyValue("width"));
        var h=parseInt(getComputedStyle(map).getPropertyValue("height"));
        var initial_distance=distance(event);
        var final_distance=0;
        var z=0;
        map.addEventListener("touchmove",function(event){
           event.preventDefault();
           final_distance=distance(event);
            z=Math.abs(final_distance-initial_distance);
        });
        alert(w+z);
        var d=w+z;
        map.style.width=d+"px";
    }
});
function distance(event)
{
    var x1=event.targetTouches[0].pageX;
    var y1=event.targetTouches[0].pageY;
    var x2=event.targetTouches[1].pageX;
    var y2=event.targetTouches[1].pageY;
    return (Math.sqrt(Math.abs(x2**2-x1**2)+Math.abs(y2**2-y1**2)));
}