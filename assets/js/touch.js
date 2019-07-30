var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=getComputedStyle(holder).getPropertyValue("width");
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
var width=getComputedStyle(map).getPropertyValue("width");
var height=getComputedStyle(map).getPropertyValue("height");
ham.on('pinch',function(e)
{
        map.style.width=(width*e.scale)+'px';
        map.style.height=(height*e.scale)+'px';

});
