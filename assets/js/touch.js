var map=document.getElementById("map-holder");
map.addEventListener("touchstart",function(event)
{
    event.preventDefault();
    if(event.targetTouches.length===2)
    {
        var x1=event.targetTouches[0].pageX;
        var y1=event.targetTouches[0].pageY;
        var x2=event.targetTouches[1].pageX;
        var y2=event.targetTouches[1].pageY;
        var initial_distance=Math.sqrt(Math.abs(x2**2-x1**2)+Math.abs(y2**2-y1**2));
        var final_distance=0;
        map.addEventListener("touchmove",function(event){
           event.preventDefault();
            var x1=event.targetTouches[0].pageX;
            var y1=event.targetTouches[0].pageY;
            var x2=event.targetTouches[1].pageX;
            var y2=event.targetTouches[1].pageY;
            final_distance=Math.sqrt(Math.abs(x2**2-x1**2)+Math.abs(y2**2-y1**2));
            alert(Math.abs(final_distance-initial_distance));

        });

    }
});