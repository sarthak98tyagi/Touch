function friend(url)
{
    var mapholder=document.createElement("div");
    mapholder.style.position="relative";
    mapholder.style.width="100%";
    mapholder.style.hieght="100vh";
    mapholder.style.background="black";
    mapholder.id="map-holder";
    document.body.appendChild(mapholder);
    var map=document.createElement("img");
    map.src=url;
    map.alt="Map";
    map.id='map';
    map.style.position='absolute';
    map.style.left='0px';
    map.style.top='0px';
    map.style.minWidth="100%";
    mapholder.appendChild(map);
}
class Marker
{
    constructor(url,pointers={})
    {
        if (url === '')
            return;
        this.url = url;
        this.pointers=pointers;
        this.cnt=0;
    }
    getPin(n)
    {
        if(this.pointers[n])
        return this.pointers[n];
        return NULL; // need info
    }
    getJSON()
    {
        return(this.pointers);
    }
    setPin(msg)
    {
            friend(this.url);
            var info = [], mp = 0;
            if (Array.isArray(msg))
                info = msg;
            else if (typeof (msg) == "string" || typeof (msg) == "number")
                info.push(msg);
            else if (typeof (msg) == "object")
            {
                Object.entries(msg).forEach(function (value, index) {
                    info.push(value);
                });
            }
            var removePin,cancelPin,pop,move;
            var map = document.getElementById('map');
            var mapClick = function (e)
            {
                if (info.length > 0)
                {
                    e.preventDefault();
                    e.stopPropagation();
                    var xmark = Math.abs(parseFloat(map.style.left)) + e.clientX;
                    var ymark = Math.abs(parseFloat(map.style.top)) + e.clientY;
                    var mark = document.createElement("div");
                    mark.id = mp;
                    mark.className = 'mark';
                    this.pointers[mp] = [xmark, ymark, parseFloat(getComputedStyle(map).getPropertyValue('width')),
                        parseFloat(getComputedStyle(map).getPropertyValue('height')), info.pop(0)];
                    mark.style.left = e.clientX + 'px';
                    mark.style.top = e.clientY + 'px';
                    document.getElementById('map-holder').appendChild(mark);
                    removePin=function(e)
                    {
                        var id=Number(e.target.parentElement.id);
                        delete(this.pointers[id]);
                        document.getElementById('map-holder').removeChild(document.getElementById("box"+id));
                        document.getElementById('map-holder').removeChild(document.getElementById(id));
                        mark.addEventListener('click', pop);
                        map.addEventListener('click',mapClick);
                    }.bind(this);
                    cancelPin=function(e,f=0)
                    {
                        document.getElementById('map-holder').removeChild(e.target.parentElement);
                        mark.addEventListener('click', pop);
                        map.addEventListener('click',mapClick);
                    };
                    pop = function (e)
                    {
                            mark.removeEventListener('click', pop);
                            map.removeEventListener('click',mapClick);
                            var popup = document.createElement("div");
                            popup.innerText = this.pointers[e.target.id][4];
                            popup.id = "box"+e.target.id;
                            var btn = document.createElement("button");
                            btn.className = "btn btn-danger";
                            btn.innerText = "Remove";
                            btn.addEventListener("click", removePin);
                            var k = document.createElement("i");
                            k.className = "fas fa-times close";
                            popup.className = "popup";
                            k.addEventListener('click', cancelPin);
                            document.getElementById('map-holder').appendChild(popup);
                            popup.appendChild(btn);
                            popup.appendChild(k);
                    }.bind(this);
                    move=0;
                    mark.addEventListener('click', pop);
                    mark.addEventListener('contextmenu',desktopPress,false);
                    mp = mp + 1;
                }
            }.bind(this);
            var desktopPress=function(e)
            {
                e.preventDefault();
                e.stopPropagation();
                if((document.documentElement.clientWidth)>=992)
                {
                    map.removeEventListener('click',mapClick);
                    e.target.removeEventListener('click',pop);
                    e.target.removeEventListener('contextmenu',desktopPress);
                    var evn=e;
                    var popup = document.createElement("div");
                    popup.innerText = this.pointers[e.target.id][4];
                    popup.id = "box"+e.target.id;
                    var btn1 = document.createElement("button");
                    btn1.className = "btn btn-danger";
                    btn1.innerText = "Remove";
                    btn1.addEventListener("click", removePin);
                    var btn2 = document.createElement("button");
                    btn2.className = "btn btn-danger";
                    btn2.innerText = "Edit";
                    // console.log(this.pointers[evn.target.id]);
                    btn2.addEventListener("click",function(e)
                    {
                        document.getElementById('map-holder').removeChild(e.target.parentElement);
                        evn.target.style.background='yellow';
                        var locate=function(e)
                        {
                            var dx=e.clientX;
                            var dy=e.clientY;
                            evn.target.style.left=dx+'px';
                            evn.target.style.top=dy+'px';
                            this.pointers[evn.target.id][0]=parseFloat(map.style.left)+dx;
                            this.pointers[evn.target.id][1]=parseFloat(map.style.top)+dy;
                            console.log(this.pointers[evn.target.id]);
                            evn.target.style.background='transparent';
                            map.removeEventListener('click',locate);
                            map.addEventListener('click',mapClick);
                            evn.target.addEventListener('contextmenu',desktopPress);
                            evn.target.addEventListener('click',pop);
                        }.bind(this);
                        map.addEventListener('click',locate);
                    }.bind(this));
                    var k = document.createElement("i");
                    k.className = "fas fa-times close";
                    popup.className = "popup";
                    k.addEventListener('click',function(e)
                    {
                        document.getElementById('map-holder').removeChild(e.target.parentElement);
                        map.addEventListener('click',mapClick);
                        evn.target.addEventListener('contextmenu',desktopPress);
                        evn.target.addEventListener('click',pop);
                    });
                    document.getElementById('map-holder').appendChild(popup);
                    popup.appendChild(btn1);
                    popup.appendChild(btn2);
                    popup.appendChild(k);
                    return false;
                }
                else
                {
                    this.pinDrag(e,move);
                }
            }.bind(this);
            map.addEventListener("click touchstart", function (e) {
                e.preventDefault();
                if(e.targetTouches.length==1)
                {
                    
                }
            }.bind(this));
            map.addEventListener("touchmove", function () {

            });
            map.addEventListener('click touchstart', mapClick);
            map.addEventListener('touchstart',this.pinchstart.bind(this));
            map.addEventListener('touchmove',this.pinchmove.bind(this));
    }
    pinchstart(e)
    {
        this.x=e.targetTouches[0].clientX;
        this.y=e.targetTouches[0].clientY;
        e.preventDefault();
        if(e.targetTouches.length===2)
        {
            this.dis1=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
            this.x=(e.targetTouches[0].clientX+e.targetTouches[1].clientX)/2;
            this.xcor=Math.abs(parseFloat(document.getElementById('map').style.left))+this.x;
            this.y=(e.targetTouches[0].clientY+e.targetTouches[0].clientY)/2;
            this.ycor=Math.abs(parseFloat(document.getElementById('map').style.top))+this.y;
        }
        this.dis3 = this.dis1;
    }
    pinchmove(e)
    {
        var map=document.getElementById('map');
        var width,height,nw,f,nh,tl,tt,dis2,ch,dis,ml,mr,mt;
        width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
        height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
        e.preventDefault();
        if(e.targetTouches.length===1)
        {
            console.log(e.targetTouches.length);
            ch=(Math.abs(e.targetTouches[0].clientX-this.x)>Math.abs(e.targetTouches[0].clientY-this.y))?1:0;
            if(ch===1)
            {
                this.cnt=1;
                ml=parseFloat(map.style.left);
                mr=parseFloat(getComputedStyle(map).getPropertyValue('right'));
                dis=e.targetTouches[0].clientX - this.x;
                console.log(ml,mr,dis);
                if(dis<0)
                {
                    if (Math.abs(ml - Math.abs(dis)) <= (width - document.documentElement.clientWidth))
                    {
                        map.style.left = (ml - Math.abs(dis)) + 'px';
                        console.log('!!');

                    }
                    else if(width>document.documentElement.clientWidth)
                    {

                        map.style.left = -(width-document.documentElement.clientWidth) + 'px'
                    }
                }
                else
                {
                    if((ml+dis)<0)
                    {
                        map.style.left=(ml+dis)+'px';

                    }
                    else {map.style.left=0+'px';}
                }
            }
            else
            {
                dis = e.targetTouches[0].clientY - this.y;
                mt = parseFloat(map.style.top);
                if (dis < 0)
                {
                    if (Math.abs(mt - Math.abs(dis)) <= (height - document.documentElement.clientHeight)) {
                        map.style.top = (mt - Math.abs(dis)) + 'px';

                    } else if (height > document.documentElement.clientHeight) {
                        map.style.top = -(height - document.documentElement.clientHeight) + 'px';

                    }

                }
                else
                {
                    if((mt+dis)<0)
                    {
                        map.style.top=(mt+dis)+'px';
                    }
                    else
                    {
                        map.style.top=0+'px';
                    }
                }

            }

        }
        else if(e.targetTouches.length===2)
        {   this.cnt=1;
            this.dis2=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
            if((this.dis2-this.dis3)>0)                /*zoom-in*/
            {
                width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
                height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
                nw=width+this.dis2*2;
                f=nw/width;
                nh=height*f;
                tl=((this.xcor/width)*nw)-this.x;
                tt=((this.ycor/height)*nh)-this.y;
                if((-tl)<0 && (-tt)<0)
                {
                    map.style.width=nw+'px';
                    map.style.left=-tl+'px';
                    map.style.top=-tt+'px';
                    this.scaleshift(f);
                }
            }
            else                          /*zoom-out*/
            {
                width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
                height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
                nw=width-this.dis2*2;
                f=nw/width;
                nh=height*f;
                tl=((this.xcor/width)*nw)-this.x;
                tt=((this.ycor/height)*nh)-this.y;
                if((-tl)<0 && (-tt)<0)
                {
                    map.style.width=nw+'px';
                    map.style.left=-tl+'px';
                    map.style.top=-tt+'px';
                    this.scaleshift(f);
                }
            }
        }
        this.dis3 = this.dis2;
    }
    pinDrag(e,move)
    {
        move = 1;
        e.preventDefault();
        e.target.style.background = "yellow";
        
    }
    scaleshift(factor=1)
    {
        var map=document.getElementById('map');
        var cw=factor===1?parseFloat(getComputedStyle(map).getPropertyValue('width')):parseFloat(map.style.width);
        var ah=parseFloat(getComputedStyle(map).getPropertyValue('height'))*factor;
        if(this.cnt===0)
        {
            ah=ah/factor;
        }
        var al=parseFloat(map.style.left);
        var at=parseFloat(map.style.top);
        Object.entries(this.pointers).forEach(function(value,index)
        {
            if(value[1][0])
            {
                var ws=(value[1][0]*cw)/value[1][2];
                console.log(value[0]);
                var mark=document.getElementById(value[0]);
                var nx=ws+al;
                var ny=((value[1][1]*ah)/value[1][3])+at;
                mark.style.left=nx+'px';
                mark.style.top=ny+'px';
            }
        });
    }
    managePin(n,editable)
    {
        friend(this.url);
        if(this.pointers[n])
        {
            var map = document.getElementById('map');
            map.style.width = this.pointers[n][2];
            map.style.left = '0px';
            map.style.top = '0px';
            var mark = document.createElement("div");
            mark.id = n;
            mark.className='mark';
            mark.style.left = this.pointers[n][0]+'px';
            mark.style.top = this.pointers[n][1]+'px';
            document.getElementById('map-holder').appendChild(mark);
        }
    }
    destroy()
    {
        document.body.removeChild(document.getElementById('map-holder'));
    }
}
a=new Marker('assets/images/map.jpg');
a.setPin(['hello','hi']);

