var map=document.getElementById("map");
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
var width=getComputedStyle(map).getPropertyValue("width");
var height=getComputedStyle(map).getPropertyValue("height");
var lmar=50;
var tmar=50;
ham.on('tap',function(e){
    console.log(e.scale);
});
ham.on('pinch',function(e)
{
    map.style.width=(width*e.scale)+'px';
    map.style.height=(height*e.scale)+'px';
    map.style.marginLeft=(-lmar*e.scale)+'px';
    map.style.marginTop=(-tmar*e.scale)+'px';
});
ham.on('pinchend',function(e)
{
    map.style.width=(width*e.scale)+'px';
    map.style.height=(height*e.scale)+'px';
    map.style.marginLeft=(lmar*e.scale)+'px';
    map.style.marginTop=(tmar*e.scale)+'px';
});