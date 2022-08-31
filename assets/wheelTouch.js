// console.log("script");

var scrollPos = 0;

var headerHeight = $(".header").height();
var winHeight = $(window).height();

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
      (winHeight+60).toString() + "px"
    );
    movingContents[i].style.setProperty("--topEnd", "0px");

    movingContents[i].style.setProperty("--topOStart", "0px");
    movingContents[i].style.setProperty(
      "--topOEnd",
      (winHeight+60).toString() + "px"
    );

    var footer = document.getElementById("footer");

    footer.setAttribute("style", "position:fixed; top:" + footerTop + "px");
  }
});


$(window).scroll(function(){
  document.webkitExitFullscreen();
  document.exitFullscreen();
});


var init_state = true;
var is_downing = false;

// new added //
var div_id = -1;
var current_el = 0;
var currentAnimateEndedTime = new Date().getTime();

var start_pos, end_pos;
window.addEventListener("touchstart", (event) => {
  start_pos = event.touches[0].pageY;
  document.getElementById("start").innerText = "test_start_state: " + start_pos;
});

window.addEventListener("touchend", function (event) {
  end_pos = event.changedTouches[0].pageY;
  //   this.alert("end " + end_pos);
  document.getElementById("end").innerText =
    "e: " +
    end_pos +
    "inti state " +
    init_state +
    "   " +
    div_id +
    " " +
    currentAnimateEndedTime;

  if (div_id == -1 || currentAnimateEndedTime == 0) {
    document.getElementById("end").innerText =
      "EFF: inti state " +
      init_state +
      "  " +
      "  " +
      div_id +
      " " +
      currentAnimateEndedTime;

      // this.alert("---")

    return;
  }
  if (end_pos < start_pos) {
    document.getElementById("end").innerText =
      "eeee: " +
      end_pos +
      "inti state " +
      init_state +
      "   " +
      div_id +
      " " +
      currentAnimateEndedTime;
    if (div_id == 0) {
      if (current_el == 0) {
        mainContents[0].children[1].classList.add("ani_img_show");
        mainContents[0].children[1].classList.remove("init_hide");
        current_el = 1;
      } else if (current_el == 1) {
        mainContents[0].children[0].classList.add("ani_text_show");
        mainContents[0].children[0].classList.remove("init_hide");
        current_el = 2;
      } else if (current_el == 2) {
        div_id = 1;
        current_el = 0;
      }

      currentAnimateEndedTime = 0;
      init_state = true;

      setTimeout(function () {
        currentAnimateEndedTime = new Date().getTime();
      }, 500);
    } else if (div_id < 5 && div_id > 0) {
      currentAnimateEndedTime = 0;
      if (
        mainContents[div_id].children[0].classList.contains("ani_text_show") &&
        div_id != 4
      ) {
        if (movingContents[div_id + 1].classList.contains("filling_hide"))
          movingContents[div_id + 1].classList.remove("filling_hide");
        movingContents[div_id + 1].classList.add("filling_show");
        current_el = 1;
        div_id++;
      } else {
        if (current_el == 0) {
          if (movingContents[div_id].classList.contains("filling_hide"))
            movingContents[div_id].classList.remove("filling_hide");
          movingContents[div_id].classList.add("filling_show");
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

      setTimeout(function () {
        currentAnimateEndedTime = new Date().getTime();
      }, 800);
      // }
    } else if (div_id == 5) {
      // this.alert("555")
      div_id = -2;
      
      setTimeout(() => {
        is_downing = true;
        // this.alert("isdown "+is_downing)
      }, 1300); 
      // var hh = headerHeight + winHeight;
      // var f_ff = headerHeight + winHeight * 2;

      var hh = 0;
      var f_ff =  winHeight;

      movingContents[4].setAttribute(
        "style",
        " position:absolute;top:" + hh + "px"
      );
       movingContents[4].classList.remove("filling_show");

      //  this.alert("555--> "+movingContents[4].classList+" : att ")

      footer.setAttribute("style", " ; top:" + f_ff + "px");
      $(document).scrollTo(hh);
      init_state = false;
      currentAnimateEndedTime = 0;  

           
    }
  } else if (end_pos > start_pos) {
    if (div_id == 0) {   
      
      // this.alert("div -- 0 ")
      
      movingContents[0].setAttribute("style", " top:" + headerHeight + "px");
      $(document).scrollTop(20);
      div_id = -1;

      // currentAnimateEndedTime = 0;
      init_state = true;

      // setTimeout(function () {
      //   currentAnimateEndedTime = new Date().getTime();
      // }, 600);
    } else if (div_id > 1 && div_id < 4) {
      currentAnimateEndedTime = 0;
      // console.log("time.. " + currentAnimateEndedTime);
      movingContents[div_id].classList.remove("filling_show");
      movingContents[div_id].classList.add("filling_hide");
      currentAnimateEndedTime = 0;

      div_id--;
      current_el = 2;

      setTimeout(function () {
        currentAnimateEndedTime = new Date().getTime();
        mainContents[div_id + 1].children[1].classList.remove("ani_img_show");
        mainContents[div_id + 1].children[1].classList.add("init_hide");
        mainContents[div_id + 1].children[0].classList.remove("ani_text_show");
        mainContents[div_id + 1].children[0].classList.add("init_hide");
      }, 1600);
    } else if (div_id == 4) {
      movingContents[div_id].classList.remove("filling_show");
      movingContents[div_id].classList.add("filling_hide");

      currentAnimateEndedTime = 0;

      div_id--;
      current_el = 2;

      setTimeout(function () {
        currentAnimateEndedTime = new Date().getTime();
        mainContents[div_id + 1].children[1].classList.remove("ani_img_show");
        mainContents[div_id + 1].children[1].classList.add("init_hide");
        mainContents[div_id + 1].children[0].classList.remove("ani_text_show");
        mainContents[div_id + 1].children[0].classList.add("init_hide");
      }, 1600);
    } else if (div_id == -2) {
      // is_downing = true;
    }
  }
});

var current_pos = 0;

window.addEventListener("touchmove", function (event) {

  event.preventDefault();
  event.stopPropagation();

  var pageTop = $(document).scrollTop();
  var touchPos = event.touches[0].pageY;

  document.getElementById("test").innerText =
    " pt: " +
    pageTop +
    " down " +
    is_downing +
    " tp " +
    touchPos +
    " in " +
    init_state +
    " id " +
    div_id +
    " cuel " +
    current_el;

  if (pageTop > headerHeight && init_state && div_id != 0) {
    // this.alert("ffff")
    movingContents[0].style.position = "fixed";
    movingContents[0].style.top = "0px";
    div_id = 0;
    current_el = 0;
    init_state = false;
    currentAnimateEndedTime = new Date().getTime();
  }

  if (
    pageTop < touchPos &&
    movingContents[0].style.top != "0px" &&
    pageTop < headerHeight / 3
  ) {
    mainContents[0].children[1].classList.remove("ani_img_show");
    mainContents[0].children[1].classList.add("init_hide");
    mainContents[0].children[0].classList.remove("ani_text_show");
    mainContents[0].children[0].classList.add("init_hide");
  }

  if (
    pageTop < 2 &&
    is_downing == true &&
    div_id == -2 &&
    current_pos < touchPos
  ) {
    is_downing = false;
    movingContents[4].setAttribute(
      "style",
      "position:fixed; top: 0px;	--topStart: " +
        (winHeight+60).toString() +
        "px;--topEnd: 0px;--topOStart: 0px;--topOEnd: " +
        (winHeight+60).toString() +
        "px;"
    );

    footer.setAttribute("style", "position: fixed;top: " + footerTop + "px;");

    setTimeout(function () {
      currentAnimateEndedTime = new Date().getTime();
      current_el = 2;
      div_id = 4;
    }, 500);
  }
  current_pos = touchPos;
});

    
