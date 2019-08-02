var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var init_width=parseInt(getComputedStyle(map).getPropertyValue("width"));
var init_height=parseInt(getComputedStyle(map).getPropertyValue("height"));
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseInt(getComputedStyle(holder).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
var mleft=50;
var mtop=50;
ham.on('pinchmove',function(e)
{
    e.preventDefault();
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
    var w=(width*e.scale)-width;
    var h=(height*e.scale)-height;
    var x=e.center['x'];
    var y=e.center['y'];
    var l=(x*e.scale)/2;
    var t=(y*e.scale)/2;
    var ml=parseInt(getComputedStyle(map).getPropertyValue("left"));
    var mt=parseInt(getComputedStyle(map).getPropertyValue("top"));
    var lm=(ml+Math.abs(ml-l));
    var tm=(mt+Math.abs(mt-t));
        if( (w-lm) > dwidth && (h-tm) > dheight)
        {
            map.style.width=(width*e.scale)+'px';
            map.style.height=(height*e.scale)+'px';
            map.style.left=-lm+'px';
            map.style.top=-tm+'px';

        }
});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  console.log(parseInt(getComputedStyle(map).getPropertyValue("right")));
  var ml=-parseInt(getComputedStyle(map).getPropertyValue("left"));
  if(ml>0)
  {
      map.style.left=0+'px';
  }

});
ham.on('swipedown',function(e)
{
    e.preventDefault();
    console.log(parseInt(getComputedStyle(map).getPropertyValue("bottom")));
    var mt=-parseInt(getComputedStyle(map).getPropertyValue("top"));
    if(mt>0)
    {
        map.style.top=0+'px';
    }

});

