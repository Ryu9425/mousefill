<script>

function scrollToSmoothly(pos, time) {
    var currentPos = window.pageYOffset;
    var start = null;
    if(time == null) time = 20;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
        start = !start ? currentTime : start;
        var progress = currentTime - start;
        if (currentPos < pos) {
            window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
        } else {
            window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
        }
        if (progress < time) {
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, pos);
        }
    });
}

var scrollPos = 0;
$(document).on("scroll", function () {
    
    var pageTop = $(document).scrollTop()
    var pageBottom = pageTop + $(window).height()
    var headerHeight = $(".header").height()

    var mainContents = $(".main_contents_inner")

    var currentT = pageTop - headerHeight
    var currentB = pageBottom - headerHeight

    var movingContents = $(".filling")

    var diff = 10000
    var selectedElNum = -1


    for (var i = 1; i < mainContents.length; i++) {
        var mainContent = mainContents[i]

        console.log("..current. " +  currentT+":"+pageTop+" ::: "+$(mainContents[i]).position().top)  
        //if (currentT < -headerHeight) diff = -1

        if ($(mainContents[i - 1]).position().top < currentT-50 && pageTop > scrollPos) {
            var ttt = currentT - $(mainContent).position().top
            console.log("DDDDDDDDD... " + diff + " : " + $(mainContents[i-1]).position().top + "   " + i
                  + "    " + currentT)
            if (diff > currentT - $(mainContents[i-1]).position().top) {
                console.log("selected "+i+" "+diff)
                diff = currentT - $(mainContents[i-1]).position().top
                selectedElNum = i
            }					

        } else if ($(mainContents[i]).position().top > currentT+50 && pageTop <scrollPos) {					
            var dd =$(mainContents[i]).position().top
            console.log("bottom "+i+"  "+ dd)

            if(diff>$(mainContents[i]).position().top-currentT+50){
                diff =  $(mainContents[i]).position().top-currentT
                selectedElNum = i-1
            }
        } else {

        }

    }

    console.log("smooth  " + diff + " .. " + selectedElNum)

    
    //console.log("smooth  " + i + " .. " + too)
    if (selectedElNum == -1) {

    } else {
        var too = $(mainContents[selectedElNum]).position().top + headerHeight
        scrollToSmoothly(too,100)
        
        //$('html,body').animate({scrollTop:too},200);
        //window.scrollTo({
        //	top: too,
        //	behavior: 'smooth'
        //})
    }	
    
    scrollPos = pageTop
});
</script>