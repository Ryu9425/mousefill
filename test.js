<script>

	var scrollPos = 0;

	var isScrolling = false
	
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

		console.log("rrrrr  " + currentT + "   " + $(mainContents[0]).position().top)

		if ($(mainContents[0]).position().top < currentT + screen.height * 2 / 10 && pageTop > scrollPos) {
			setTimeout(function () {
				//console.log("-setTimeout-setTimeout")
				mainContents[0].children[1].classList.add("ani_img_show")
				mainContents[0].children[1].classList.remove("init_hide")
			}, 500);

			setTimeout(function () {
				//console.log("-setTimeout-setTimeout")
				mainContents[0].children[0].classList.add("ani_text_show")
				mainContents[0].children[0].classList.remove("init_hide")
			}, 1300);
		}


		for (var i = 1; i < mainContents.length; i++) {
			var mainContent = mainContents[i]

			//console.log("..current. " + currentT + ":" + pageTop + " ::: " + $(mainContents[i]).position().top)
			//if (currentT < -headerHeight) diff = -1

			if ($(mainContents[i - 1]).position().top < currentT - 150 && pageTop > scrollPos) {
				var ttt = currentT - $(mainContent).position().top
				//console.log("DDDDDDDDD... " + diff + " : " + $(mainContents[i - 1]).position().top + "   " + i
				//	+ "    " + currentT)
				if (diff > currentT - $(mainContents[i - 1]).position().top) {
					//console.log("selected " + i + " " + diff)
					diff = currentT - $(mainContents[i - 1]).position().top
					selectedElNum = i
					isScrolling = true
				}

			} else if ($(mainContents[i]).position().top > currentT + 50 && pageTop < scrollPos) {
				var dd = $(mainContents[i]).position().top
				console.log("bottom " + i + "  " + dd)

				if (diff > $(mainContents[i]).position().top - currentT + 50) {
					//diff = $(mainContents[i]).position().top - currentT
					//selectedElNum = i - 1
				}
			} else {

			}

			if ($(mainContents[i]).position().top > currentB && pageTop < scrollPos) {
				mainContents[i].children[0].classList.remove("ani_text_show")
				mainContents[i].children[0].classList.add("init_hide")
				mainContents[i].children[1].classList.remove("ani_img_show")
				mainContents[i].children[1].classList.add("init_hide")
			}
		}

		if ($(mainContents[0]).position().top > currentB && pageTop < scrollPos) {
			mainContents[0].children[0].classList.remove("ani_text_show")
			mainContents[0].children[0].classList.add("init_hide")
			mainContents[0].children[1].classList.remove("ani_img_show")
			mainContents[0].children[1].classList.add("init_hide")
		}

		if ($(mainContents[4]).position().top < currentT) {
			selectedElNum = - 1
			isScrolling = false
		}
		//console.log("smooth  " + diff + " .. " + selectedElNum)


		//console.log("smooth  " + i + " .. " + too)
		if (selectedElNum == -1) {

		} else {
			var too = $(mainContents[selectedElNum]).position().top + headerHeight
			if (isScrolling) {
				isScrolling = false
				
				setTimeout(function () {
					//console.log("-setTimeout-setTimeout")
					mainContents[selectedElNum].children[1].classList.add("ani_img_show")
					mainContents[selectedElNum].children[1].classList.remove("init_hide")
				}, 500);

				setTimeout(function () {
					//console.log("-setTimeout-setTimeout")
					mainContents[selectedElNum].children[0].classList.add("ani_text_show")
					mainContents[selectedElNum].children[0].classList.remove("init_hide")
				}, 1300);
			}
		}


		scrollPos = pageTop
	});
</script>