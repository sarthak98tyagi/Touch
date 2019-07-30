var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});

var mleft=50;
var mtop=50;
ham.on('pinch',function(e)
{
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
        if(width*e.scale >= dwidth)
        {

            map.style.width=(width*e.scale)+'px';
            map.style.height=(height*e.scale)+'px';


        }
});
ham.on('pinchend',function(e)
{
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
    map.style.width=(width*e.scale)+'px';
    map.style.height=(height*e.scale)+'px';


});

