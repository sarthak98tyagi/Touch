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
var i=0;
// ham.on('tap',function(e)
// {
//     var ml=-1*parseInt(getComputedStyle(map).getPropertyValue("margin-left"));
//     var mt=-1*parseInt(getComputedStyle(map).getPropertyValue("margin-top"));
//     console.log(ml,mt);
//     console.log(e.center);
//
// });

ham.on('pinch',function(e)
{
    console.log(e.center);
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
        if(width*e.scale >= dwidth && height*e.scale >= dheight)
        {
            map.style.width=(width*e.scale)+'px';
            map.style.height=(height*e.scale)+'px';
            // var x=e.center['x'];
            // var y=e.center['y'];
            // if(parseInt(getComputedStyle(map).getPropertyValue("width"))<=init_width ||
            // parseInt(getComputedStyle(map).getPropertyValue("height"))<=init_height)
            // {
            //     map.style.marginLeft='0px';
            //     map.style.marginTop='0px';
            //
            // }
            // else
            // {
            //
            //     map.style.marginLeft=-x+'px';
            //     map.style.marginTop=-y+'px';
            // }


        }
});
// ham.on('pinchend',function(e)
// {
//     var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
//     var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
//     if(width*e.scale >= dwidth && height*e.scale >= dheight )
//     {
//         map.style.width=(width*e.scale)+'px';
//         map.style.height=(height*e.scale)+'px';
//     }
//
// });

