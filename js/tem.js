function runProgress(settings) {
  var defaultSetting1 = {
    url: '',   //小图地址
    obj1: '',                  //场景添加的canvas id 名
    percent1: 1,               //进度条的百分比  0-1
    progressBgColor: "#f2f2f2",//圆环底色
    progressColorStart: '#ffdd00',  //内部圆环 渐变色
    progressColorEnd: '#fc7d37',
    titleIndex: ''
  };
  var option1 = $.extend({}, defaultSetting1, settings);
  var fillText1 = document.getElementsByClassName('progress-title');
  var obj1 = option1.obj1;
  var percent1 = option1.percent;
  var progressColorStart = option1.progressColorStart;
  var progressColorEnd = option1.progressColorEnd;
  var titleIndex1 = option1.titleIndex;
  var fillTextTitle1 = fillText1[titleIndex1].attributes[1].value;
  var canvasP = document.getElementById(obj1);
  var conPro = canvasP.getContext('2d');
  var windowW1 = parseInt($(canvasP).parent().width());
  var windowH1 = parseInt($(canvasP).parent().height());
  var startW1 = 0, perW = (windowW1 * 0.92) / 100;
  var timer1;
  console.log(windowH1);
  if (windowH1 % 4 === 1) {
    windowH1 += 3;
  } else if (windowH1 % 4 === 2) {
    windowH1 += 2;
  } else if (windowH1 % 4 === 3) {
    windowH1 += 1;
  }
  canvasP.width = windowW1 * 0.92;
  canvasP.height = windowH1 / 2;

  //小屏幕进度条
  function drawProgress() {
    if (startW1 < percent1) {
      startW1 += 0.01;
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
    var grd = conPro.createLinearGradient(0, 0, startW1 * perW * 100, canvasP.height);
    grd.addColorStop(0, progressColorStart);
    grd.addColorStop(1, progressColorEnd);
    conPro.fillStyle = grd;
    conPro.fillRect(0, 0, startW1 * perW * 100 + 10, canvasP.height);
    conPro.closePath();
    //进度文字
    conPro.beginPath();
    conPro.fillStyle = "#fff";
    var num = parseInt(startW1 * 100);
    if (num > percent1 * 100) {
      num = percent1 * 100;
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
    conPro.fillText1(num + "%", startW1 * perW * 100, canvasP.height / 2 + 1);
    // conPro.textAlign = 'center';
    conPro.closePath();
    //标题
    conPro.beginPath();
    conPro.fillStyle = "#fff";
    conPro.textAlign = 'left';
    conPro.font = 'bold 12px normal';
    conPro.fillText1(fillTextTitle1, 10, canvasP.height / 2 + 1);
    conPro.closePath();

    $(canvasP).parent().find('.progress-title').css(
      {
        display: 'flex',
        width: windowW1 * 0.08,
        height: canvasP.height,
        borderWidth: "2px",
        borderRight: "0",
        borderStyle: "solid",
        borderColor: progressColorStart,
      }
    )
    $(canvasP).parent().find('.progress-title img').css(
      {
        padding: windowW1 * 0.08 * 0.1
      }
    )
  }

  drawProgress();
  timer1 = setInterval(drawProgress, 20)
}// * * Made by 兔吒 ** //