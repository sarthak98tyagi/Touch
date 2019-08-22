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
    self=this;
    pinchstart(e)
    {
        e.preventDefault();
        if(e.targetTouches.length===2)
        {
            console.log('!!');
            self.dis1=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
            self.x=(e.targetTouches[0].clientX+e.targetTouches[1].clientX)/2;
            self.xcor=Math.abs(parseFloat(self.map.style.left))+self.x;
            self.y=(e.targetTouches[0].clientY+e.targetTouches[0].clientY)/2;
            self.ycor=Math.abs(parseFloat(self.map.style.top))+self.y;
        }
    }
    pinchmove(e)
    {
        e.preventDefault();
        var width,height,f,nw,nh,tl,tt,nxcor,nycor,dis2;
        if(e.targetTouches.length===2)
        {   self.cnt=1;
            dis2=Math.hypot((e.targetTouches[1].clientX-e.targetTouches[0].clientX),(e.targetTouches[1].clientY-e.targetTouches[0].clientY));
            if((dis2-self.dis1)>0)                /*zoom-in*/
            {
                console.log('!!');
                width=parseFloat(getComputedStyle(self.map).getPropertyValue("width"));
                height=parseFloat(getComputedStyle(self.map).getPropertyValue("height"));
                nw=width+dis2*2;
                f=nw/width;
                nh=height*f;
                nxcor=(self.xcor/width)*nw;
                nycor=(self.ycor/height)*nh;
                tl=nxcor-self.x;
                tt=nycor-self.y;
                if((-tl)<0 && (-tt)<0)
                {
                    console.log('!!');
                    self.map.style.width=nw+'px';
                    self.map.style.left=-tl+'px';
                    self.map.style.top=-tt+'px';
                    // scaleshift(f);
                }
            }
            else                          /*zoom-out*/
            {
                width=parseFloat(getComputedStyle(self.map).getPropertyValue("width"));
                height=parseFloat(getComputedStyle(self.map).getPropertyValue("height"));
                nw=width-dis2*2;
                f=nw/width;
                nh=height*f;
                nxcor=(self.xcor/width)*nw;
                nycor=(self.ycor/height)*nh;
                tl=nxcor-self.x;
                tt=nycor-self.y;
                if((-tl)<0 && (-tt)<0)
                {
                    self.map.style.width=nw+'px';
                    self.map.style.left=-tl+'px';
                    self.map.style.top=-tt+'px';
                    // scaleshift(f);
                }
            }
        }
        self.dis1 = dis2;
    }
    start()
    {
        this.dis1=0;
        this.x=0;
        this.y=0;
        this.xcor=0;
        this.ycor=0;
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
        this.map.addEventListener('touchstart',this.pinchstart);
        this.map.addEventListener('touchmove',this.pinchmove);
    }

}
var map=document.getElementById('map-holder');
options={classList:[]};
M=new Marker("assets/images/map.jpg",map,{},{classList:['mapclass']});