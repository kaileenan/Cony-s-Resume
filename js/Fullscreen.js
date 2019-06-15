// JavaScript Document
$(function () {
  //初始化当前索引
  var key = 0,
    //记录上一屏，这一屏滚动将要消失
    prev = 0;
  scrollAndNav();
  //滑轮滚动事件
  //动态添加导航li
  var $screenNum = $('.wrapBox .box').length;
  for (var i = 0; i < $screenNum; i++) {
    $('.nav-right ul').append('<li></li>');
    $('.nav-right ul li:first-child').addClass('current');
    $('.navigation ul li:first-child').addClass('current');
  }
  ;
  $(document).mousewheel(function (event, delta) {
    //如果没有处于执行动画状态，方可执行
    if (!$('.wrapBox').is(':animated')) {
      //两个参数  delta  返回当前往上滚动（1）   往下滚动（-1）
      /*
      0   -1    1
      1   -1    2
      2   -1    3
      */
      key = key - delta;
      //console.log(key);
      if (key < 0) {
        key = 0;
      } else if (key > ($screenNum - 1)) {
        key = $screenNum - 1;
      }
      scrollAndNav();
    }
    prev = key;
  });
  //bind绑定事件
  $('.nav-right li').bind({
    click: function () {
      //获取当前索引
      key = $(this).index();
      scrollAndNav();
      prev = key;
    }
  });
  $('.navigation li').bind({
    click: function () {
      //获取当前索引
      key = $(this).index();
      scrollAndNav();
      prev = key;
    }
  });
  //移动端滑动
  /*$(".wrapBox").swipe({
    swipe: function (event, direction, distance, duration, fingerCount) {
      if (direction == "up") {
        key += 1;
      } else if (direction == "down") {
        key -= 1;
      }
      if (key > $screenNum - 1) {
        key = $screenNum - 1;
      } else if (key < 0) {
        key = 0;
      }
      scrollAndNav();
      prev = key;
    }
  });*/
  touchScroll();
  function touchScroll() {
    var $touchStartX,$touchStartY,$touchEndX,$touchEndY;
    $('.wrapBox').on('touchstart',function(e) {
      var touch = e.originalEvent.targetTouches[0];
      $touchStartX = touch.pageX;
      $touchStartY = touch.pageY;
    });
    $('.wrapBox').on('touchend',function(e) {
      var touch1 = e.originalEvent.changedTouches[0];
      $touchEndX = touch1.pageX;
      $touchEndY = touch1.pageY;
      var distanceX = Math.abs($touchStartX - $touchEndX);
      var distanceY = Math.abs($touchStartY - $touchEndY);
      if(($touchStartY > $touchEndY) && (distanceY > distanceX) && (distanceY - distanceX) > 100){
        key += 1;
      }else if(($touchStartY < $touchEndY) && (distanceY > distanceX) && (distanceY - distanceX) > 100){
        key -= 1;
      }
      if (key > $screenNum - 1) {
        key = $screenNum - 1;
      } else if (key < 0) {
        key = 0;
      }
      scrollAndNav();
      prev = key;
    });
  }

  //滚动并同步导航
  function scrollAndNav() {
    $('.wrapBox').stop(true).animate({top: -key * 100 + '%'}, 400);
    $('.nav-right li').eq(key).addClass('current').siblings().removeClass('current');
    $('.navigation li').eq(key).addClass('current').siblings().removeClass('current');
    $('.box').eq(prev).addClass('comeout');
    $(".box").eq(key).removeClass('comeout').addClass("boxActive").siblings().removeClass("boxActive");
  }
});