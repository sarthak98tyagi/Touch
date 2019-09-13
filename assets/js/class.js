const MARKER_viewportWidth = document.documentElement.clientWidth;
const MARKER_viewportHeight= document.documentElement.clientHeight;
const MARKER_mapId = "inspectionMapImage";
var MARKER_holderId="map-holder";
let dragging = false;
class Marker
{
    constructor(url, pointer = [])
    {
        this.url = url;
        this.pointers = [];
        this.pins = pointer;
        this.cnt=0;
        this.mp=0;
        this.editable=true;
    }
    checkEvent(e)
    {
        var map=document.getElementById(MARKER_mapId);
        var holder=document.getElementById(MARKER_holderId);
        this.x=e.targetTouches[0]-holder.offsetLeft/2;
        this.y=e.targetTouches[0].clientY-holder.offsetTop;
        e.preventDefault();
        if(e.targetTouches.length===2)
        {
             var x1=e.targetTouches[1].clientX-holder.offsetLeft/2;
             var y1=e.targetTouches[1].clientY-holder.offsetTop;
            this.dis1=Math.hypot((x1-this.x),(y1-this.y));
            this.x=(this.x+x1)/2;
            this.xcor=Math.abs(parseFloat(map.style.left))+this.x;
            this.y=(this.y+y1)/2;
            this.ycor=Math.abs(parseFloat(map.style.top))+this.y;
        }
        this.dis3 = this.dis1;
    }
    findEvent(e)
    {

        var map=document.getElementById(MARKER_mapId);
        var holder=document.getElementById(MARKER_holderId);
        var x1=e.targetTouches[0].clientX-holder.offsetLeft/2;
        var y1=e.targetTouches[0].clientY-holder.offsetTop;
        console.log(x1,y1);
        if((Math.abs(this.x-x1)<1 && Math.abs(this.y-y1)<1) && e.targetTouches.length===1 && !isDesktop())
        {
            console.log('working');
            var x=x1+Math.abs(parseFloat(map.style.left));
            var y=y1+Math.abs(parseFloat(map.style.top));
            var w,h;
            w=parseFloat(getComputedStyle(map).getPropertyValue("width"));
            h=parseFloat(getComputedStyle(map).getPropertyValue("height"));
            if(this.info.length>0)
            {

                this.addPin({x: x, y: y, w: w, h: h, data: this.info.shift()})
            }
        }
        else if(e.targetTouches.length===1)
        {
            this.startSwipe(e);
        }
        else if(e.targetTouches.length===2)
        {
            if(!isDesktop())
            {
                this.startZoom(event);
            }
        }
    }
    scaleshift(factor=1)
    {
        var map=document.getElementById(MARKER_mapId);
        var cw=factor===1?parseFloat(getComputedStyle(map).getPropertyValue('width')):parseFloat(map.style.width);
        var ah=parseFloat(getComputedStyle(map).getPropertyValue('height'))*factor;
        if(this.cnt===0)
        {
            ah=ah/factor;
        }
        var al=parseFloat(map.style.left);
        var at=parseFloat(map.style.top);
        this.pointers.forEach(function(value,index)
        {
            if(this.pointers.length>0)
            {

                var ws=(this.pointers[index][0]*cw)/this.pointers[index][2];
                var mark=document.getElementById(index);
                if(mark)
                {
                    var nx=ws+al;
                    var ny=((this.pointers[index][1]*ah)/this.pointers[index][3])+at;
                    // console.log(nx,ny);
                    mark.style.left=nx+'px';
                    mark.style.top=ny+'px';
                }
            }
        }.bind(this));
    }
    startZoom(e)
    {
        this.cnt=1;
        var map=document.getElementById(MARKER_mapId);
        var holder=document.getElementById(MARKER_holderId);
        var w,h,nw,f,nh,tl,tt,dis2,width,height,ck;
        var lm=holder.offsetLeft/2;
        var tm=holder.offsetTop;
        this.dis2=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX-2*lm),(e.targetTouches[1].clientY-e.targetTouches[0].clientY-2*tm));
        if((this.dis2-this.dis3)>0)                /*zoom-in*/
        {
            width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
            height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
            nw=width+this.dis2;
            f=nw/width;
            nh=height*f;
            tl=((this.xcor/width)*nw)-this.x;
            tt=((this.ycor/height)*nh)-this.y;
            if(ck)
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
            nw=width-this.dis2;
            f=nw/width;
            nh=height*f;
            tl=((this.xcor/width)*nw)-this.x;
            tt=((this.ycor/height)*nh)-this.y;
            var r=parseFloat(getComputedStyle(map).getPropertyValue('right'));
            var b=parseFloat(getComputedStyle(map).getPropertyValue('bottom'));
            // ck = !(((nh <= MAP_initHeight && tt <= 0) || (nw <= MAP_initWidth && tl <= 0)) || ((nw - tl + r) < MARKER_viewportWidth || (nh - tt + b) < MARKER_viewportHeight));
            if((nw<MARKER_viewportWidth || (nw-tl-r)<MARKER_viewportWidth) || (nh<MARKER_viewportHeight || (nh-tt-r)<MARKER_viewportHeight) )
                ck=false;
            if(ck)
            {
                map.style.width=nw+'px';
                map.style.left=-tl+'px';
                map.style.top=-tt+'px';
                this.scaleshift(f);
            }
        }
        this.dis3 = this.dis2;
    }
    startSwipe(e)
    {
        var map=document.getElementById(MARKER_mapId);
        var holder=document.getElementById(MARKER_holderId);
        var width,height,ch,dis,ml,mr,mt;
        width=parseFloat(getComputedStyle(map).getPropertyValue("width"));
        height=parseFloat(getComputedStyle(map).getPropertyValue("height"));
        var lm=holder.offsetLeft/2;
        var tm=holder.offsetTop;
        ch=(Math.abs(e.targetTouches[0].clientX-lm-this.x)>Math.abs(e.targetTouches[0].clientY-this.y))?1:0;
        if(ch===1)
        {
            this.cnt=1;
            ml=parseFloat(map.style.left);
            mr=parseFloat(getComputedStyle(map).getPropertyValue('right'));
            dis=e.targetTouches[0].clientX-lm - this.x;
                if(dis<0)
                {
                    if(Math.abs(ml - Math.abs(dis)) <= (width - document.documentElement.clientWidth))
                    {
                        map.style.left = (ml - Math.abs(dis)) + 'px';
                        this.scaleshift();
                    }
                    else if(width>document.documentElement.clientWidth)
                    {

                        map.style.left = -(width-document.documentElement.clientWidth) + 'px';
                        this.scaleshift();
                    }
                }
                else
                {
                    if((ml+dis)<0)
                    {
                        map.style.left=(ml+dis)+'px';
                        this.scaleshift();

                    }
                    else {map.style.left=0+'px';this.scaleshift();}

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
                    this.scaleshift();

                } else if (height > document.documentElement.clientHeight) {
                    map.style.top = -(height - document.documentElement.clientHeight) + 'px';
                    this.scaleshift();
                }
            }
            else
            {
                if((mt+dis)<0)
                {
                    map.style.top=(mt+dis)+'px';
                    this.scaleshift();
                }
                else
                {
                    map.style.top=0+'px';
                    this.scaleshift();
                }
            }
        }
    }
    setPin(msg)
    {
        this.info = [];
        appendMapHolder(this.url);
        if (Array.isArray(msg))
            this.info = msg;
        else if (typeof (msg) == "object")
        {
            Object.entries(msg).forEach(function (value, index)
            {
                this.info.push(value);
            });
        }
        var map = document.getElementById(MARKER_mapId);
        var holder=document.getElementById(MARKER_holderId);
        map.addEventListener("touchstart", this.checkEvent.bind(this));
        map.addEventListener("touchmove", this.findEvent.bind(this));
        if(isDesktop())
        {
            map.addEventListener("click", function(e)
            {
                var x=(e.clientX-holder.offsetLeft/2)+Math.abs(parseFloat(map.style.left));
                var y = (e.clientY-holder.offsetTop)+Math.abs(parseFloat(map.style.top));
                console.log(e.clientX,e.clientY);
                var w,h;
                w = parseFloat(getComputedStyle(map).getPropertyValue("width"));
                h = parseFloat(getComputedStyle(map).getPropertyValue("height"));
                if(this.info.length>0)
                {
                    this.addPin({x: x, y: y, w: w, h: h, data: this.info.shift()});
                }
            }.bind(this));
        }
        this.catchEvent();
    }
    addPin(pinInfo)
    {
            const marker = document.createElement("div");
            marker.className='mark';
            marker.id=this.mp;
            this.pointers[this.mp]=[pinInfo.x,pinInfo.y,pinInfo.w,pinInfo.h,pinInfo.data];
            const pin = new Pin(pinInfo.x, pinInfo.y, pinInfo.w, pinInfo.h,pinInfo.data, marker, this.editable,this.mp);
            // this.pins.push(pin);
            this.mp=this.mp+1;
    }
    managePin(n,editable)
    {
        document.body.removeChild(document.getElementById('map-holder'));
        appendMapHolder(this.url);
        var map=document.getElementById(MARKER_mapId);
        map.addEventListener("touchstart", this.checkEvent.bind(this));
        map.addEventListener("touchmove", this.findEvent.bind(this));
        this.editable=editable;
        if(this.pointers[n])
        {
            var pinInfo = this.pointers[n];
            const marker = document.createElement("div");
            marker.className='mark';
            marker.id=n;
            const pin = new Pin(pinInfo[0], pinInfo[1], pinInfo[2], pinInfo[3],pinInfo[4], marker, this.editable,n);
            this.catchEvent();
        }
    }
    manageAllPins(editable)
    {
        this.editable=editable;
        document.body.removeChild(document.getElementById('map-holder'));
        appendMapHolder(this.url);
        var map=document.getElementById(MARKER_mapId);
        map.addEventListener("touchstart", this.checkEvent.bind(this));
        map.addEventListener("touchmove", this.findEvent.bind(this));
        this.pointers.forEach( function (value,index)
        {
            var pinInfo = this.pointers[index];
            const marker = document.createElement("div");
            marker.className='mark';
            marker.id=index;
            const pin = new Pin(pinInfo[0], pinInfo[1], pinInfo[2], pinInfo[3],pinInfo[4], marker, this.editable,index);
        }.bind(this));
        this.catchEvent();
        map.addEventListener("touchstart", this.checkEvent.bind(this));
        map.addEventListener("touchmove", this.findEvent.bind(this));
    }
    getJSON()
    {
        return(this.pointers);
    }
    getPin(n)
    {
        if(this.pointers[n])
            return this.pointers[n];
        return NULL; // need info
    }
    destroy()
    {
        document.body.removeChild(document.getElementById('map-holder'));
    }
    catchEvent()
    {
        document.getElementById(MARKER_mapId).addEventListener('modifyPin',function(e)
        {
            this.pointers[e.detail.index][0]=e.detail.x;
            this.pointers[e.detail.index][1]=e.detail.y;
            this.pointers[e.detail.index][2]=e.detail.w;
            this.pointers[e.detail.index][3]=e.detail.h;
        }.bind(this));
        document.getElementById(MARKER_mapId).addEventListener('removePin',function(e)
        {
            this.info.push(this.pointers[e.detail.index][4]);
            delete(this.pointers[e.detail.index]);
        }.bind(this));
        document.getElementById(MARKER_mapId).addEventListener('scaleshift',function(e)
        {
            this.scaleshift();
        }.bind(this))
    }

}
class Pin
{
    constructor(x,y,w,h,msg,marker,editable,index)
    {
        this.x=x;
        this.y=y;
        this.width=w;
        this.height=h;
        this.msg=msg;
        this.marker = marker;
        this.editable = editable;
        this.move=0;
        this.index=index;
        this.init();
    }
    init()
    {
        this.appendMarker(this.marker);
        this.marker.addEventListener('click',function(){this.openPopup(event,1)}.bind(this));
        if(this.editable)
        {
            this.marker.addEventListener("contextmenu",function(){this.openPopup(event,2)}.bind(this),false);
        }
    }
    openPopup(e,choice)
    {
        e.preventDefault();
        const allPopups = document.querySelectorAll(".popup");
        if(allPopups.length > 0 )
        {
            allPopups.forEach( function (popup)
            {
                popup.remove();
            })
        }
        var el = choice === 1 ? ["p", "i", "button"]: ["p", "i", "button", "button"];
        var elements = this.elements(el);
        this.appendPopup(elements, choice);
        elements[2].addEventListener("click", this.removePopup.bind(this));
        elements[1].addEventListener("click", this.deletePopup);
        if(choice === 2)
        {
            elements[3].addEventListener("click", this.dragPin.bind(this));
        }
    }
    appendPopup(elements, choice)
    {
        var popup = document.createElement("div");
        var map=document.getElementById(MARKER_mapId);
        popup.className = "popup";
        popup.id="box"+this.marker.id;
        var data;
        var deleteButtonClass = this.editable ? "btn btn-danger" : "btn btn-danger delete-display-none";
        if (choice === 2) data = [
            {text: this.msg, classes: ""},
            {text: "", classes: "fas fa-times"},
            {text: "Remove", classes: deleteButtonClass},
            {text: "Edit", classes: "btn btn-primary edit-pin"},
        ];
        if (choice === 1) data = [
            {text: this.msg},
            {text: "", classes: "fas fa-times"},
            {text: "Remove", classes: deleteButtonClass},
        ];
        elements.forEach( function (element, index)
        {
            element.innerText = data[index].text;
            element.style.marginTop='15px';
            element.className = data[index].classes;
            popup.appendChild(element);
        });
        popup.style.left=(this.x+parseFloat(map.style.left))+'px';
        popup.style.top=(this.y+parseFloat(map.style.top))+'px';
        document.getElementById('map-holder').appendChild(popup);
    }
    removePopup(e)
    {
        var id=e.target.parentElement.id;
        var v=new CustomEvent('removePin',{'detail':{index:this.index}});
        document.getElementById(MARKER_mapId).dispatchEvent(v);
        document.getElementById('map-holder').removeChild(document.getElementById(id));
        document.getElementById('map-holder').removeChild(document.getElementById(id.substring(3,)));
    }
    deletePopup(e)
    {
        document.getElementById('map-holder').removeChild(e.target.parentElement);
    }
    dragPin(e)
    {
        if(isDesktop())
        {
            this.startDrag(e);
            const map = document.getElementById(MARKER_mapId);
            var holder=document.getElementById(MARKER_holderId);
            var a=(e.target.parentElement.id).substring(3,);
            var evn=document.getElementById(a);
            var overLay=this.overlay();
            document.documentElement.appendChild(overLay);
            overLay.addEventListener("click", function(e)
            {
                dragging = true;
                e.preventDefault();
                e.stopPropagation();
                var dx=e.clientX-holder.offsetLeft/2;
                var dy=e.clientY-holder.offsetTop;
                evn.style.left=dx+'px';
                evn.style.top=dy+'px';
                this.x=parseFloat(map.style.left)+dx;
                this.y=parseFloat(map.style.top)+dy;
                evn.style.background='transparent';
                this.destroyOverlay();
                var evt=new CustomEvent('modifyPin',{'detail':{'x':this.x,'y':this.y,'w':this.width,'h':this.height,'index':this.index}});
                map.dispatchEvent(evt);
            }.bind(this));
        }
        else
        {
            this.marker.addEventListener("touchstart",this.startDrag(event));
        }
    }
    overlay()
    {
        var over=document.createElement('div');
        over.className='overlay';
        over.id='over';
        return over;
    }
    destroyOverlay()
    {
        document.documentElement.removeChild(document.getElementById('over'));
    }
    elements(el)
    {
        var elements = [];
        el.forEach( function (element, index)
        {
            elements.push(document.createElement(element));
        });
        return elements;
    }
    startDrag(e)
    {
        e.preventDefault();
        var a=(e.target.parentElement.id).substring(3,);
        this.move=1;
        document.getElementById(a).style.background = "yellow";
        this.deletePopup(e);
        var map=document.getElementById(MARKER_mapId);
        var holder=document.getElementById(MARKER_holderId);
        var scale=new CustomEvent('scaleshift');
        document.getElementById(a).addEventListener('touchmove', function (e)     /*drag*/
        {
            e.preventDefault();
            if (e.targetTouches.length === 1 && this.move)
            {
                var dim = e.targetTouches[0];
                var w = parseFloat(getComputedStyle(map).getPropertyValue('width'));
                var k = document.documentElement.clientWidth;
                var h = parseFloat(getComputedStyle(map).getPropertyValue('height'));
                var l = document.documentElement.clientHeight;
                var cl = parseFloat(map.style.left);
                var ct = parseFloat(map.style.top);
                var lm=holder.offsetLeft/2;
                var tm=holder.offsetTop;
                if ((40 < (dim.clientX-lm) && (k - (dim.clientX-lm)) > 40) && ((40 < (dim.clientY-tm) && (l - (dim.clientY-tm)) > 40)))
                {
                    e.target.style.left = (dim.clientX-lm) + 'px';
                    e.target.style.top = (dim.clientY-tm) + 'px';
                }
                if ((k - (dim.clientX-lm)) < 30)
                {
                    var rr = w + parseFloat(map.style.left) - k;
                    var rdis = Math.abs(k - (dim.clientX-lm));
                    if ((-rr + rdis) <= 0)
                    {
                        var rl = parseFloat(map.style.left);
                        map.style.left = (rl - rdis) + 'px';
                        this.cnt = 1;
                        map.dispatchEvent(scale);

                    }
                }
                if ((l - (dim.clientY-tm)) < 30)
                {

                    var bb = h + parseFloat(map.style.top) - l;
                    var bdis = Math.abs(l - (dim.clientY-tm));
                    if ((-bb + bdis) <= 0) {
                        var bt = parseFloat(map.style.top);
                        map.style.top = (bt - bdis) + 'px';
                        this.cnt = 1;
                        map.dispatchEvent(scale);

                    }
                }
                if ((dim.clientX-lm) < 30)
                {
                    var ll = parseFloat(map.style.left);
                    var ldis = 30 - (dim.clientX-lm);
                    if ((ll + ldis) <= 0) {
                        map.style.left = (ll + ldis) + 'px';
                        this.cnt = 1;
                        map.dispatchEvent(scale);

                    }
                }
                if ((dim.clientY-tm) < 30)
                {
                    var tl = parseFloat(map.style.top);
                    var tdis = 30 - (dim.clientY-tm);
                    if ((tl + tdis) <= 0)
                    {
                        map.style.top = (tl + tdis) + 'px';
                        this.cnt = 1;
                        map.dispatchEvent(scale);
                    }
                }
                var xmark = Math.abs(cl) + (dim.clientX-lm);
                var ymark = Math.abs(ct) + (dim.clientY-tm);
                var inwidth = parseFloat(getComputedStyle(map).getPropertyValue('width'));
                var inheight = parseFloat(getComputedStyle(map).getPropertyValue('height'));
                // this.pointers[e.target.id] = [xmark, ymark, inwidth, inheight, this.pointers[e.target.id][4]];
                this.x=xmark;
                this.y=ymark;
                this.width=inwidth;
                this.height=inheight;
            }
        }.bind(this));
        document.getElementById(a).addEventListener('touchend', function (e)
        {
            if (this.move)
            {
                this.move = 0;
                e.target.style.background = "transparent";
                var ev=new CustomEvent('modifyPin',{'detail':{'x':this.x,'y':this.y,'w':this.width,'h':this.height,'index':this.index}});
                map.dispatchEvent(ev);
            }
        }.bind(this));
    }
    appendMarker(marker)
    {
        var map=document.getElementById(MARKER_mapId);
        document.getElementById('map-holder').appendChild(marker);
        marker.style.left=(this.x+parseFloat(map.style.left))+'px';
        marker.style.top=(this.y+parseFloat(map.style.top))+'px';
    }
}
function isDesktop(){return MARKER_viewportWidth >= 992;}
function appendMapHolder(url)
{
    var mapholder=document.createElement("div");
    mapholder.id="map-holder";
    document.body.appendChild(mapholder);
    var map=document.createElement("img");
    map.src=url;
    map.alt="Map";
    map.id='inspectionMapImage';
    map.style.position='absolute';
    map.style.left='0px';
    map.style.top='0px';
    map.style.width="100%";
    mapholder.appendChild(map);
}
a=new Marker('assets/images/map.jpg');
function st(){a.setPin(['hi','hello','hey']);}
function mng(){a.managePin(0,true);}
function mngal(){a.manageAllPins(false);}
function dest(){a.destroy();}
