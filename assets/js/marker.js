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
    setPin(msg) {
        friend(this.url);
        var info = [], mp = 0;
        if (Array.isArray(msg))
            info = msg;
        else if (typeof (msg) == "string" || typeof (msg) == "number")
            info.push(msg);
        else if (typeof (msg) == "object") {
            Object.entries(msg).forEach(function (value, index) {
                info.push(value);
            })
        }
        var map = document.getElementById('map');
        map.addEventListener('click', function (e) {
            if (info.length > 0) {
                e.preventDefault();
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

                mark.addEventListener('click', function (e) {

                    var popup = document.createElement("div");
                    popup.innerText = this.pointers[e.target.id][4];
                    popup.id = e.target.id;
                    var p = document.createElement("p");
                    var btn = document.createElement("button");
                    btn.className = "btn btn-danger";
                    btn.innerText = "Remove";
                    btn.addEventListener("click", function (e) {
                        this.removePin(e);
                    }.bind(this));
                    var k = document.createElement("i");
                    k.className = "fas fa-times close";
                    popup.className = "popup";
                    k.addEventListener('click', cancel);
                    document.getElementById('map-holder').appendChild(popup);
                    popup.appendChild(btn);
                    popup.appendChild(k);
                }.bind(this));
                var tm;
                mark.addEventListener('touchstart', function (e) {
                    tm = new Date().getTime();
                    console.log(tm);

                }.bind(this));
                var move = 0;
                mark.addEventListener('touchend', function () {

                    var difference = new Date().getTime() - tm;
                    console.log(difference);
                    if (difference > 250) {
                        move = 1;
                        pham.set({enable: false});
                        ham.set({enable: false});
                        e.target.style.background = "yellow";
                        e.target.addEventListener('touchmove', function (e)     /*drag*/ {
                            e.preventDefault();
                            if (e.targetTouches.length === 1 && move) {

                                dim = e.targetTouches[0];
                                var w = parseFloat(getComputedStyle(map).getPropertyValue('width'));
                                var k = document.documentElement.clientWidth;
                                var h = parseFloat(getComputedStyle(map).getPropertyValue('height'));
                                l = document.documentElement.clientHeight;
                                var cl = parseFloat(map.style.left);
                                var ct = parseFloat(map.style.top);
                                if ((40 < dim.clientX && (k - dim.clientX) > 40) && ((40 < dim.clientY && (l - dim.clientY) > 40))) {

                                    e.target.style.left = (dim.clientX) + 'px';
                                    e.target.style.top = (dim.clientY) + 'px';
                                }

                                if ((k - dim.clientX) < 30) {
                                    var rr = w + parseFloat(map.style.left) - k;
                                    var rdis = Math.abs(k - dim.clientX);
                                    if ((-rr + rdis) <= 0) {
                                        var rl = parseFloat(map.style.left);
                                        map.style.left = (rl - rdis) + 'px';
                                        cnt = 1;
                                        scaleshift();
                                    }
                                }
                                if ((l - dim.clientY) < 30) {

                                    var bb = h + parseFloat(map.style.top) - l;
                                    var bdis = Math.abs(l - dim.clientY);
                                    if ((-bb + bdis) <= 0) {
                                        var bt = parseFloat(map.style.top);
                                        map.style.top = (bt - bdis) + 'px';
                                        cnt = 1;
                                        scaleshift();
                                    }
                                }
                                if (dim.clientX < 30) {
                                    var ll = parseFloat(map.style.left);
                                    var ldis = 30 - dim.clientX;
                                    if ((ll + ldis) <= 0) {
                                        map.style.left = (ll + ldis) + 'px';
                                        cnt = 1;
                                        scaleshift();
                                    }
                                }
                                if (dim.clientY < 30) {
                                    var tl = parseFloat(map.style.top);
                                    var tdis = 30 - dim.clientY;
                                    if ((tl + tdis) <= 0) {
                                        map.style.top = (tl + tdis) + 'px';
                                        cnt = 1;
                                        scaleshift();
                                    }
                                }
                                xmark = Math.abs(cl) + dim.clientX;
                                ymark = Math.abs(ct) + dim.clientY;
                                inwidth = parseFloat(getComputedStyle(map).getPropertyValue('width'));
                                inheight = parseFloat(getComputedStyle(map).getPropertyValue('height'));
                                this.pointers[e.target.id] = [xmark, ymark, inwidth, inheight, message[e.target.id]];
                            }
                        }.bind(this));
                        e.target.addEventListener('touchend', function (e) {
                            if (move) {
                                move = 0;
                                e.target.style.background = "transparent";
                            }

                        });
                    }
                }.bind(this));
                mp = mp + 1;
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

