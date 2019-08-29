var dis1,dis2,dis3,width,height,xcor,ycor,x,y,nw,nh,f,nxcor,nycor,tl,tt,map,holder,screen,dwidth,dheight,ham,pham,mp=0,cnt=0,move=0
    ,ml,mr,mt,mb,id,del,cl,ct,inwidth,inheight,dim,k,l,ll,bb,ldis,bdis,rdis,tdis,rr;
map=document.getElementById("map");
holder=document.getElementById("map-holder");
screen=document.getElementById('screen');
dwidth=parseFloat(getComputedStyle(holder).getPropertyValue("width"));
dheight=parseFloat(getComputedStyle(holder).getPropertyValue("height"));
ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
var pointers={};
map.style.top='0px';
map.style.left='0px';
var message=['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
function scaleshift(factor=1)
{
    var cw=factor===1?parseFloat(getComputedStyle(map).getPropertyValue('width')):parseFloat(map.style.width);
    var ah=parseFloat(getComputedStyle(map).getPropertyValue('height'))*factor;
    console.log(factor,cnt);
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
    width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
    height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
    nw=width*1.25;
    f=nw/width;
    console.log(f);
    nh=height*1.25;
    xcor=Math.abs(parseFloat(map.style.left))+document.documentElement.clientWidth/2;
    ycor=Math.abs(parseFloat(map.style.top))+document.documentElement.clientHeight/2;
    nxcor=(xcor/width)*nw;
    nycor=(ycor/height)*nh;
    tl=nxcor-document.documentElement.clientWidth/2;
    tt=nycor-document.documentElement.clientHeight/2;
    console.log(tl,tt);
    if((-tl)<0 && (-tt)<0)
    {
        map.style.width=nw+'px';
        map.style.left=-tl+'px';
        map.style.top=-tt+'px';
        scaleshift(f);
    }
    cnt=1;
}
function neg(e)
{
    e.preventDefault();
    width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
    height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
    nw=width*0.75;
    f=nw/width;
    console.log(f);
    nh=height*f;
    xcor=Math.abs(parseFloat(map.style.left))+document.documentElement.clientWidth/2;
    ycor=Math.abs(parseFloat(map.style.top))+document.documentElement.clientHeight/2;
    nxcor=(xcor/width)*nw;
    nycor=(ycor/height)*nh;
    tl=nxcor-document.documentElement.clientWidth/2;
    tt=nycor-document.documentElement.clientHeight/2;
    if((-tl)<0 && (-tt)<0)
    {
        map.style.width=nw+'px';
        map.style.left=-tl+'px';
        map.style.top=-tt+'px';
        scaleshift(f);
    }
    cnt=1;
}
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
   {   cnt=1;
       dis2=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
       if((dis2-dis3)>0)                /*zoom-in*/
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
           if((-tl)<0 && (-tt)<0)
           {
               map.style.width=nw+'px';
               map.style.left=-tl+'px';
               map.style.top=-tt+'px';
               scaleshift(f);
           }
       }
       else                          /*zoom-out*/
       {
           width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
           height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
           nw=width-dis2*2;
           f=nw/width;
           nh=height*f;
           nxcor=(xcor/width)*nw;
           nycor=(ycor/height)*nh;
           tl=nxcor-x;
           tt=nycor-y;
           if((-tl)<0 && (-tt)<0)
           {
               map.style.width=nw+'px';
               map.style.left=-tl+'px';
               map.style.top=-tt+'px';
               scaleshift(f);
           }
       }
   }
   dis3 = dis2;
});
ham.on('swiperight',function(e)
{
    cnt=1;
    e.preventDefault();
    ml=parseFloat(map.style.left);
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
    mt=parseFloat(map.style.top);
    ml=parseFloat(map.style.left);
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
    mr=parseFloat(getComputedStyle(map).getPropertyValue("right"));
    ml=parseFloat(map.style.left);
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
    mb=parseFloat(getComputedStyle(map).getPropertyValue("bottom"));
    h=parseFloat(getComputedStyle(map).getPropertyValue('height'));
    mt=parseFloat(map.style.top);
    if(Math.abs(mt-e.distance)<=(h-dheight))
    {
        map.style.top=(mt-e.distance)+'px';
        scaleshift();
    }
    else if(h>document.documentElement.clientHeight)
    {
        map.style.top=-(h-document.documentElement.clientHeight)+'px';
        scaleshift();
    }
});
ham.on('tap',function(e)
{
    e.preventDefault();
    x=e.center['x'];
    y=e.center['y'];
    cl=parseFloat(map.style.left);
    ct=parseFloat(map.style.top);
    xmark=Math.abs(cl)+x;
    ymark=Math.abs(ct)+y;
    var mark=document.createElement("div");
    mark.id=mp;
    inwidth=parseFloat(getComputedStyle(map).getPropertyValue('width'));
    inheight=parseFloat(getComputedStyle(map).getPropertyValue('height'));
    pointers[mp]=[xmark,ymark,inwidth,inheight,message[mp]];
    mark.className="mark";
    mark.style.left=x+'px';
    mark.style.top=y+'px';
    holder.appendChild(mark);
    var pin=document.getElementById(mp);
    pham=new Hammer(pin);
    pham.on('tap',function(e)                  /*Attach and Detach Pin*/
    {
            console.log('!!');
            pham.set({enable:false});
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
            e.target.addEventListener('touchmove',function(e)     /*drag*/
                {
                    e.preventDefault();
                    if(e.targetTouches.length===1 && move)
                    {

                        dim=e.targetTouches[0];
                        w=parseFloat(getComputedStyle(map).getPropertyValue('width'));
                        k=document.documentElement.clientWidth;
                        h=parseFloat(getComputedStyle(map).getPropertyValue('height'));
                        l=document.documentElement.clientHeight;
                        cl=parseFloat(map.style.left);
                        ct=parseFloat(map.style.top);
                        pham.set({enable:true});
                        ham.set({ enable:true});
                        if((40<dim.clientX && (k-dim.clientX)>40) && ((40<dim.clientY && (l-dim.clientY)>40)))
                        {

                            e.target.style.left=(dim.clientX)+'px';
                            e.target.style.top=(dim.clientY)+'px';
                        }

                        if((k-dim.clientX)<30)
                        {
                            rr=w+parseFloat(map.style.left)-k;
                            rdis=Math.abs(k-dim.clientX);
                            if((-rr+rdis)<=0)
                            {
                                var rl=parseFloat(map.style.left);
                                map.style.left=(rl-rdis)+'px';
                                cnt=1;
                                scaleshift();
                            }
                        }
                        if((l-dim.clientY)<30)
                        {

                            bb=h+parseFloat(map.style.top)-l;
                            bdis=Math.abs(l-dim.clientY);
                            if((-bb+bdis)<=0)
                            {
                                var bt=parseFloat(map.style.top);
                                map.style.top=(bt-bdis)+'px';
                                cnt=1;
                                scaleshift();
                            }
                        }
                        if(dim.clientX<30)
                        {
                            ll=parseFloat(map.style.left);
                            ldis=30-dim.clientX;
                            if((ll+ldis)<=0)
                            {
                                map.style.left=(ll+ldis)+'px';
                                cnt=1;
                                scaleshift();
                            }
                        }
                        if(dim.clientY<30)
                        {
                            tl=parseFloat(map.style.top);
                            tdis=30-dim.clientY;
                            if((tl+tdis)<=0)
                            {
                                map.style.top=(tl+tdis)+'px';
                                cnt=1;
                                scaleshift();
                            }
                        }
                        xmark=Math.abs(cl)+dim.clientX;
                        ymark=Math.abs(ct)+dim.clientY;
                        inwidth=parseFloat(getComputedStyle(map).getPropertyValue('width'));
                        inheight=parseFloat(getComputedStyle(map).getPropertyValue('height'));
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
            pham.set({enable:true});
            ham.set({ enable:true});
    });

        mp=mp+1;
});
function remove(e)
{
 id=Number(e.target.parentElement.id);
 delete(pointers[id]);
 del=document.getElementById(id);
 holder.removeChild(del);
 screen.removeChild(document.getElementById(id));
 pham.set({enable:true});
 ham.set({enable:true});
}
function cancel(e)
{
    screen.removeChild(e.target.parentElement);
}

