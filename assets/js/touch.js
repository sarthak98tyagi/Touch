var map=document.getElementById("map");
var ham= new Hammer(map);
ham.get('pinch').set({enable:true});
ham.on('pinchin',function(){
   alert("In");
});
ham.on('pinchout',function(){
    alert("Out");
});