canvasEl = document.getElementById('canvas');
var heightRatio = 0.3;
canvas.height = canvas.width * heightRatio;
canvas = canvasEl.getContext('2d');

canvasEl.addEventListener('touchstart', function(e){
  draw(e.changedTouches[0].pageX * canvas.width / canvas.clientWidth | 0, e.changedTouches[0].pageY * canvas.height / canvas.clientHeight | 0);
});

canvasEl.addEventListener('touchmove', function(e){
  e.preventDefault();
  draw(e.changedTouches[0].pageX * canvas.width / canvas.clientWidth | 0 , e.changedTouches[0].pageY * canvas.height / canvas.clientHeight | 0);
});

draw = function(x, y){
  canvas.beginPath();
  canvas.fillStyle = '#ff8330';
  canvas.arc(x, y, 30, 0, 2 * Math.PI);
  canvas.fill();
  canvas.closePath();

  ctx.beginPath();     
  ctx.lineWidth = 2; 
  ctx.lineCap = 'round';        
  ctx.strokeStyle = 'white';      
  ctx.moveTo(x,y); 
  getPosition(event); 
  ctx.lineTo(coord.x , coord.y); 
  ctx.stroke(); 
};