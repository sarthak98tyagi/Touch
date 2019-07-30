var map=document.getElementById("map");
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.on('pinch',function(){
   alert("working");
});
