var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
// c.fillRect(100, 100, 100, 100);

// c.beginPath();
// c.moveTo(50,400);
// c.lineTo(300,300);
// c.strokeStyle="blue";
// c.stroke();

// for(var i=0;i<150;i++){
//     var x=Math.random()*window.innerWidth;
//     var y=Math.random()*window.innerHeight;
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI*2,false);
//     c.strokeStyle="red";
//     c.stroke();
// }

// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();

// var x = Math.random() * innerWidth;
// var dx = (Math.random() - 0.5) * 8;
// var y = Math.random() * innerHeight;
// var dy = (Math.random() - 0.5) * 8;
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 50, minRadius = 5;

var colorArr = [
    '#e63946',
    '#f1faee',
    '#a8dadc',
    '#457b9d',
    '#1d3557'
]

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArr[Math.floor(Math.random() * colorArr.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + 30 > innerWidth || this.x - 30 < 0) this.dx = -this.dx;
        if (this.y + 30 > innerHeight || this.y - 30 < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        if (mouse.x - this.x < 70 && mouse.x - this.x > -70 && mouse.y - this.y < 70 && mouse.y - this.y > -70) {
            if (this.radius <= maxRadius)
                this.radius += 1;
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArr = [];
function init() {
    circleArr = [];
    for (var i = 0; i < 800; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 5;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 5;
        var radius = Math.random() * 3 + 1;
        circleArr.push(new Circle(x, y, dx, dy, radius));
    }
}
init();
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArr.length; i++)circleArr[i].update();
}
animate();