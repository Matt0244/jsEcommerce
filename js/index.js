// Purpose: To execute the event functions after all DOM elements and related resources have been fully loaded.
window.onload = function () {

    // Declare a variable to store the index of the clicked thumbnail
    var bigimgIndex = 0;

    // Render the breadcrumb navigation dynamically
    navPathDataBind();
    function navPathDataBind() {
        /**
         * Approach:
         * 1. First, get the breadcrumb navigation element (navPath).
         * 2. Then, retrieve the required data (data.js -> goodData.path).
         * 3. Since the data is generated dynamically, the corresponding DOM elements should also be created dynamically based on the amount of data.
         * 4. For the last item in the data, only an anchor tag (a) is created without an i tag.
         */

        // 1. Get the breadcrumb navigation element
        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');

        // 2. Get the data
        var path = goodData.path;

        // 3. Iterate through the data
        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                // Create only an anchor tag (a) without the href attribute
                var aNode = document.createElement("a");
                aNode.innerText = path[i].title;
                navPath.appendChild(aNode);
            } else {
                // 4. Create an anchor tag (a)
                var aNode = document.createElement("a");
                aNode.href = path[i].url;
                aNode.innerText = path[i].title;

                // 5. Create an i tag
                var iNode = document.createElement('i');
                iNode.innerText = '/';

                // 6. Append both the a and i elements to navPath
                navPath.appendChild(aNode);
                navPath.appendChild(iNode);
            }
        }
    }

    // Implement the zoom-in effect on mouse enter/leave
    bigClassBind();
    function bigClassBind() {
        /**
         * Approach:
         * 1. Get the small image container and set a mouseenter event.
         * 2. Dynamically create the overlay mask, large image container, and the large image itself.
         * 3. On mouseleave, remove the mask and large image container.
         */

        // 1. Get the small image container
        var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic');
        var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop');

        // Get the data
        var imagessrc = goodData.imagessrc;

        // 2. Set mouseenter event
        smallPic.onmouseenter = function () {

            // 3. Create an overlay mask
            var maskDiv = document.createElement('div');
            maskDiv.className = "mask";

            // 4. Create the large image container
            var BigPic = document.createElement('div');
            BigPic.id = "bigPic";

            // 5. Create the large image
            var BigImg = document.createElement('img');
            BigImg.src = imagessrc[bigimgIndex].b;

            // 6. Append the large image to the large image container
            BigPic.appendChild(BigImg);

            // 7. Append the overlay mask to the small image container
            smallPic.appendChild(maskDiv);

            // 8. Append the large image container to leftTop
            leftTop.appendChild(BigPic);

            // Set the mousemove event
            smallPic.onmousemove = function (event) {
                var left = event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2;
                var top = event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2;

                // Boundary checks
                if (left < 0) {
                    left = 0;
                } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
                    left = smallPic.clientWidth - maskDiv.offsetWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
                    top = smallPic.clientHeight - maskDiv.offsetHeight;
                }

                // Set the mask's position
                maskDiv.style.left = left + "px";
                maskDiv.style.top = top + "px";

                // Move the large image proportionally
                var scale = (smallPic.clientWidth - maskDiv.offsetWidth) / (BigImg.offsetWidth - BigPic.clientWidth);

                BigImg.style.left = -left / scale + 'px';
                BigImg.style.top = -top / scale + 'px';
            }

            // Set the mouseleave event
            smallPic.onmouseleave = function () {
                smallPic.removeChild(maskDiv); // Remove the overlay mask
                leftTop.removeChild(BigPic); // Remove the large image container
            }
        }
    }

    // Render the thumbnail data dynamically
    thumbnailData();
    function thumbnailData() {
        /**
         * Approach:
         * 1. Get the ul element under piclist.
         * 2. Get the data from goodData->imagessrc.
         * 3. Iterate through the array and create li elements based on the array length.
         * 4. Append the li elements to the ul.
         */

        var ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');
        var imagessrc = goodData.imagessrc;

        for (var i = 0; i < imagessrc.length; i++) {
            var newLi = document.createElement('li');
            var newImg = document.createElement('img');
            newImg.src = imagessrc[i].s;
            newLi.appendChild(newImg);
            ul.appendChild(newLi);
        }
    }

    // Handle thumbnail click event
    thumbnailClick();
    function thumbnailClick() {
        /**
         * Approach:
         * 1. Get all li elements and set click events for each.
         * 2. Determine the index of the clicked thumbnail to replace the current small and large image paths.
         */

        var liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');
        var smallPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');
        var imagessrc = goodData.imagessrc;

        smallPic_img.src = imagessrc[0].s; // Set default small image

        for (var i = 0; i < liNodes.length; i++) {
            liNodes[i].index = i; // Add custom index
            liNodes[i].onclick = function () {
                var idx = this.index;
                bigimgIndex = idx;
                smallPic_img.src = imagessrc[idx].s; // Change small image
            }
        }
    }

    // Render product details dynamically
    rightTopData();
    function rightTopData() {
        /**
         * Approach:
         * 1. Find the rightTop element.
         * 2. Retrieve the data from goodData->goodsDetail.
         * 3. Use a template string to insert the data into the layout, then re-render the rightTop element.
         */

        var rightTop = document.querySelector('#wrapper #content .contentMain #center #right .rightTop');
        var goodsDetail = goodData.goodsDetail;

        var s = `<h3>${goodsDetail.title}</h3>
                <p>${goodsDetail.recommend}</p>
                <div class="priceWrap">
                    <div class="priceTop">
                        <span>Price</span>
                        <div class="price">
                            <span>¥</span>
                            <p>${goodsDetail.price}</p>
                            <i>Price drop notice</i>
                        </div>
                        <p>
                            <span>Total reviews</span>
                            <span>${goodsDetail.evaluateNum}</span>
                        </p>
                    </div>
                    <div class="priceBottom">
                        <span>Promotion</span>
                        <p>
                            <span>${goodsDetail.promoteSales.type}</span>
                            <span>${goodsDetail.promoteSales.content}</span>
                        </p>
                    </div>
                </div>
                <div class="support">
                    <span>Support</span>
                    <p>${goodsDetail.support}</p>
                </div>
                <div class="address">
                    <span>Shipping to</span>
                    <p>${goodsDetail.address}</p>
                </div>`;

        rightTop.innerHTML = s; // Re-render rightTop
    }

    // Render product parameters dynamically
    rightBottomData();
    function rightBottomData() {
        /**
         * Approach:
         * 1. Find the rightBottom element.
         * 2. Retrieve the data from goodData->goodsDetail->crumbData.
         * 3. Since the data is an array, create a dynamic dl element (with dt and dd) for each item.
         */

        var chooseWrap = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap');
        var crumbData = goodData.goodsDetail.crumbData;

        for (var i = 0; i < crumbData.length; i++) {
            var dlNode = document.createElement('dl');
            var dtNode = document.createElement('dt');
            dtNode.innerText = crumbData[i].title;
            dlNode.appendChild(dtNode);

            for (var j = 0; j < crumbData[i].data.length; j++) {
                var ddNode = document.createElement('dd');
                ddNode.innerText = crumbData[i].data[j].type;
                ddNode.setAttribute('price', crumbData[i].data[j].changePrice);
                dlNode.appendChild(ddNode);
            }

            chooseWrap.appendChild(dlNode);
        }
    }

    // Exclusive color change effect on product parameters click
    clickddBind();
    function clickddBind() {
        /**
         * Approach:
         * 1. Test by getting all the dd elements under the first dl and add click events.
         * 2. Set the color of the clicked dd to red and reset the others to default color.
         * ==========================================================================================
         * Mark generation after clicking dd
         * Approach:
         * 1. Create an array container to hold the clicked dd values, with default values.
         * 2. Assign the clicked dd value to the array index.
         */

        var dlNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl');
        var arr = new Array(dlNodes.length);
        var choose = document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .choose');

        arr.fill(0); // Initialize the array with zeros

        for (var i = 0; i < dlNodes.length; i++) {
            (function (i) {
                var ddNodes = dlNodes[i].querySelectorAll('dd');
                for (var j = 0; j < ddNodes.length; j++) {
                    ddNodes[j].onclick = function () {
                        choose.innerHTML = "";

                        // Reset the color of all dd elements to the default
                        for (var k = 0; k < ddNodes.length; k++) {
                            ddNodes[k].style.color = "#666";
                        }

                        this.style.color = "red"; // Set clicked dd to red

                        arr[i] = this; // Store the clicked element in the array

                        changePriceBind(arr); // Call price change function

                        // Iterate over the array and generate mark tags for non-zero elements
                        arr.forEach(function (value, index) {
                            if (value) {
                                var markDiv = document.createElement('div');
                                markDiv.className = 'mark';
                                markDiv.innerText = value.innerText;

                                var aNode = document.createElement('a');
                                aNode.innerText = 'X';
                                aNode.setAttribute('index', index);
                                markDiv.appendChild(aNode);

                                choose.appendChild(markDiv); // Append mark to choose
                            }
                        });

                        // Set click events for the close buttons on the mark elements
                        var aNodes = document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .choose .mark a');

                        for (var n = 0; n < aNodes.length; n++) {
                            aNodes[n].onclick = function () {
                                var idx1 = this.getAttribute('index'); // Get the index of the clicked mark
                                arr[idx1] = 0; // Reset the array at the corresponding index

                                var ddlist = dlNodes[idx1].querySelectorAll('dd');

                                // Reset the color of all dd elements to default
                                for (var m = 0; m < ddlist.length; m++) {
                                    ddlist[m].style.color = "#666";
                                }

                                ddlist[0].style.color = 'red'; // Set the first dd to red by default

                                choose.removeChild(this.parentNode); // Remove the corresponding mark

                                changePriceBind(arr); // Call price change function
                            }
                        }
                    }
                }
            })(i);
        }
    }

    // Price change function
    /**
     * This function should be called when a dd element is clicked or a mark tag is removed.
     */
    function changePriceBind(arr) {
        /**
         * Approach:
         * 1. Get the price element.
         * 2. Each dd element should have a custom attribute to store the price change.
         * 3. Iterate over the array and add the price change to the base price.
         * 4. Re-render the new price in the p element.
         */

        var oldPrice = document.querySelector('#wrapper #content .contentMain #center #right .rightTop .priceWrap .priceTop .price p');
        var price = goodData.goodsDetail.price;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i]) {
                var changeprice = Number(arr[i].getAttribute('price'));
                price += changeprice;
            }
        }

        oldPrice.innerText = price;

        // Update the price in the left section
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        leftprice.innerText = '¥' + price;

        // Update the package price based on checked checkboxes
        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');
        var newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');

        for (var j = 0; j < ipts.length; j++) {
            if (ipts[j].checked) {
                price += Number(ipts[j].value);
            }
        }

        newprice.innerText = '¥' + price; // Update the right package price
    }

    // Price change effect when selecting a package in the middle section
    chooseprice();
    function chooseprice() {
        /**
         * Approach:
         * 1. Get all the checkboxes in the middle section.
         * 2. Iterate through these elements to extract their prices and add them to the base price.
         * 3. Re-write the updated price in the package price label.
         */

        var ipts = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .middle li input');
        var leftprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .left p');
        var newprice = document.querySelector('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .chooseBox .listWrap .right i');

        for (var i = 0; i < ipts.length; i++) {
            ipts[i].onclick = function () {
                var oldprice = Number(leftprice.innerText.slice(1));
                for (var j = 0; j < ipts.length; j++) {
                    if (ipts[j].checked) {
                        oldprice = oldprice + Number(ipts[j].value);
                    }
                }
                newprice.innerText = '¥' + oldprice; // Re-render the package price
            }
        }
    }

    // Generic tab switching function
    /**
     * ① Clicked elements - tabBtns
     * ② Elements to be switched and displayed - tabConts
     */
    function Tab(tabBtns, tabConts) {
        for (var i = 0; i < tabBtns.length; i++) {
            tabBtns[i].index = i;
            tabBtns[i].onclick = function () {
                for (var j = 0; j < tabBtns.length; j++) {
                    tabBtns[j].className = '';
                    tabConts[j].className = ''
                }
                this.className = 'active';
                tabConts[this.index].className = 'active';
            }
        }
    }

    // Left side tab click event
    leftTab();
    function leftTab() {
        var h4s = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .asideTop h4');
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .leftAside .aslideContent>div');
        Tab(h4s, divs); // Call the Tab function
    }

    // Right side tab click event
    rightTab();
    function rightTab() {
        var lis = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabBtns li');
        var divs = document.querySelectorAll('#wrapper #content .contentMain .goodsDetailWrap .rightDetail .BottomDetail .tabContents div');
        Tab(lis, divs); // Call the Tab function
    }

    // Right sidebar click event
    rightAsideBind();
    function rightAsideBind() {
        /**
         * Approach:
         * 1. Find the button element and set a click event.
         * 2. Track the initial state. If closed, expand it; otherwise, close it (toggle the state).
         * 3. Apply the corresponding class effect for the expanded and closed states.
         */

        var btns = document.querySelector('#wrapper .rightAside .btns');
        var flag = true; // Closed state
        var rightAside = document.querySelector('#wrapper .rightAside');

        btns.onclick = function () {
            if (flag) {
                btns.className = "btns btnsOpen";
                rightAside.className = "rightAside asideOpen";
            } else {
                btns.className = "btns btnsClose";
                rightAside.className = "rightAside asideClose";
            }
            flag = !flag; // Toggle the state
        }
    }
}
