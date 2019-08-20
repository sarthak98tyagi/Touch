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
var dis1,dis2, dis3,width,height,xcor,ycor,x,y,nw,nh,factor,nxcor,nycor,tl,tt,tr,tb;
map.addEventListener('touchstart',function(e)
{
    e.preventDefault();
    if(e.targetTouches.length===2)
    {
        dis1=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
        x=(e.targetTouches[0].clientX+e.targetTouches[1].clientX)/2;
        xcor=Math.abs(parseFloat(map.style.left))+x;
        y=(e.targetTouches[0].clientY+e.targetTouches[0].clientY)/2;
        ycor=Math.abs(parseFloat(map.style.top))+y;
    }
    dis3 = dis1;
});
map.addEventListener('touchmove',function(e)
{
    e.preventDefault();
   if(e.targetTouches.length===2)
   {
       dis2=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
       if((dis2-dis3)>0)
       {
           width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
           height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
           nw=width+dis2*2;
           f=nw/width;
           nh=height*f;
           nxcor=(xcor/width)*nw;
           nycor=(ycor/height)*nh;
           tl=nxcor-x;
           tt=nycor-y;
           tr=parseFloat(getComputedStyle(map).getPropertyValue('right'))*f;
           tb=parseFloat(getComputedStyle(map).getPropertyValue('bottom'))*f;
           console.log(nw,tl,tr);
           if((nw-tl-tr)>=dwidth && (nh-tt-tb)>=dheight)
           {
               map.style.width=nw+'px';
               map.style.left=-tl+'px';
               map.style.top=-tt+'px';
               scaleshift(f);
           }

           // console.log('Positive Zoom');
       }
       else
       {
           width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
           height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
           nw=width-dis2;
           f=nw/width;
           nh=height*f;
           nxcor=(xcor/width)*nw;
           nycor=(ycor/height)*nh;
           tl=nxcor-x;
           tt=nycor-y;
           tr=parseFloat(getComputedStyle(map).getPropertyValue('right'));
           tb=parseFloat(getComputedStyle(map).getPropertyValue('bottom'))*f;
           console.log(nw,tl,tr);
           if((nw-tl-tr)>=dwidth && (nh-tt-tb)>=dheight)
           {
               map.style.width=nw+'px';
               map.style.left=-tl+'px';
               map.style.top=-tt+'px';
               scaleshift(f);
           }
           // console.log("Negative Zoom");
       }
   }
   dis3 = dis2;
});
// ham.on('pinchmove',function(e)
// {
//     cnt=1;
//     e.preventDefault();
//     var width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
//     var height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
//     var r=parseFloat(getComputedStyle(map).getPropertyValue('right'));
//     e.scale=e.scale>1.2?1.2:e.scale;
//     var w=width*e.scale;
//     var h=height*e.scale;
//     var x=e.center['x'];
//     var y=e.center['y'];
//     var xcor=Math.abs(parseFloat(map.style.left))+x;
//     var ycor=Math.abs(parseFloat(map.style.top))+y;
//     console.log(x,y,xcor,ycor,"!");
//     var nxcor=((xcor/width)*w);
//     var nycor=((ycor/height)*h);
//     var tl=(nxcor-x);
//     var tt=(nycor-y);
//     if( (w-tl) >= dwidth && (h-tt) >= dheight)
//         {
//             map.style.width=w+'px';
//             map.style.left=-tl+'px';
//             map.style.top=-tt+'px';
//             scaleshift(e.scale);
//         }
// });
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
    console.log(x,y);
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
    var move=0;
    pham.on('press',function(e)
    {
            move=1;
            pham.set({enable:false});
            ham.set({enable:false});
            e.target.style.background="yellow";
            e.target.addEventListener('touchmove',function(e)     /*drag module*/
                {
                    e.preventDefault();
                    if(e.targetTouches.length===1 && move)
                    {
                        var dim=e.targetTouches[0];
                        e.target.style.left=dim.clientX+'px';
                        e.target.style.top=dim.clientY+'px';
                        var cl=parseFloat(map.style.left);
                        var ct=parseFloat(map.style.top);
                        pham.set({enable:true});
                        ham.set({ enable:true});
                        var w=parseFloat(getComputedStyle(map).getPropertyValue('width'));
                        var k=document.documentElement.clientWidth;
                        var h=parseFloat(getComputedStyle(map).getPropertyValue('height'));
                        var l=document.documentElement.clientHeight;
                        if((document.documentElement.clientWidth-dim.clientX)<30)
                        {

                            var rr=w+parseFloat(map.style.left)-k;
                            var rdis=Math.abs(k-dim.clientX);
                            if((-rr+rdis)<=0)
                            {
                                var rl=parseFloat(map.style.left);
                                map.style.left=(rl-rdis)+'px';
                                scaleshift();
                            }
                        }
                        if((document.documentElement.clientHeight-dim.clientY)<30)
                        {

                            var bb=h+parseFloat(map.style.top)-l;
                            var bdis=Math.abs(l-dim.clientY);
                            if((-bb+bdis)<=0)
                            {
                                var bt=parseFloat(map.style.top);
                                map.style.top=(bt-bdis)+'px';
                                scaleshift();
                            }
                        }
                        if(dim.clientX<30)
                        {
                            var ll=parseFloat(map.style.left);
                            var ldis=30-dim.clientX;
                            if((ll+ldis)<=0)
                            {
                                map.style.left=(ll+ldis)+'px';
                                scaleshift();
                            }
                        }
                        if(dim.clientY<30)
                        {
                            var tl=parseFloat(map.style.top);
                            var tdis=30-dim.clientY;
                            if((tl+tdis)<=0)
                            {
                                map.style.top=(tl+tdis)+'px';
                                scaleshift();
                            }
                        }
                        var xmark=Math.abs(cl)+dim.clientX;
                        var ymark=Math.abs(ct)+dim.clientY;
                        var inwidth=parseFloat(getComputedStyle(map).getPropertyValue('width'));
                        var inheight=parseFloat(getComputedStyle(map).getPropertyValue('height'));
                        pointers[e.target.id]=[xmark,ymark,inwidth,inheight,message[e.target.id]];
                    }
                });
            e.target.addEventListener('touchend',function(e)
            {
                if(move)
                {
                    move = 0;
                    e.target.style.background = "transparent";
                }
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

