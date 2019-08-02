var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var init_width=parseInt(getComputedStyle(map).getPropertyValue("width"));
var init_height=parseInt(getComputedStyle(map).getPropertyValue("height"));
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseInt(getComputedStyle(holder).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var mleft=50;
var mtop=50;
ham.on('pinchmove',function(e)
{
    e.preventDefault();
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var height=parseInt(getComputedStyle(map).getPropertyValue("height"));
    var w=(width*e.scale);
    var h=(height*e.scale);
    var x=e.center['x'];
    var y=e.center['y'];
    var l=(x*e.scale);
    var t=(y*e.scale);
        if( (w-l) >= dwidth && (h-t) >= dheight)
        {
            map.style.width=w+'px';
            map.style.height=h+'px';
            map.style.left=-l+'px';
            map.style.top=-t+'px';
        }
});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  var ml=-parseInt(getComputedStyle(map).getPropertyValue("left"));
  if(ml>0)
  {
      map.style.left=0+'px';
  }

});
ham.on('swipedown',function(e)
{
    e.preventDefault();
    var mt=-parseInt(getComputedStyle(map).getPropertyValue("top"));
    if(mt>0)
    {
        map.style.top=0+'px';
    }

});
ham.on('swipeleft',function(e)
{
    e.preventDefault();
    var mr=-parseInt(getComputedStyle(map).getPropertyValue("right"));
    console.log(mr);
    if(mr>0)
    {
        map.style.right=0+'px';
    }
});
