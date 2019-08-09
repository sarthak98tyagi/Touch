var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
var pin=document.getElementsByClassName('mark');
var dwidth=parseFloat(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseFloat(getComputedStyle(holder).getPropertyValue("height"));
var mheight=parseFloat(getComputedStyle(map).getPropertyValue("height"));
var ham= new Hammer(map);
var pham=[];
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var pointers={};
map.style.top='0px';
map.style.left='0px';
var vh=document.documentElement.clientHeight;
var mp=0; //mark-counter
var message=['One','Two','Three','Four','Five','Six'];
function scaleshift(factor=1)
{
    var cw=factor===1?parseFloat(getComputedStyle(map).getPropertyValue('width')):parseFloat(map.style.width);
    var ah=parseFloat(getComputedStyle(map).getPropertyValue('height'))*factor;
    var al=parseFloat(map.style.left);
    var at=parseFloat(map.style.top);
    Object.entries(pointers).forEach(function(value,index)
    {
        var ws=(value[1][0]*cw)/value[1][2];
        var mark=holder.children[index+1];
        var nx=ws+al;
        var ny=((value[1][1]*ah)/value[1][3])+at;
        mark.style.left=nx+'px';
        mark.style.top=ny+'px';
    });
}
function pos(e)
{
    e.preventDefault();
    var scale=1.25;
    var width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
    var height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
    var w=(width*scale);
    var h=(height*scale);
    var x=parseFloat(e.clientX);
    var y=parseFloat(e.clientY);
    var l=(x*scale);
    var t=(y*scale);
    var top=parseFloat(map.style.top);
    var ch=h<mheight?top===0:true;
    if( (w-l) >= dwidth && w<3000 && (-top)<mheight)
    {
        map.style.width=w+'px';
        map.style.left=-l+'px';
        scaleshift(1.25);
    }
}
function neg(e)
{
    e.preventDefault();
    var scale=0.75;
    var width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
    var height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
    var w=(width*scale);
    var h=(height*scale);
    var x=parseFloat(e.clientX);
    var y=parseFloat(e.clientY);
    var l=(x*scale);
    var t=(y*scale);
    var top=parseFloat(map.style.top);
    var ch=h<mheight?top===0:true;
    if( (w-l) >= dwidth && w<3000 && (-top)<mheight)
    {
        map.style.width=w+'px';
        map.style.left=-l+'px';
        scaleshift(scale);
    }
}
ham.on('pinchmove',function(e)
{
    e.preventDefault();
    console.log('Hello');
    var width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
    var height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
    var w=(width*e.scale);
    var h=(height*e.scale);
    var x=e.center['x'];
    var y=e.center['y'];
    var l=(x*e.scale);
    var t=(y*e.scale);
    var top=parseFloat(map.style.top);
    var ch=h<mheight?top===0:true;
        if( (w-l) >= dwidth && w<3000 && (-top)<mheight)
        {
            map.style.width=w+'px';
            map.style.left=-l+'px';
            scaleshift(e.scale);
        }
});
ham.on('swiperight',function(e)
{
  e.preventDefault();
  var ml=parseFloat(map.style.left);
  if((ml+e.distance)<0)
  {
      map.style.left=(ml+e.distance)+'px';
      scaleshift();
  }
  else
  {
      map.style.left=0+'px';
      scaleshift();
  }
});
ham.on('swipedown',function(e)
{
    e.preventDefault();
    var mt=parseFloat(map.style.top);
    var ml=parseFloat(map.style.left);
    if((mt+e.distance)<0)
    {
        map.style.top=(mt+e.distance)+'px';
        scaleshift();

    }
    else
    {
        map.style.top=0+'px';
        scaleshift();
    }
});
ham.on('swipeleft',function(e)
{
    e.preventDefault();
    var mr=parseFloat(getComputedStyle(map).getPropertyValue("right"));
    var ml=parseFloat(map.style.left);
    if((mr+e.distance)<=0)
    {
        map.style.left=(ml-e.distance)+'px';
        scaleshift();
    }
    else
    {
        map.style.left=(ml+mr)+'px';
        scaleshift();

    }
});
ham.on('swipeup',function(e)
{
    e.preventDefault();
    var mb=parseFloat(getComputedStyle(map).getPropertyValue("bottom"));
    var mt=parseFloat(map.style.top);
    // var ml=parseFloat(getComputedStyle(map).getPropertyValue("left"));
    if((mb+e.distance)<=0)
    {
        map.style.top=(mt-e.distance)+'px';
        scaleshift();
    }
    else
    {
        map.style.bottom=(mt+mb)+'px';
        scaleshift();

    }
});
ham.on('tap',function(e)
{
    e.preventDefault();
    var x=e.center['x'];
    var y=e.center['y'];
    var cl=parseFloat(map.style.left);
    var ct=parseFloat(map.style.top);
    var xmark=Math.abs(cl)+x;
    var ymark=Math.abs(ct)+y;
    var mark=document.createElement("div");
    mark.id=mp;
    var inwidth=parseFloat(getComputedStyle(map).getPropertyValue('width'));
    var inheight=parseFloat(getComputedStyle(map).getPropertyValue('height'));
    pointers[mp]=[xmark,ymark,inwidth,inheight,message[mp]];
    mark.className="mark";
    mark.style.left=x+'px';
    mark.style.top=y+'px';
    holder.appendChild(mark);
    pham[mp]=new Hammer(pin[mp]);
    pham[mp].on('tap',function(e)
    {
       console.log(pointers[e.target.id][4]);
    });
    mp=mp+1;
});
