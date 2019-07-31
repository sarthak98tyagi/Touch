var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseInt(getComputedStyle(holder).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});

var mleft=50;
var mtop=50;
ham.on('pinch',function(e)
{

    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
        if(width*e.scale >= dwidth && height*e.scale >= dheight)
        {

            map.style.width=(width*e.scale)+'px';
            map.style.height=(height*e.scale)+'px';
            var x=e.center['x'];
            var y=e.center['y'];
            var l=width*e.scale-width;
            var t=height*e.scale-height;
            console.log(l,t);
            map.style.marginLeft=(l-e.scale*x)+'px';
            map.style.marginTop=(t-e.scale*y)+'px';

        }

});

