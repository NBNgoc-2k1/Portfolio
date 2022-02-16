// Variables for slideshow
let carousel = document.getElementById('slide_show');
let mySlides = carousel.getElementsByTagName('li');


let countForward = 4;
let countBackward = 2;
let preButton = document.getElementById('preBtn');
let nextButton = document.getElementById('nextBtn');
let widthItem = mySlides.item(0).clientWidth;

// Next button so that current item moves to next item

function forwardCarousel() {
    let locationCarousel;
    if (window.innerWidth >= 576)
        locationCarousel = -widthItem * countForward;
    else
        locationCarousel = -(widthItem * countForward - 3);
    countBackward = countForward - 1;
    if (countBackward < 0)
        countBackward = 6
    carousel.style.transform = 'translate3d(' + locationCarousel + 'px,0px,0px)';
    carousel.style.transition = 'transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s';
    if (countForward < 10)
        countForward++;
}

nextButton.addEventListener('click', forwardCarousel);
if (nextButton.clicked == false) {
    nextButton.addEventListener('touchstart', forwardCarousel);
    nextButton.addEventListener('touchmove', forwardCarousel);
}

// Previous button so that current item moves to previous item
function backwardCarousel() {
    let locationCarousel;
    if (window.innerWidth >= 576)
        locationCarousel = -widthItem * countBackward;
    else
        locationCarousel = -(widthItem * countBackward - 3);
    carousel.style.transition = 'transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s';
    carousel.style.transform = 'translate3d(' + locationCarousel + 'px,0px,0px)';
    countForward = countBackward + 1;
    if (countForward == 10)
        countForward = 3;
    if (countBackward >= 0)
        countBackward--;
}

preButton.addEventListener('click', backwardCarousel);
if (preButton.clicked == false) {
    preButton.addEventListener('touchstart', backwardCarousel);
    preButton.addEventListener('touchmove', backwardCarousel);
}

carousel.addEventListener('transitionend', () => {
    if (countForward == 10) {
        countForward = 3;
        let locationForwardCarousel = -widthItem * countForward;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(' + locationForwardCarousel + 'px,0px,0px)';
        countForward++;
    }

    if (countBackward < 0) {
        countBackward = 6;
        let locationBackwardCarousel = -widthItem * countBackward;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(' + locationBackwardCarousel + 'px,0px,0px)';
        countBackward--;
    }
})

let header = document.getElementById('header');

// When users scroll the scrollbar, webpage will create a line to distinguish nav bar from the rest
function scrollCreateBarrier() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
        header.classList.add("header-scrolling");
    else
        header.classList.remove("header-scrolling");
}

window.addEventListener('scroll', scrollCreateBarrier);


let navItem = document.getElementsByClassName('navtag');

function changeNavColor() {
    var orderNum;
    if ((document.body.scrollTop > 0 && document.body.scrollTop < 425) ||
        (document.documentElement.scrollTop > 0 && document.documentElement.scrollTop < 425)) {
        for (var i = 0; i < navItem.length; i++)
            navItem.item(i).className = "navtag";
    } else if ((document.body.scrollTop > 425 && document.body.scrollTop < 650) ||
        (document.documentElement.scrollTop > 425 && document.documentElement.scrollTop < 650)) {
        orderNum = 0;
        navItem.item(orderNum).className = "navtag active";
    } else if ((document.body.scrollTop > 650 && document.body.scrollTop < 1000) ||
        (document.documentElement.scrollTop > 650 && document.documentElement.scrollTop < 1000)) {
        orderNum = 1;
        navItem.item(orderNum).className = "navtag active";
    } else if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        orderNum = 2;
        navItem.item(orderNum).className = "navtag active";
    }
    for (var i = 0; i < navItem.length; i++) {
        if (i != orderNum)
            navItem.item(i).className = "navtag";
    }

}

window.addEventListener('scroll', changeNavColor);

// when click on type of services, PLAN choice has value of that service.
let typeService = document.getElementById('selservice').getElementsByTagName('option');
let requestServiceButton = document.getElementsByClassName('requestservice');
var autoFocusInput = document.getElementsByClassName("form-control").item(0);

requestServiceButton.item(0).addEventListener('click', () => {
    autoFocusInput.focus();
    document.getElementById("footer").scrollIntoView();
    typeService.item(1).selected = 'true';
})

requestServiceButton.item(1).addEventListener('click', () => {
    autoFocusInput.focus();
    document.getElementById("footer").scrollIntoView();
    typeService.item(2).selected = 'true';
})

requestServiceButton.item(2).addEventListener('click', () => {
    autoFocusInput.focus();
    document.getElementById("footer").scrollIntoView();
    typeService.item(3).selected = 'true';
})

/* Click menu icon so that navigation appear and click delete button to hidden navigation */
var menuIcon = document.getElementsByClassName("menu-icon");
var closeIcon = document.getElementsByClassName("close-icon");
var listNav = document.getElementById("navigation");
var lineMenuIcon = document.getElementsByClassName("line");

function menuEffect() {
    if (menuIcon != null) {
        menuIcon.item(0).classList.toggle("close-icon");
        menuIcon.item(0).classList.toggle("menu-icon");
        listNav.style.display = "flex";
        menuIcon = null;
        closeIcon = document.getElementsByClassName("close-icon");
    } else {
        if (closeIcon != null) {
            closeIcon.item(0).classList.toggle("menu-icon");
            closeIcon.item(0).classList.toggle("close-icon");
            listNav.style.display = "none";
            closeIcon = null;
            menuIcon = document.getElementsByClassName("menu-icon");
        }
    }

    for (let index = 0; index < lineMenuIcon.length; index++) {
        lineMenuIcon.item(index).classList.toggle(`line${index+1}`);
    }
}

menuIcon.item(0).addEventListener('click', menuEffect);
closeIcon.item(0).addEventListener('click', menuEffect);

function resizeDimensionResponsive() {
    let newWidthWindow = window.innerWidth;
    let tempLocationCarousel;
    let newWidthItem;
    let planServiceArea = document.getElementById("planservice");
    let emailTextArea = document.getElementById("email");
    if (newWidthWindow >= 576) {
        if (newWidthWindow >= 992) {
            if (newWidthWindow >= 1200) {
                for (let i = 0; i < mySlides.length; i++)
                    mySlides.item(i).style.width = '360px';
            } 
            else {
                for (let i = 0; i < mySlides.length; i++)
                    mySlides.item(i).style.width = '300px';
                planServiceArea.classList.replace("col-md-7", "col-md-6");       
            }
        } else {
            listNav.style.display = 'none';
            if (newWidthWindow >= 768) {
                for (let i = 0; i < mySlides.length; i++)
                    mySlides.item(i).style.width = '327px';
                let detailTextArea = document.getElementsByClassName('col-md-12').item(2);
                emailTextArea.classList.replace("pddleft-8,pddright-8");
                detailTextArea.classList.replace("pddleft-8,pddright-8");
                planServiceArea.classList.replace("col-md-6", "col-md-7");
            } 
            else{
                for (let i = 0; i < mySlides.length; i++)
                    mySlides.item(i).style.width = '484px';
            }
        }
        newWidthItem = mySlides.item(0).clientWidth;
        widthItem = newWidthItem;
        tempLocationCarousel = newWidthItem * 3;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(-' + tempLocationCarousel + 'px,0,0)';
    } 
    else{
        let tempWidthItem = newWidthWindow - 56;
        for (let i = 0; i < mySlides.length; i++)
            mySlides.item(i).style.width = (tempWidthItem + "px");
        newWidthItem = mySlides.item(0).clientWidth;
        widthItem = newWidthItem;
        tempLocationCarousel = newWidthItem * 3 - 3;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(-' + tempLocationCarousel + 'px,0,0)';
        emailTextArea.classList.toggle("pddleft-8");
        emailTextArea.classList.toggle("pddright-8");
        let detailService = document.getElementsByClassName('hastooltiptext');
        detailService.item(0).style.left = "-15%";
        detailService.item(1).style.left = "-15%";
        detailService.item(2).style.left = "-60%";
        detailService.item(3).style.left = "-100%";
    }
}

resizeDimensionResponsive();

window.addEventListener('resize', resizeDimensionResponsive);
window.addEventListener('load', resizeDimensionResponsive);