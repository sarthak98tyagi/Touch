var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseInt(getComputedStyle(holder).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var pointers=[];
var mp=0; //mark-counter
function shift()
{
    console.log("Hello");
    // var cw=parseInt(getComputedStyle(map).getPropertyValue("width"));
    // var ch=parseInt(getComputedStyle(map).getPropertyValue("height"));
    // pointers.forEach(function (value,index)
    // {
    //    var mark=value[0];
    //    mark.style.left=value[1]+(cw-value[3]);
    //    mark.style.top=value[2]+(ch-value[4]);
    // });
    
}
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
            shift();
        }
        else
        {
            map.style.width=dwidth+'px';
            map.style.height=dheight+'px';
            map.style.top=0+'px';
            map.style.left=0+'px';
            shift();
        }
});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  var ml=parseInt(getComputedStyle(map).getPropertyValue("left"));
  if((ml+e.distance)<0)
  {
      map.style.left=(ml+e.distance)+'px';
      shift();
  }
  else
  {
      map.style.left=0+'px';
      shift();
  }

});
ham.on('swipedown',function(e)
{
    e.preventDefault();
    var mt=parseInt(getComputedStyle(map).getPropertyValue("top"));
    if((mt+e.distance)<0)
    {
        map.style.top=(mt+e.distance)+'px';
        shift();
    }
    else
    {
        map.style.top=0+'px';
        shift();
    }
});
ham.on('swipeleft',function(e)
{
    e.preventDefault();
    var mr=parseInt(getComputedStyle(map).getPropertyValue("right"));
    var ml=parseInt(getComputedStyle(map).getPropertyValue("left"));
    if((mr+e.distance)<0)
    {
        map.style.left=(ml-e.distance)+'px';
        shift();
    }
    else
    {
        map.style.left=mr+'px';
        shift();
    }
});
ham.on('swipeup',function(e)
{
    e.preventDefault();
    var mb=parseInt(getComputedStyle(map).getPropertyValue("bottom"));
    var mt=parseInt(getComputedStyle(map).getPropertyValue("top"));
    if((mb+e.distance)<0)
    {
        map.style.top=(mt-e.distance)+'px';
        shift();
    }
    else
    {
        map.style.left=mb+'px';
        shift();
    }
});
ham.on('tap',function(e)
{
    e.preventDefault();
    var cw=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var ch=parseInt(getComputedStyle(map).getPropertyValue("height"));
    var x=e.center['x'];
    var y=e.center['y'];
    pointers[mp]=[document.createElement("div"),x,y,cw,ch];
    pointers[mp][0].className="mark";
    pointers[mp][0].style.left=x+'px';
    pointers[mp][0].style.top=y+'px';
    holder.appendChild(pointers[mp][0]);
    mp=mp+1;
});