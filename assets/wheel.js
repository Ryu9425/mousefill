// console.log("script");

var scrollPos = 0;
var isScrolling = true;

var isFooting = false;

var headerHeight = $(".header").height();
var winHeight = $(window).height();

var scroll_navigationTop = headerHeight + (winHeight * 4) / 10;

var dists = [];

var selectedElNum = -1;

var movingContents = $(".filling");
var mainContents = $(".main_contents_inner");

var end = headerHeight;
var start = headerHeight + winHeight;
var footerTop = headerHeight + winHeight;

$(document).ready(function () {
  headerHeight = $(".header").height();

  for (var i = 1; i < movingContents.length; i++) {
    //console.log(i + "  " + dist)
    movingContents[i].setAttribute("style", " top:" + start + "px");
    movingContents[i].style.setProperty(
      "--topStart",
      winHeight.toString() + "px"
    );
    movingContents[i].style.setProperty("--topEnd", "0px");

    movingContents[i].style.setProperty("--topOStart", "0px");
    movingContents[i].style.setProperty(
      "--topOEnd",
      winHeight.toString() + "px"
    );

    //var footer = $(".footer")
    var scroll_navigation = document.getElementById("scroll_navigation");

    scroll_navigation.setAttribute(
      "style",
      "top:" + scroll_navigationTop + "px"
    );
    var footer = document.getElementById("footer");

    footer.setAttribute("style", "position:fixed; top:" + footerTop + "px");
  }
  for (var i = 0; i < dists.length; i++) {
    //console.log("dist: " + dists[i])
  }
});

window.onload = function () {
  // console.log("load");
  //	var scroll_navigation = document.getElementById('scroll_navigation');
  //	scroll_navigation.setAttribute("style", "top:" + scroll_navigationTop + "px");
  //	var footer = document.getElementById('footer');

  //	footer.setAttribute("style", "position:fixed; top:" + footerTop + "px");
};

var init_state = true;
var is_downing = false;

// new added //
var div_id = -1;
var current_el = 0;
var pre_dev;

var navLis = $(".dot");
var navEl = $(".scroll_navigation");
var currentAnimateEndedTime = new Date().getTime();
var downObj = document.getElementById("down-container");

window.addEventListener("wheel", (event) => {
  const delta = Math.sign(event.deltaY);

  //	console.log("inti state " + init_state + "  " + delta + "  " + div_id + " " + isScrolling)
  if (div_id == -1 || !isScrolling) return;

  if (delta == 1) {
    if (div_id == 0) {
      // if (mainContents[0].children[0].classList.contains("ani_text_show")) {
      if (downObj.classList.contains("show")) {
        if (currentAnimateEndedTime == 0) return;
        currentAnimateEndedTime = 0;
        isScrolling = false;

        // console.log("zzzzzzzzzzzzzzz");

        downObj.classList.remove("show");
        downObj.classList.add("hide");

        setTimeout(function () {
          if (movingContents[1].classList.contains("filling_hide"))
            movingContents[1].classList.remove("filling_hide");
          movingContents[1].classList.add("filling_show");
          dot_active(0, 1);
          
          div_id = 1;
          current_el = 1;

          init_state = true;
        }, 1300);

        setTimeout(function () {
          isScrolling = true;
          currentAnimateEndedTime = new Date().getTime();
        }, 1800);
      } else {
        if (current_el == 0) {
          mainContents[0].children[1].classList.add("ani_img_show");
          mainContents[0].children[1].classList.remove("init_hide");
          current_el = 1;
        } else if (current_el == 1) {
          mainContents[0].children[0].classList.add("ani_text_show");
          mainContents[0].children[0].classList.remove("init_hide");
          current_el = 2;
        } else if (current_el == 2) {
          // console.log("rrrrrrrrrrrrrrrrrr");
          downObj.classList.remove("hide");
          downObj.classList.add("show");
        }

        if (currentAnimateEndedTime == 0) return;
        currentAnimateEndedTime = 0;

        isScrolling = false;
        init_state = true;

        setTimeout(function () {
          isScrolling = true;
          currentAnimateEndedTime = new Date().getTime();
        }, 500);
      }
    } else if (div_id < 5 && div_id > 0) {
      // console.log("iiiii " + div_id + " " + current_el + " o " + isScrolling);
      // if (div_id == 1 && current_el == 0) {
      //   console.log("bbbbbbbbbbb");
      //   downObj.classList.remove("show");
      //   downObj.classList.add("hide");
      //   isScrolling = false;

      //   setTimeout(function () {
      //     if (movingContents[div_id].classList.contains("filling_hide"))
      //       movingContents[div_id].classList.remove("filling_hide");
      //     movingContents[div_id].classList.add("filling_show");
      //     dot_active(div_id - 1, div_id);
      //     current_el = 1;
      //   }, 700);

      //   setTimeout(function () {
      //     isScrolling = true;
      //   }, 800);
      // } else {
      if (
        mainContents[div_id].children[0].classList.contains("ani_text_show") &&
        div_id != 4
      ) {
        if (movingContents[div_id + 1].classList.contains("filling_hide"))
          movingContents[div_id + 1].classList.remove("filling_hide");
        movingContents[div_id + 1].classList.add("filling_show");
        dot_active(div_id, div_id + 1);
        current_el = 1;
        div_id++;
      } else {
        if (current_el == 0) {
          if (movingContents[div_id].classList.contains("filling_hide"))
            movingContents[div_id].classList.remove("filling_hide");
          movingContents[div_id].classList.add("filling_show");
          dot_active(div_id - 1, div_id);
          current_el = 1;
        } else if (current_el == 1) {
          mainContents[div_id].children[1].classList.add("ani_img_show");
          mainContents[div_id].children[1].classList.remove("init_hide");

          current_el = 2;
        } else if (current_el == 2) {
          mainContents[div_id].children[0].classList.add("ani_text_show");
          mainContents[div_id].children[0].classList.remove("init_hide");

          current_el = 0;
          div_id++;
        }
      }

      isScrolling = false;

      setTimeout(function () {
        isScrolling = true;
      }, 500);
      // }
    } else if (div_id == 5) {
      div_id = -2;
      //if (init_state) {
      var hh = headerHeight + winHeight;
      var f_ff = headerHeight + winHeight * 2;
      movingContents[4].setAttribute(
        "style",
        " position:absolute;top:" + hh + "px"
      );
      movingContents[4].classList.remove("filling_show");

      dot_active(-1, 4);

      footer.setAttribute("style", " ; top:" + f_ff + "px");
      $(document).scrollTop(hh);
      init_state = false;
      isScrolling = true;

      var scroll_navigation = document.getElementById("scroll_navigation");
      scroll_navigation.setAttribute(
        "style",
        "top:" + (headerHeight + (winHeight * 14) / 10) + "px"
      );
      //}
    }
  } else {
    if (div_id == 0 && isScrolling) {
      //	console.log("downded-- " + div_id)

      movingContents[0].setAttribute("style", " top:" + headerHeight + "px");

      //nav dot initing setting...

      var scroll_navigation = document.getElementById("scroll_navigation");
      scroll_navigation.setAttribute(
        "style",
        "top:" + scroll_navigationTop + "px"
      );

      $(document).scrollTop(headerHeight);
      div_id = -1;

      isScrolling = false;
      init_state = true;

      setTimeout(function () {
        isScrolling = true;
      }, 400);
    } else if (div_id > 0 && div_id < 4 && isScrolling) {
      // console.log(
      //   "iiiii " +
      //     div_id +
      //     " out... " +
      //     isScrolling +
      //     $(movingContents[div_id + 1]).top
      // );

      if (currentAnimateEndedTime == 0) return;
      currentAnimateEndedTime = 0;
      // console.log("time.. " + currentAnimateEndedTime);

      movingContents[div_id].classList.remove("filling_show");
      movingContents[div_id].classList.add("filling_hide");

      dot_active(div_id, div_id - 1);
      isScrolling = false;

      div_id--;
      current_el = 1;

      setTimeout(function () {
        isScrolling = true;
        currentAnimateEndedTime = new Date().getTime();
        mainContents[div_id + 1].children[1].classList.remove("ani_img_show");
        mainContents[div_id + 1].children[1].classList.add("init_hide");
        mainContents[div_id + 1].children[0].classList.remove("ani_text_show");
        mainContents[div_id + 1].children[0].classList.add("init_hide");
      }, 1800);
    } else if (div_id == 4 && isScrolling) {
      movingContents[div_id].classList.remove("filling_show");
      movingContents[div_id].classList.add("filling_hide");

      dot_active(div_id, div_id - 1);
      isScrolling = false;

      div_id--;
      current_el = 1;

      setTimeout(function () {
        isScrolling = true;
        mainContents[div_id + 1].children[1].classList.remove("ani_img_show");
        mainContents[div_id + 1].children[1].classList.add("init_hide");
        mainContents[div_id + 1].children[0].classList.remove("ani_text_show");
        mainContents[div_id + 1].children[0].classList.add("init_hide");
      }, 1800);
    } else if (div_id == -2) {
      is_downing = false;
    }
  }
});

function dot_active(pre_dot_id, current_dot_id) {
  for (var i = 0; i < navLis.length; i++) {
    if (i == pre_dot_id || pre_dot_id == -1) {
      if (navLis[i].classList.contains("active"))
        navLis[i].classList.remove("active");
    }
    if (i == current_dot_id) {
      navLis[i].classList.add("active");
    }
  }
}

$(document).on("scroll", function () {
  var pageTop = $(document).scrollTop();
  //console.log("55555555  " + pageTop + " " + headerHeight + " " + init_state)

  if (pageTop > headerHeight && init_state) {
    movingContents[0].style.position = "fixed";
    movingContents[0].style.top = "0px";
    div_id = 0;
    current_el = 0;
    init_state = false;
    isScrolling = true;

    var scroll_navigation = document.getElementById("scroll_navigation");
    scroll_navigation.setAttribute(
      "style",
      "position:fixed ; top:" + (winHeight * 4) / 10 + "px"
    );
  }

  if (
    pageTop < scrollPos &&
    movingContents[0].style.top != "0px" &&
    pageTop < headerHeight / 3
  ) {
    mainContents[0].children[1].classList.remove("ani_img_show");
    mainContents[0].children[1].classList.add("init_hide");
    mainContents[0].children[0].classList.remove("ani_text_show");
    mainContents[0].children[0].classList.add("init_hide");
  }

  //	console.log("downing..pagetop. " + pageTop + "  scrollpos " + scrollPos + " is downloading.." + is_downing
  //		+ " start " + start + " divid " + div_id + " scrolling  " + isScrolling + " curr  " + current_el)

  if (pageTop < scrollPos && div_id == -2) {
    if (pageTop < headerHeight + winHeight && is_downing == false) {
      //			console.log("111... " + $(movingContents[4]).position().top + "  " + start)
      is_downing = true;
      movingContents[4].setAttribute(
        "style",
        "position:fixed; top: 0px;	--topStart: " +
          winHeight.toString() +
          "px;--topEnd: 0px;--topOStart: 0px;--topOEnd: " +
          winHeight.toString() +
          "px;"
      );

      footer.setAttribute("style", "position: fixed;top: " + footerTop + "px;");

      var scroll_navigation = document.getElementById("scroll_navigation");
      scroll_navigation.setAttribute(
        "style",
        "position:fixed ; top:" + (winHeight * 4) / 10 + "px"
      );

      setTimeout(function () {
        isScrolling = true;
        current_el = 2;
        div_id = 4;
      }, 500);
    }
  }

  //console.log(currentT+" "+(dists[3] - winHeight / 2)+" "+scroll_MaxTop+ " : "+ headerHeight)
  if (div_id > 0 && div_id < 5) {
    var scroll_navigation = document.getElementById("scroll_navigation");
    scroll_navigation.setAttribute(
      "style",
      "position:fixed ; top:" + (winHeight * 4) / 10 + "px"
    );
  }

  scrollPos = pageTop;
});
