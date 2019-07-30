var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=getComputedStyle(holder).getPropertyValue("width");
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
ham.on('tap',function(e)
{
        map.style.width=(width*e.scale)+'px';
        map.style.height=(height*e.scale)+'px';
});
