const MARKER_viewportWidth = 1234;
const MARKER_mapId = "inspectionMapImage";
let dragging = false;
class Marker {
    constructor(url, pointer = []){
        this.url = url;
        this.pointers = pointers;
        this.pins = [];
    }
    checkEvent(e)
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
    findEvent(e,msg)
    {
        if(0 && !isDesktop())
        {

            var x=e.clientX;
            var y=e.clientY;
            var w,h;
            this.addPin(msg, {x:x, y:y, w:w, h:h})
        }
        else if(1){
            this.startSwipe();
        }
        else if(2){
            if(!isDesktop()) this.startZoom();
        }
    }
    startZoom() {}

    startSwipe() {}

    setPin(msg) {
        var info=[];
        appendMapHolder(this.url);
        if (Array.isArray(msg))
            info = msg;
        else if(typeof (msg) == "object")
        {
            Object.entries(msg).forEach(function (value, index)
            {
                info.push(value);
            });
        }
        this.map =  document.getElementById(MARKER_mapId);
        this.map.addEventListener("touchstart", this.checkEvent);
        this.map.addEventListener("touchmove", this.findEvent(info));
        if(isDesktop()) this.map.addEventListener("click", function () {
            var x;
            var y;
            var w,h;
            this.addPin(info, {x:x, y:y, w:w, h:h});
        }.bind(this));
    }
    addPin(msg, pinInfo){
        if(msg.length > 0) {
            const marker = document.createElement("div");
            // marker style
            const pin = new Pin(pinInfo.x, pinInfo.y, pinInfo.w, pinInfo.h, msg.pop(0), marker, true);
            pin.init();
            this.pins.push(pin);
        }
    }
    managePin(pin,editable){
        appendMapHolder();
        var pinInfo = this.pins[pin];
        const marker = document.createElement("div");
        // marker style
        const PIN = new Pin(pinInfo.x, pinInfo.y, pinInfo.w, pinInfo.h, pinInfo.message, marker, editable);
    }
    manageAllPins(editable) {
        appendMapHolder();
        this.pins.forEach( function (pinInfo) {
            const marker = document.createElement("div");
            // marker style
            const PIN = new Pin(pinInfo.x, pinInfo.y, pinInfo.w, pinInfo.h, pinInfo.message, marker, editable);
        });

    }
    getJSON() {}
    getPin() {}
    destroy() {}
    zoomDesktop() {
        if(isDesktop()){

        }
    }
}
class Pin
{
    constructor(x,y,w,h,msg,marker,editable)
    {
        this.x=x;
        this.y=y;
        this.width=w;
        this.height=h;
        this.msg=msg;
        this.marker = marker;
        this.editable = editable;
        this.init();
    }
    init()
    {
        this.appendMarker();
        this.marker.addEventListener("click", this.openPopup(1));
        if(this.editable) this.marker.addEventListener("contextmenu", this.openPopup(2));
    }
    openPopup(choice){
        const allPopups = document.querySelectorAll(".popup");
        if(allPopups.length > 0 ) {
            allPopups.forEach( function (popup) {
                popup.remove();
            })
        }
        var el = choice === 1 ? ["p", "i", "button"]: ["p", "i", "button", "button"];
        var elements = this.elements(el);
        this.appendPopup(elements, choice);
        elements[1].addEventListener("click", this.removePopup);
        if(this.editable) elements[2].addEventListener("click", this.deletePopup);
        if(choice === 2) {
            elements[3].addEventListener("click", this.dragPin);
        }
    }
    appendPopup(elements, choice) {
        var popup = document.createElement("div");
        popup.className = "popup";
        var data;
        var deleteButtonClass = this.editable ? "btn btn-danger" : "btn btn-danger delete-display-none";
        if (choice === 2) data = [
            {text: this.msg, classes: ""},
            {text: "Edit", classes: "btn btn-primary edit-pin"},
            {text: "Remove", classes: deleteButtonClass},
            {text: "", classes: "fas fa-times"},
        ];
        if (choice === 1) data = [
            {text: this.msg},
            {text: "", classes: "fas fa-times"},
            {text: "Remove", classes: deleteButtonClass},
        ];
        elements.forEach( function (element, index) {
            element.innerText = data[index].text;
            element.className = data[index].classes;
            popup.appendChild(element);
        });
    }
    removePopup()
    {

    }
    deletePopup(){}
    dragPin(){
        if(isDesktop()){
            const MAP = document.getElementById(MARKER_mapId);

            MAP.addEventListener("click", function (event) {
                dragging = true;
            });
        }
        else{
            this.marker.addEventListener("touchstart", this.startDrag);
            this.marker.addEventListener("touchmove", this.followDrag);
            this.marker.addEventListener("touchend", this.endDrag);
        }
    }

    elements(el){
        var elements = [];
        el.forEach( function (element, index) {
            elements.push(document.createElement(element));
        });
        return elements;
    }

    startDrag(){}
    followDrag(){}
    endDrag(){}

    appendMarker() {
        // append at this.x, this.y
    }

}

function isDesktop() {
    return MARKER_viewportWidth >= 992;
}

function appendMapHolder() {

}