var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=parseInt(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseInt(getComputedStyle(holder).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var pointers=[];
var mp=0; //mark-counter
function shift(al)
{
    var at=getComputedStyle(map).getPropertyValue("top");
    pointers.forEach(function (value,index)
    {
        var mark=holder.children[index+1];
        var nx=value[0]+al;
        var ny=value[1]+at;
        mark.style.left=nx+'px';
        mark.style.right=ny+'px';
    });
}
ham.on('pinchmove',function(e)
{
    e.preventDefault();
    var width=parseInt(getComputedStyle(map).getPropertyValue("width"));
    var w=(width*e.scale);
    var x=e.center['x'];
    var y=e.center['y'];
    var l=(x*e.scale);
    var t=(y*e.scale);
        if( (w-l) >= dwidth )
        {
            map.style.width=w+'px';
            map.style.left=-l+'px';
            shift(-l);
        }
        else
        {
            map.style.left=0+'px';
            shift(0);
        }
});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
  if((ml+e.distance)<0)
  {
      map.style.left=(ml+e.distance)+'px';
      shift(ml+e.distance);
  }
  else
  {
      map.style.left=0+'px';
      shift(0);
  }

});
ham.on('swipedown',function(e)
{
    e.preventDefault();
    var mt=parseFloat(getComputedStyle(map).getPropertyValue("top"));
    var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
    if((mt+e.distance)<0)
    {
        map.style.top=(mt+e.distance)+'px';
        shift(ml);

    }
    else
    {
        map.style.top=0+'px';
        shift(ml);
    }
});
ham.on('swipeleft',function(e)
{
    e.preventDefault();
    var mr=parseFloat(getComputedStyle(map).getPropertyValue("right"));
    var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
    if((mr+e.distance)<=0)
    {

        map.style.left=(ml-e.distance)+'px';
        shift(ml);

    }
    else
    {
        map.style.left=(ml+mr)+'px';
        shift(ml);

    }
});
ham.on('swipeup',function(e)
{
    e.preventDefault();
    var mb=parseFloat(getComputedStyle(map).getPropertyValue("bottom"));
    var mt=parseFloat(getComputedStyle(map).getPropertyValue("top"));
    var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
    if((mb+e.distance)<=0)
    {
        map.style.top=(mb-e.distance)+'px';
        shift(ml);
    }
    else
    {
        map.style.bottom=(mt+mb)+'px';
        shift(ml);

    }
});
ham.on('tap',function(e)
{
    e.preventDefault();
    var x=e.center['x'];
    var y=e.center['y'];
    var cl=parseFloat(getComputedStyle(map).getPropertyValue("left"));
    var ct=parseFloat(getComputedStyle(map).getPropertyValue("top"));
    var xmark=Math.abs(cl)+x;
    var ymark=Math.abs(ct)+y;
    var mark=document.createElement("div");
    pointers[mp]=[xmark,ymark];
    mark.className="mark";
    mark.style.left=x+'px';
    mark.style.top=y+'px';
    holder.appendChild(mark);
    mp=mp+1;
});