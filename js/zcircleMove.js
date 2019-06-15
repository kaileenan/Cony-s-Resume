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
  var R, R1,iconW = 35,iconH = 35,iconY = 50,tfontSize = 18, pfontSize = 24;
  if (screenW < 1000) {
    lineW1 = 6;
    lineW0 = 2;
    iconW = 20;
    iconH = 20;
    iconY = 40;
    tfontSize = 12;
    pfontSize = 18;
  } else if (screenW > 1000 && screenW < 1440) {
    lineW1 = 8;
    lineW0 = 3;
    iconW = 25;
    iconH = 25;
    iconY = 45;
    tfontSize = 14;
    pfontSize = 21;
  } else if (screenW > 1440) {
    lineW1 = 11;
    lineW0 = 4;
  }
  var canvasW = windowW;
  R = parseInt(canvasW / 2 - 2 * lineW1 - 2 * lineW0 - 10);
  R1 = parseInt(canvasW / 2 - lineW1 - lineW0 - 10);
  var ra = parseInt(canvasW / 2 - lineW0 / 2 - 5);
  var canvasH = canvasW * 1.2;
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
    context.font = 'bold ' + tfontSize + 'px normal';
    context.closePath();
    //文字 标题
    context.beginPath();
    context.fillStyle = innerColorEnd;
    context.fillText(fillTextTitle, canvasW / 2, canvasH / 1.08);
    context.textAlign = 'center';
    context.font = pfontSize + 'px normal';
    context.closePath();

    //中间图标
    context.beginPath();
    var skillIcon = new Image();
    skillIcon.src = imageUrl;
    context.drawImage(skillIcon, canvasW / 2 - (iconW / 2), canvasH / 2 - iconY, iconW, iconH);
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

function runProgress(settings) {
  //小屏
  var defaultSetting = {
    url: '',   //小图地址
    obj: '',                  //场景添加的canvas id 名
    percent: 1,               //进度条的百分比  0-1
    progressBgColor: "#f2f2f2",//圆环底色
    progressColorStart: '#ffdd00',  //内部圆环 渐变色
    progressColorEnd: '#fc7d37',
    titleIndex: ''
  };
  var option = $.extend({}, defaultSetting, settings);
  var fillText = document.getElementsByClassName('progress-title');
  var obj = option.obj;
  var percent = option.percent;
  var progressColorStart = option.progressColorStart;
  var progressColorEnd = option.progressColorEnd;
  var titleIndex = option.titleIndex;
  var fillTextTitle = fillText[titleIndex].attributes['innerText'].value;
  var canvasP = document.getElementById(obj);
  var conPro = canvasP.getContext('2d');
  var windowW = parseInt($(canvasP).parent().width());
  var windowH = parseInt($(canvasP).parent().height());
  var startW = 0, perW = (windowW * 0.92) / 100;
  var timer1;
/*  if (windowH % 4 === 1) {
    windowH += 3;
  } else if (windowH % 4 === 2) {
    windowH += 2;
  } else if (windowH % 4 === 3) {
    windowH += 1;
  }*/
  canvasP.width = windowW * 0.92;
  canvasP.height = windowH / 1.2;

  //小屏幕进度条
  function drawProgress() {
    if (startW < percent) {
      startW += 0.01;
    } else {
      return false;
    }
    //底色
    conPro.beginPath();
    conPro.fillStyle = "#fefefe";
    conPro.fillRect(0, 0, canvasP.width, canvasP.height);
    conPro.save();
    conPro.closePath();
    //进度条
    conPro.beginPath();
    var grd = conPro.createLinearGradient(0, 0, startW * perW * 100, canvasP.height);
    grd.addColorStop(0, progressColorStart);
    grd.addColorStop(1, progressColorEnd);
    conPro.fillStyle = grd;
    conPro.fillRect(0, 0, startW * perW * 100 + 10, canvasP.height);
    conPro.closePath();
    //进度文字
    conPro.beginPath();
    conPro.fillStyle = "#fff";
    var num = parseInt(startW * 100);
    if (num > percent * 100) {
      num = percent * 100;
      clearInterval(timer1);
    }
    // context.clearRect(canvasW / 2.7, canvasH / 2, 100, 40);
    conPro.shadowColor = 'rgba(0, 0, 0, 0.2)';
    // 将阴影向右移动1px，向上移动1px
    conPro.shadowOffsetX = 1;
    conPro.shadowOffsetY = 1;
    // 轻微模糊阴影
    conPro.shadowBlur = 10;
    conPro.font = "bold 16px normal";
    conPro.textBaseline = 'middle';
    conPro.Style = progressColorEnd;
    conPro.textAlign = 'right';
    conPro.fillText(num + "%", startW * perW * 100, canvasP.height / 2 + 1);
    // conPro.textAlign = 'center';
    conPro.closePath();
    //标题
    conPro.beginPath();
    conPro.fillStyle = "#fff";
    conPro.textAlign = 'left';
    conPro.font = 'bold 12px normal';
    conPro.fillText(fillTextTitle, 10, canvasP.height / 2 + 1);
    conPro.closePath();

    $(canvasP).parent().find('.progress-title').css(
      {
        display: 'flex',
        width: windowW * 0.07,
        height: canvasP.height,
        borderWidth: "2px",
        borderRight: "0",
        borderStyle: "solid",
        borderColor: progressColorStart
      }
    );
    $(canvasP).parent().find('.progress-title img').css(
      {
        padding: windowW * 0.08 * 0.1
      }
    )
  }

  drawProgress();
  timer1 = setInterval(drawProgress, 20)
}
