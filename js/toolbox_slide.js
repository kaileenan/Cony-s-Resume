$(function () {
  var imgFirst = $('.tools li img:nth-child(2)'),
    imgLast = $('.tools li img:nth-child(3)'),
    step = 2,
    PositionR = 0,
    ul = $('.tools'),
    toolBoxTimer;

  //响应式布局
  function toolBox_resize() {
    var screenW = $(window).width(),
      li = ul.children('li'),
      imgH = li.find('img').height(),
      liNum = li.length;
    /*if (liNum === 8) {
      li.clone(true).prependTo(ul).addClass('new');
    }*/
    ul.width(screenW * 2);
    if (screenW > 900) {
      li.width(screenW / liNum * 2);
    } else {
      li.width(150);
      ul.width(li.width() * liNum);
    }
  };

  //滚动函数
  function toolBox_slide() {
    clearTimeout(toolBoxTimer);
    PositionR -= step;
    if (PositionR <= -(ul.width() / 2)) {
      PositionR = 0;
    }
    ul.css("right", PositionR);
    toolBoxTimer = setTimeout(toolBox_slide, 20);
  };

  toolBox_resize();
  toolBox_slide();
  //窗口改变重新执行
  var toolResizeTimer;
  $(window).on('resize', function () {
    clearTimeout(toolResizeTimer);
    toolResizeTimer = setTimeout(function () {
      toolBox_resize();
      toolBox_slide();
    },200)
  });
  //hover事件
  //
  ul.hover(function () {
    clearTimeout(toolBoxTimer);
    imgFirst.css('display','none');
    imgLast.css('display','block');
  }, function () {
    imgFirst.css('display','block');
    imgLast.css('display','none');
    toolBox_slide();
  });

  //自动触发resize事件
  // $(window).trigger('resize');
});