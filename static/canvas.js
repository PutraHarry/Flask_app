
function changeStateConvertButton() {
    var convertButton = document.getElementById("convertButton");
        if (convertButton.text=="ke Aksara Hanacaraka") {
            convertButton.text = "ke Aksara Latin"
            convertButton.className= "btn btn btn-outline-danger"
        }
        else {
            convertButton.className="btn btn btn-outline-primary"
            convertButton.text = "ke Aksara Hanacaraka"
        }
    }

window.addEventListener('load', ()=>{
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);

});



document.addEventListener("DOMContentLoaded", startup);
const canvas = document.getElementById('canvas');
var heightRatio = 0.3;
canvas.height = canvas.width * heightRatio;

const ctx = canvas.getContext('2d');
let coord = {x:0 , y:0};
let paint = false;

            // canvas.addEventListener("touchmove", function (e) {
            // var touch = e.touches[0];
            // var mouseEvent = new MouseEvent("mousemove", {
            //     clientX: touch.clientX,
            //     clientY: touch.clientY
            // });
            // canvas.dispatchEvent(mouseEvent);
            // }, false);

function startup() {
    var el = document.getElementById('canvas');
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
}

var ongoingTouches = [];
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getPosition(event){
    var mouseX = event.offsetX * canvas.width / canvas.clientWidth | 0;
    var mouseY = event.offsetY * canvas.height / canvas.clientHeight | 0;
    coord.x = mouseX;
    coord.y = mouseY;
}

            function handleStart(evt) {
                evt.preventDefault();
                console.log("touchstart.");
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    console.log("touchstart:" + i + "...");
                    ongoingTouches.push(copyTouch(touches[i]));
                    var color = colorForTouch(touches[i]);
                    ctx.beginPath();
                    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
                    ctx.fillStyle = color;
                    ctx.fill();
                    console.log("touchstart:" + i + ".");
                }
            }

            function handleMove(evt) {
                evt.preventDefault();
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    var color = colorForTouch(touches[i]);
                    var idx = ongoingTouchIndexById(touches[i].identifier);

                    if (idx >= 0) {
                    console.log("continuing touch "+idx);
                    ctx.beginPath();
                    console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
                    ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
                    console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
                    ctx.lineTo(touches[i].pageX, touches[i].pageY);
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = color;
                    ctx.stroke();

                    ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
                    console.log(".");
                    } else {
                    console.log("can't figure out which touch to continue");
                    }
                }
            }

            function handleEnd(evt) {
                evt.preventDefault();
                log("touchend");
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    var color = colorForTouch(touches[i]);
                    var idx = ongoingTouchIndexById(touches[i].identifier);

                    if (idx >= 0) {
                    ctx.lineWidth = 4;
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
                    ctx.lineTo(touches[i].pageX, touches[i].pageY);
                    ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
                    ongoingTouches.splice(idx, 1);  // remove it; we're done
                    } else {
                    console.log("can't figure out which touch to end");
                    }
                }
            }

            function handleCancel(evt) {
                evt.preventDefault();
                console.log("touchcancel.");
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    var idx = ongoingTouchIndexById(touches[i].identifier);
                    ongoingTouches.splice(idx, 1);  // remove it; we're done
                }
            }

            function startPainting(event){
                paint = true;
                getPosition(event);
            }
            function stopPainting(){
                paint = false;
            }

            function sketch(event){
                if (!paint) return;
                event.preventDefault();
                event.stopPropagation();
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.strokeStyle = 'white';
                ctx.moveTo(coord.x, coord.y);
                getPosition(event);
                ctx.lineTo(coord.x , coord.y);
                ctx.stroke();
            }

            // var link = document.getElementById('convertSubmit');
            // link.addEventListener('click', function(ev) {
            //     link.href = canvas.toDataURL();
            //     link.download = "testcanvas.png";
            // }, false);

  function savePNG() {
    console.log('helloooooooooo');
    var imgURL = canvas.toDataURL();
    console.log(imgURL)
    var image = new Image(); //buat image baru
    image.src = imgURL; //buat image dari base64 dari canvas ke image

    var fd = new FormData(); //buat form data baru
    fd.append('file', image); // append image ke form nya

    $.ajax({
        type: "POST",
        url: "/upload",
        data: fd,
        processData: false,
        contentType: false
      }).done(function() {
        console.log('sent');
      });
}

// var link = document.getElementById('convertSubmit');
// link.addEventListener('click', function (ev) {
//     console.log('helloooooooooo');
//     var imgURL = canas.toDataURL();
//     $.ajax({
//         type: "POST",
//         url: "http://127.0.0.1:5000/upload",
//         data:{
//           imageBase64: imgURL
//         }
//       }).done(function() {
//         console.log('sent');
//       });
// }, false);
