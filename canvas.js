/**
 * canvas是html5提供的一个组件，一个画布，可以绘制各种图形，包括2d、3d，直接与WebGL(web操作显卡的接口)交互
 * 在此之前绘图需要和flash交互
 * 
 * 以下代码可以直接在chrome.console上运行
 */
//############ 绘制笑脸 #############
//html
<canvas id={'test_canvas'} height={200} width={200} ></canvas>
//js
let canvas = document.getElementById('test_canvas')
let ctx = canvas.getContext('2d')
ctx.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
ctx.fillStyle = '#dddddd'; // 设置颜色
ctx.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
// 利用Path绘制复杂路径:
var path = new Path2D();
path.arc(75, 75, 50, 0, Math.PI * 2, true);
path.moveTo(110, 75);
path.arc(75, 75, 35, 0, Math.PI, false);
path.moveTo(65, 65);
path.arc(60, 65, 5, 0, Math.PI * 2, true);
path.moveTo(95, 65);
path.arc(90, 65, 5, 0, Math.PI * 2, true);
ctx.strokeStyle = '#0000ff';
ctx.stroke(path);

//############ 绘制文本 #############
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shadowColor = '#666666';
ctx.font = '24px Arial';
ctx.fillStyle = '#333333';
ctx.fillText('带阴影的文字', 20, 40);
