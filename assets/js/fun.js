class Marker
{
    constructor(url,mapref,mark,options={'editable':false,'multiple':false,classList:[]})
    {

        this.editable=options['editable'];
        this.multiple=options['multiple'];
        this.classList=options['classList'];
        this.url=url;
        this.mapref=mapref;
        this.start();
    }
    pinchstart(e)
    {
        e.preventDefault();
        if(e.targetTouches.length===1)
        {
            this.x=e.targetTouches[0].clientX;
            this.y=e.targetTouches[1].clientY;
        }
        else if(e.targetTouches.length===2)
        {

            this.dis1=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
            this.x=(e.targetTouches[0].clientX+e.targetTouches[1].clientX)/2;
            this.xcor=Math.abs(parseFloat(this.map.style.left))+this.x;

            this.y=(e.targetTouches[0].clientY+e.targetTouches[0].clientY)/2;
            this.ycor=Math.abs(parseFloat(this.map.style.top))+this.y;
        }
    }
    pinchmove(e)
    {
        e.preventDefault();
        var width,height,f,nw,nh,tl,tt,nxcor,nycor,dis2;
        if(e.targetTouches.length===2)
        {   this.cnt=1;
            dis2=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
            if((dis2-this.dis1)>0)                /*zoom-in*/
            {

                width=parseFloat(getComputedStyle(this.map).getPropertyValue("width"));
                height=parseFloat(getComputedStyle(this.map).getPropertyValue("height"));
                nw=width+dis2*2;
                f=nw/width;
                nh=height*f;
                nxcor=(this.xcor/width)*nw;
                nycor=(this.ycor/height)*nh;
                tl=nxcor-this.x;
                tt=nycor-this.y;
                if((-tl)<0 && (-tt)<0)
                {

                    this.map.style.width=nw+'px';
                    this.map.style.left=-tl+'px';
                    this.map.style.top=-tt+'px';
                    // scaleshift(f);
                }
            }
            else                          /*zoom-out*/
            {
                width=parseFloat(getComputedStyle(this.map).getPropertyValue("width"));
                height=parseFloat(getComputedStyle(this.map).getPropertyValue("height"));
                nw=width-dis2*2;
                f=nw/width;
                nh=height*f;
                nxcor=(this.xcor/width)*nw;
                nycor=(this.ycor/height)*nh;
                tl=nxcor-this.x;
                tt=nycor-this.y;
                if((-tl)<0 && (-tt)<0)
                {
                    this.map.style.width=nw+'px';
                    this.map.style.left=-tl+'px';
                    this.map.style.top=-tt+'px';
                    // scaleshift(f);
                }
            }
        }
        this.dis1 = dis2;
    }
    pinchend(e)
    {
        e.preventDefault();
        var ch,dis,ml;
        if(e.targetTouches.length===1)
        {
            ch=(Math.abs(e.targetTouches[0].clientX-this.x)>Math.abs(e.targetTouches[1].clientY-this.y))?1:0;
            if(ch===1)
            {
                this.cnt=1;
                ml=parseFloat(this.map.style.left);
                if((ml+(e.targetTouches[0].clientX-this.x))<0)
                {
                    this.map.style.left=(ml+e.distance)+'px';
                    scaleshift();
                }
                else
                {
                    this.map.style.left=0+'px';
                    scaleshift();
                }
            }

        }
    }
    start()
    {
        this.dis1=0;
        this.cnt=0;
        this.map=document.createElement('img');
        this.map.src=this.url;
        this.map.alt="Map";
        this.map.style.left='0px';
        this.map.style.top='0px';
        this.mapref.appendChild(this.map);
        this.classList.forEach(function (value,index)
        {
            this.map.classList.add(value);
        },this);
        this.map.addEventListener('touchstart',this.pinchstart.bind(this));
        this.map.addEventListener('touchmove',this.pinchmove.bind(this));
        this.map.addEventListener('touchend',this.pinchend.bind(this));
    }

}
var map=document.getElementById('map-holder');
options={classList:[]};
M=new Marker("assets/images/map.jpg",map,{},{classList:['mapclass']});