var map=document.getElementById("map");
var holder=document.getElementById("map-holder");
// var pin=document.getElementsByClassName('mark');
var screen=document.getElementById('screen');
var dwidth=parseFloat(getComputedStyle(holder).getPropertyValue("width"));
var dheight=parseFloat(getComputedStyle(holder).getPropertyValue("height"));
var mheight=parseFloat(getComputedStyle(map).getPropertyValue("height"));
var ham= new Hammer(map);
var pham;
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var pointers={};
map.style.top='0px';
map.style.left='0px';
var mp=0; //mark-counter
var message=['One','Two','Three','Four','Five','Six'];
var cnt=0;
var move=0;
function scaleshift(factor=1)
{
    var cw=factor===1?parseFloat(getComputedStyle(map).getPropertyValue('width')):parseFloat(map.style.width);
    var ah=parseFloat(getComputedStyle(map).getPropertyValue('height'))*factor;
    if(cnt===0)
    {
        ah=ah/factor;
    }
    var al=parseFloat(map.style.left);
    var at=parseFloat(map.style.top);
    Object.entries(pointers).forEach(function(value,index)
    {
        if(value[1][0])
        {
            var ws=(value[1][0]*cw)/value[1][2];
            var mark=document.getElementById(value[0]);
            var nx=ws+al;
            var ny=((value[1][1]*ah)/value[1][3])+at;
            mark.style.left=nx+'px';
            mark.style.top=ny+'px';
        }
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
        scaleshift(scale);
    }
    cnt=1;
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
    cnt=1;
}
ham.on('pinchmove',function(e)
{
    cnt=1;
    e.preventDefault();
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
    cnt=1;
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
    cnt=1;
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
    cnt=1;
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
    cnt=1;
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
    var pin=document.getElementById(mp);
    pham=new Hammer(pin);
    pham.on('tap',function(e)
    {
        ham.set({enable:false});
        var popup=document.createElement("div");
        popup.innerText=pointers[e.target.id][4];
        popup.id=e.target.id;
        popup.innerHTML +='<p></p><button class="btn btn-danger" onclick="remove(event)">Remove point</button>';
        popup.innerHTML +='<i class="fas fa-times close" onclick="cancel(event)"></i>';
        popup.className="popup";
        screen.appendChild(popup);
    });

    pham.on('press',function(e)
    {

        e.preventDefault();
        pham.set({enable:false});
        ham.set({ enable: false});
        e.target.style.background="yellow";
        e.target.addEventListener('touchmove',function(e)
        {
            move=1;
            e.preventDefault();
            if(move===1)
            {
                if(e.targetTouches.length===1)
                {
                    var dim=e.targetTouches[0];
                    e.target.style.left=dim.clientX+'px';
                    e.target.style.top=dim.clientY+'px';
                }
            }
        });
        e.target.addEventListener('touchend',function(e)
        {
            e.preventDefault();
            e.target.style.background="transparent";
            pham.set({enable:true});
            ham.set({enable:true});
            move=0;
        });

    });
    mp=mp+1;
});
function remove(e)
{
 var tg=Number(e.target.parentElement.id);
 delete(pointers[tg]);
 var del=document.getElementById(tg);
 var c=holder.removeChild(del);
 screen.removeChild(e.target.parentElement);
 ham.set({enable:true});
}
function cancel(e)
{
    screen.removeChild(e.target.parentElement);
    ham.set({enable:true});
}

