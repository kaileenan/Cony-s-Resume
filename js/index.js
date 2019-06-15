// * * Made by 兔吒 ** //
;$(function () {

  //首页中间
  var mouseX = 0, mouseY = 0, mouseCX = 0, mouseCY = 0,
    blockX = mouseX, blockY = mouseY, blockCX = mouseCX, blockCY = mouseCY,
    bgPointX = 0, bgPointY = 0;
  $('.mask .home-center').each(function (i) {
    if (i == 0) {
      $(this).addClass('active');
      $(this).next().addClass('next');
      $(this).prev().addClass('prev');
    } else {
      $(this).attr('id', 'slide-' + i);
    }
  });
  var timer;
  $('.block').on('mouseenter', function () {
    timer = setInterval(function () {
      blockCY += (mouseY - blockCY) / 12;
      blockCX += (mouseX - blockCX) / 12;
      $('.block .circleLight').css({
        background: 'radial-gradient(circle at ' + bgPointX + 'px ' + bgPointY + 'px, rgba(255,255,255,0.7), rgba(50,120,180,0.5))',
        opacity: "1",
      });
      $('.block').css({
        transform: 'scale(1.03) translate(' + (blockCX * 0.05) + 'px, ' + (blockCY * 0.05) + 'px) rotateX(' + (blockCY * 0.05) + 'deg) rotateY(' + (blockCX * 0.05) + 'deg)'
      });
    }, 20);
    $(this).on('mousemove', function (e) {
      mouseX = parseInt((e.pageX - $(this).offset().left) - $('.block').width() / 2);
      mouseY = parseInt((e.pageY - $(this).offset().top) - $('.block').height() / 2);
      bgPointX = parseInt((e.pageX - $(this).offset().left));
      bgPointY = parseInt((e.pageY - $(this).offset().top));
    })
  });
  $('.block').on('mouseleave', function (e) {
    // mouse.X = mouse.CX;
    // mouse.Y = mouse.CY;
    $('.block').css({
      transform: "none",
    });
    $('.block .circleLight').css({
      opacity: "0",
    });
    clearInterval(timer);
  });

  //首页中间 end

  //展开导航
  $(window).on("resize", function () {
    var $navigation = $('.navigation'),
      $pageH = $(window).height(),
      $pageW = $(window).width();
    $navigation.css({
      borderBottom: $pageH + "px solid rgba(228,228,228,.6)",
    });
    $navigation.find('.left-bg').css({
      borderBottom: $pageH + "px solid rgba(228,228,228,.6)",
    });
  });


  var $navigationBox = $('.navigationBox'),
    $navBtn = $('.nav-toggle');
  $navBtn.on("click", function (e) {
    navClose();
    e.stopPropagation();
  });
  $navigationBox.on('click', function (e) {
    e.stopPropagation();
  });
  $navigationBox.find("li").on("click", function () {
    navClose();
  });
  $(document).on('click', function () {
    $navigationBox.removeClass('nav-show');
    $('.nav-right').fadeIn();
    $(this).removeClass('nav-close');
    $('.nav-float').text("导航");
  });

  function navClose() {
    $navigationBox.toggleClass('nav-show');
    $('.nav-right').fadeToggle();
    $(this).toggleClass('nav-close');
    if ($navigationBox.hasClass('nav-show')) {
      $('.nav-float').text("关闭");
    } else {
      $('.nav-float').text("导航");
    }
  }


  //skill circle定位
  var skillCircleScroll, skillProgress, skillToolBox;
  $(window).on('resize', function () {
    clearTimeout(skillCircleScroll);
    skillCircleScroll = setTimeout(function () {
      var $midCont = $('.middleContent'),
        $screenW = $(window).width(),
        $screenH = $(window).height(),
        $midContW = parseInt($screenW * 0.7);
      switch ($midContW % 5) {
        case 1:
          $midContW += 4;
          break;
        case 2:
          $midContW += 3;
          break;
        case 3:
          $midContW += 2;
          break;
        case 4:
          $midContW += 1;
          break;
      }
      $midCont.css({
        width: $midContW + 'px',
        top: '50%',
        left: '50%',
        marginLeft: -($screenW * 0.35) + 'px',
        marginTop: -($screenH * 0.22) + 'px'
      });
    }, 20);
    clearTimeout(skillProgress);
    skillProgress = setTimeout(function () {
      var $midCont1 = $('.middleContent1'),
        $screenW = $(window).width(),
        $screenH = $(window).height();
      $midCont1.css({
        width: $screenW * 0.6 + 'px',
        height: $screenH * 0.3 + 'px',
        top: '50%',
        left: '50%',
        marginLeft: -($screenW * 0.3) + 'px',
        marginTop: -($screenH * 0.22) + 'px'
      });
    }, 20);
    clearTimeout(skillToolBox);
    skillToolBox = setTimeout(function () {
      var $toolBox = $('.toolbox'),
        $screenH = $(window).height(),
        $imgs = $toolBox.find('img'),
        $liW = $toolBox.find("li").width(),
        $liP = $toolBox.find("p");
      $toolBox.css({
        height: $screenH * 0.2 + 'px',
        top: '80%',
        marginTop: -($screenH * 0.15) + 'px'
      });
      $imgs.css({
        top: ($toolBox.height() - $imgs.height()) / 2,
        left: ($liW - $imgs.width()) / 2
      });

    }, 20)
  });


  //禁止右键
  document.oncontextmenu = function () {
    // return false;
  };

});