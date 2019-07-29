var map=document.getElementById("map-holder");
var z=1;
map.addEventListener("touchstart",function(event)
{
    event.preventDefault();
    if(event.targetTouches.length===1)
    {
        // var w=parseInt(getComputedStyle(map).getPropertyValue("width"));
        // var h=parseInt(getComputedStyle(map).getPropertyValue("height"));
        // var initial_distance=distance(event);
        // var final_distance=0;
        z=z+0.5;
        map.addEventListener("touchmove",function(event){
            event.preventDefault();
            console.log(event.targetTouches[0].pageX,event.targetTouches[0].pageY);
            map.style.transform="scale("+z+")";
            console.log(event.targetTouches[0].pageX,event.targetTouches[0].pageY);
            // map.style.left=-event.targetTouches[0].pageX+'px';
           // final_distance=distance(event);
           //  z=Math.abs(final_distance-initial_distance);
        });

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
