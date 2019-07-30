var map=document.getElementById("map");
var z=1;
map.addEventListener("touchstart",function(event)
{
    event.preventDefault();
    if(event.targetTouches.length===1)
    {

        z=z+0.5;
        map.addEventListener("touchmove",function(event){
            event.preventDefault();
            var x1=event.targetTouches[0].pageX+50;
            var y1=event.targetTouches[0].pageY+50;
            var x2=event.targetTouches[1].pageX;
            var y2=event.targetTouches[1].pageY;
            map.style.transform="scaleX("+z+")";
            var p=x1<x2?x1:x2;
            var q=y1<y2?y1:y2;

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
