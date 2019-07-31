var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseInt(getComputedStyle(holder).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
var init_width=parseInt(getComputedStyle(map).getPropertyValue("width"));
var init_height=parseInt(getComputedStyle(map).getPropertyValue("height"));
var mleft=50;
var mtop=50;
ham.on('pinch',function(e)
{
    console.log(e.center);
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
        if(width*e.scale >= dwidth && height*e.scale >= dheight)
        {

            map.style.width=(width*e.scale)+'px';
            map.style.height=(height*e.scale)+'px';
            var x=e.center['x'];
            var y=e.center['y'];
            map.style.marginLeft=(-x*e.scale)/2+'px';
            map.style.marginTop=(-y*e.scale)/2+'px';


            }

});
// ham.on('pinchend',function(e)
// {
//     var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
//     var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
//     if(width*e.scale >= dwidth && height*e.scale >= dheight )
//     {
//         var x=e.center['x'];
//         var y=e.center['y'];
//         map.style.width=(width*e.scale)+'px';
//         map.style.height=(height*e.scale)+'px';
//         map.style.marginLeft=(-x*e.scale)+'px';
//         map.style.marginTop=(-y*e.scale)+'px';
//
//     }
//
// });

