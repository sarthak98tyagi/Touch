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
        if(width*e.scale >= dwidth && height*e.scale >= dheight)
        {
            map.style.width=(width*e.scale)+'px';
            map.style.height=(height*e.scale)+'px';
            var x=e.center['x'];
            var y=e.center['y'];
            var ml=parseInt(getComputedStyle(map).getPropertyValue("margin-left"));
            var mt=parseInt(getComputedStyle(map).getPropertyValue("margin-top"));
            var l=(x*e.scale)/2;
            var t=(y*e.scale)/2;
            var w=parseInt(getComputedStyle(map).getPropertyValue("width"));
             var h=parseInt(getComputedStyle(map).getPropertyValue("height"));
            var lm=(ml+Math.abs(ml-l));
            var tm=(mt+Math.abs(mt-t));
            var xgap=w-lm;
            var ygap=h-tm;
            if((xgap*2)<dwidth && (ygap*2)<dheight)
            {
                map.style.marginLeft=-lm+'px';
                map.style.marginTop=-tm+'px';
            }
        }
});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  console.log(parseInt(getComputedStyle(map).getPropertyValue("margin-right")));
  var ml=-parseInt(getComputedStyle(map).getPropertyValue("margin-left"));
  if(ml>0)
  {
      map.style.marginLeft=0+'px';
  }

});
ham.on('swipedown',function(e)
{
    e.preventDefault();
    console.log(parseInt(getComputedStyle(map).getPropertyValue("margin-down")));
    var mt=-parseInt(getComputedStyle(map).getPropertyValue("margin-top"));

    if(ml>0)
    {
        map.style.marginTop=0+'px';
    }

});


