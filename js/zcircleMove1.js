// JavaScript Document
// create by cony 2019/06/06

function runCircle(settings) {
  //大屏
  var defaultSetting = {
    url: 'images/fire.png',   //飞机小图地址
    obj: '',                  //场景添加的canvas id 名
    percent: 1,               //圆环转动的百分比  0-1
    circleBottomColor: "#f2f2f2",//圆环底色
    innerColorStart: '#ffdd00',  //内部圆环 渐变色
    innerColorEnd: '#fc7d37',
    titleIndex: ''
  };
  var option = $.extend({}, defaultSetting, settings);
  var fillText = document.getElementsByClassName('anyield');
  var screenW = document.documentElement.offsetWidth;
  var screenH = document.documentElement.offsetHeight;
  var imageUrl = option.url;
  var obj = option.obj;
  var percent = option.percent;
  var innerColorStart = option.innerColorStart;
  var innerColorEnd = option.innerColorEnd;
  var circleBottomColor = option.circleBottomColor;
  var titleIndex = option.titleIndex;
  var fillTextTitle = fillText[titleIndex].attributes['innerText'].value;
  var preA = Math.PI / 180;
  var canvasC = document.getElementById(obj);

  /*大屏控制运动*/
  var context = canvasC.getContext('2d');
  var windowW = parseInt($(canvasC).parent().width());
  var lineW1, lineW0;
  var R, R1;
  if (screenW < 1000) {
    lineW1 = 6;
    lineW0 = 2;
  } else if (screenW > 1000 && screenW < 1440) {
    lineW1 = 11;
    lineW0 = 3;
  } else if (screenW > 1440) {
    lineW1 = 15;
    lineW0 = 5;
  }
  var canvasW = windowW;
  // console.log(windowW);
  R = parseInt(canvasW / 2 - 2 * lineW1 - 2 * lineW0 - 10);
  R1 = parseInt(canvasW / 2 - lineW1 - lineW0 - 10);
  var ra = parseInt(canvasW / 2 - lineW0 / 2 - 5);
  var canvasH = canvasW * 1.3;
  var rotateAngle = percent * 360;
  var rotataRadians = preA * rotateAngle;
  canvasC.width = canvasW;
  canvasC.height = canvasH;
  var x = canvasC.width / 2;
  var y = canvasC.height / 2;
  var startAa = -Math.PI / 2;
  var startA = 0;
  var Timer;
  var imageAir = new Image();
  imageAir.src = imageUrl;
  var loading = 0;
  canvasC.setAttribute("data-run", "1");

  function drawCircle() {
    if (startA < rotataRadians) {
      startA += 0.1;
    }
    //

    context.fillStyle = "#fefefe";
    context.fillRect(0, 0, canvasC.width, canvasC.height);
    //
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = "#fefefe";
    context.fillRect(0, 0, canvasC.width, canvasC.height);
    context.translate(x, y);
    context.rotate(-Math.PI / 2);






























    //中环
    context.beginPath();
    context.strokeStyle = circleBottomColor;
    context.lineWidth = lineW1;
    context.arc(15, 0, R1, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
    context.beginPath();
    // Linear gradients
    var gradient2 = context.createLinearGradient(R1, 0, -R1, 0);
    gradient2.addColorStop(0, innerColorStart);
    gradient2.addColorStop(1, innerColorEnd);
    context.lineCap = "round";
    context.strokeStyle = gradient2;
    context.lineWidth = lineW1;
    context.arc(15, 0, R1, 0, startA, false);
    context.stroke();
    context.closePath();

    //内环
    context.beginPath();
    context.strokeStyle = circleBottomColor;
    context.lineWidth = lineW0;
    context.arc(15, 0, R, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
    context.restore();

    //文字  进度
    context.beginPath();
    context.fillStyle = innerColorEnd;
    loading += (10 / (Math.PI * 2));
    var num = parseInt(loading);
    if (num > percent * 100) {
      num = percent * 100;
    }
    context.fillText(num + "%", canvasW / 1.9 - 2, canvasH / 1.7 - 2);
    context.textAlign = 'center';
    context.font = 'bold 18px normal';
    context.closePath();
    //文字 标题
    context.beginPath();
    context.fillStyle = innerColorEnd;
    context.fillText(fillTextTitle, canvasW / 2, canvasH / 1.08);
    context.textAlign = 'center';
    context.font = '24px normal';
    context.closePath();

    //中间图标
    context.beginPath();
    var skillIcon = new Image();
    skillIcon.src = imageUrl;
    context.drawImage(skillIcon, canvasW / 2 - 17.5, canvasH / 2 - 50, 35, 35);
    context.save();

    //画图
    if (startAa < rotataRadians - Math.PI / 2) {
      startAa += 0.1;
      canvasC.setAttribute("data-run", "1")
    } else {
      clearInterval(Timer);
      canvasC.setAttribute("data-run", "0")
    }
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    var ax = ra * Math.cos(startAa);
    var ay = ra * Math.sin(startAa);
    context.translate(x + ax, y + ay);
    context.rotate(startAa);
    // context.drawImage(imageAir, imgX, imgY, imgWidth, imgHeight);
    context.restore();
  }

  drawCircle();
  Timer = setInterval(drawCircle, 20);


}
