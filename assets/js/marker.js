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
function cancel(e)
{
    document.getElementById('map-holder').removeChild(e.target.parentElement);
}
// function remove(e,pointers={})
// {
//
//     console.log(a);
//     var id=Number(e.target.parentElement.id);
//     delete(this.pointers[id]);
//     del=document.getElementById(id);
//     document.getElementById('map-holder').removeChild(del);
//     document.getElementById('map-holder').removeChild(document.getElementById(id));
// }
class Marker
{
    constructor(url,pointers={})
    {
        if (url === '')
            return;
        this.url = url;
        this.pointers=pointers;
    }
    getPin(n)
    {
        if(this.pointers[n])
        return this.pointers[n];
        return NULL;
    }
    getJSON()
    {
        return(this.pointers);
    }
    setPin(msg)
    {
        friend(this.url);
        var info=[],mp=0;
        if(Array.isArray(msg))
            info=msg;
        else if(typeof(msg)=="string" || typeof(msg)=="number")
            info.push(msg);
        else if(typeof(msg)=="object")
        {
            Object.entries(msg).forEach(function(value,index)
            {
                info.push(value);
            })
        }
        var map=document.getElementById('map');
        map.addEventListener('click',function(e)
        {
            if(info.length>0)
            {
                e.preventDefault();
                var xmark=Math.abs(parseFloat(map.style.left))+e.clientX;
                var ymark=Math.abs(parseFloat(map.style.top))+e.clientY;
                var mark=document.createElement("div");
                mark.id=mp;
                mark.className='mark';
                this.pointers[mp]=[xmark,ymark,parseFloat(getComputedStyle(map).getPropertyValue('width')),
                             parseFloat(getComputedStyle(map).getPropertyValue('height')),info.pop(0)];
                mark.style.left=e.clientX+'px';
                mark.style.top=e.clientY+'px';
                document.getElementById('map-holder').appendChild(mark);

                mark.addEventListener('click',function(e)
                {

                        var popup=document.createElement("div");
                        popup.innerText=this.pointers[e.target.id][4];
                        popup.id=e.target.id;
                        var p = document.createElement("p");
                        var btn = document.createElement("button");
                        btn.className = "btn btn-danger";
                        btn.innerText = "Remove";
                        btn.addEventListener("click", function (e) {
                            this.removePin(e);
                        }.bind(this));
                        var k=document.createElement("i");
                        k.className="fas fa-times close";
                        popup.className="popup";
                        k.addEventListener('click',cancel);
                        document.getElementById('map-holder').appendChild(popup);
                        popup.appendChild(btn);
                        popup.appendChild(k);
                }.bind(this));
                var tm;
                mark.addEventListener('touchstart',function(e)
                {
                      tm=new Date().getMilliseconds();
                      console.log(tm);

                }.bind(this));
                mark.addEventListener('touchend',function()
                {
                    console.log(new Date().getMilliseconds());
                    var difference = (new Date().getMilliseconds())-tm;
                    console.log(difference);
                   if(difference > 500)
                   {
                       console.log('!!', difference );
                   }
                });
                mp++;
            }
        }.bind(this));
    }
    removePin(e)
    {
        var id=Number(e.target.parentElement.id);
        delete(this.pointers[id]);
        document.getElementById('map-holder').removeChild(document.getElementById(id));
        document.getElementById('map-holder').removeChild(document.getElementById(id));
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
a=new Marker('assets/images/map.jpg',{0:[300,400,360,512,"Hello"]});
a.setPin(['hello','hi']);

