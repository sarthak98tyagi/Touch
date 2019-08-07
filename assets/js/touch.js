var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var dwidth=parseFloat(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseFloat(getComputedStyle(holder).getPropertyValue("height"));
var inheight=parseFloat(getComputedStyle(map).getPropertyValue("height"));
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var pointers=[];
map.style.top='0px';
map.style.left='0px';
var mp=0; //mark-counter
function shift()
{
    var al=parseFloat(map.style.left);
    var at=parseFloat(map.style.top);
    pointers.forEach(function (value,index)
    {

        var mark=holder.children[index+1];
        var nx=value[0]+al;
        var ny=value[1]+at;
        // console.log(nx,ny);
        // console.log(value[0],value[1],al,at,nx,ny);
        mark.style.left=nx+'px';
        mark.style.top=ny+'px';
    });
}
function scaleshift(factor)
{
    var al=parseFloat(map.style.left)*factor;
    var ah=parseFloat(getComputedStyle(map).getPropertyValue('height'));
    pointers.forEach(function(value,index)
    {
       var mark=holder.children[index+1];
       var nx=value[0]+al;
       var ny=(value[1]*ah)/inheight;
       console.log(ah,ny);
       mark.style.left=nx+'px';
       mark.style.top=ny+'px'
    });
}
ham.on('pinchmove',function(e)
{
    e.preventDefault();
    var width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
    var w=(width*e.scale);
    var x=e.center['x'];
    var y=e.center['y'];
    var l=(x*e.scale);
    console.log(e.scale);
    var t=(y*e.scale);
        if( (w-l) >= dwidth )
        {
            map.style.width=w+'px';
            map.style.left=-l+'px';
            scaleshift(e.scale);
        }
        // else
        // {
        //     map.style.left=0+'px';
        //     shift();
        // }

});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
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
    var mt=parseFloat(getComputedStyle(map).getPropertyValue("top"));
    var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
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
    var mr=parseFloat(getComputedStyle(map).getPropertyValue("right"));
    var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
    if((mr+e.distance)<=0)
    {

        map.style.left=(ml-e.distance)+'px';
        shift();

    }
    else
    {
        map.style.left=(ml+mr)+'px';
        shift();

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
        shift();
    }
    else
    {
        map.style.bottom=(mt+mb)+'px';
        shift();

    }
});
ham.on('tap',function(e)
{
    e.preventDefault();
    console.log(e.center['y']);
    var x=e.center['x'];
    var y=e.center['y'];
    var cl=parseFloat(map.style.left);
    var ct=parseFloat(map.style.top);
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