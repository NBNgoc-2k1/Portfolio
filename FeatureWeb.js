// Variables for slideshow
let carousel = document.getElementById('slide_show'); 
let mySlides = carousel.getElementsByTagName('li');


let countForward=4;
let countBackward=2;
let preButton = document.getElementById('preBtn');
let nextButton = document.getElementById('nextBtn');
let widthItem = mySlides.item(0).clientWidth;

// Next button so that current item moves to next item

function forwardCarousel(){
    let locationCarousel = -widthItem*countForward;
    
    countBackward = countForward-1;
    if (countBackward < 0)
        countBackward = 6
    carousel.style.transform = 'translate3d(' + locationCarousel +'px,0px,0px)';
    carousel.style.transition = 'transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s';
    if (countForward < 10)
        countForward++;
}

nextButton.addEventListener('click',forwardCarousel);   
if (nextButton.clicked == false){
    nextButton.addEventListener('touchstart',forwardCarousel);
    nextButton.addEventListener('touchmove',forwardCarousel); 
}   

// Previous button so that current item moves to previous item
function backwardCarousel(){
    let locationCarousel = -widthItem*countBackward;
    carousel.style.transition = 'transform 400ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s';
    carousel.style.transform = 'translate3d(' + locationCarousel +'px,0px,0px)';
    countForward = countBackward+1;
    if (countForward == 10)
        countForward = 3;
    if (countBackward>=0)
        countBackward--;
}

preButton.addEventListener('click',backwardCarousel);
if (preButton.clicked == false) {
    preButton.addEventListener('touchstart',backwardCarousel);
    preButton.addEventListener('touchmove',backwardCarousel); 
}

carousel.addEventListener('transitionend',()=>{
    if (countForward == 10){
        countForward = 3;
        let locationForwardCarousel = -widthItem*countForward;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(' + locationForwardCarousel +'px,0px,0px)';
        countForward++;
    }

    if (countBackward < 0){
        countBackward = 6; 
        let locationBackwardCarousel = -widthItem*countBackward;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(' + locationBackwardCarousel +'px,0px,0px)';
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

window.addEventListener('scroll',scrollCreateBarrier);


let navItem = document.getElementsByClassName('navtag');
function changeNavColor(){
    var orderNum;
    if ((document.body.scrollTop > 0 && document.body.scrollTop < 425)
     || (document.documentElement.scrollTop > 0 && document.documentElement.scrollTop < 425))
    {
        for(var i=0;i<navItem.length;i++)
            navItem.item(i).className = "navtag";
    }
    else if ((document.body.scrollTop > 425 && document.body.scrollTop < 650)
    || (document.documentElement.scrollTop > 425 && document.documentElement.scrollTop < 650))
    {
        orderNum = 0;
        navItem.item(orderNum).className = "navtag active";
    }
    else if ((document.body.scrollTop > 650 && document.body.scrollTop < 1000)
    || (document.documentElement.scrollTop > 650 && document.documentElement.scrollTop < 1000))
    {
        orderNum = 1;
        navItem.item(orderNum).className = "navtag active";
    }
    else if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000)
    {
        orderNum=2;
        navItem.item(orderNum).className = "navtag active";
    }
    for (var i=0;i<navItem.length;i++){
        if (i!=orderNum)
            navItem.item(i).className = "navtag";
    }
    
}

window.addEventListener('scroll',changeNavColor);

// when click on type of services, PLAN choice has value of that service.
let typeService = document.getElementById('selservice').getElementsByTagName('option');
let requestServiceButton = document.getElementsByClassName('requestservice');
var autoFocusInput = document.getElementsByClassName("form-control").item(0);

requestServiceButton.item(0).addEventListener('click',()=>{
    autoFocusInput.focus();
    document.getElementById("footer").scrollIntoView();
    typeService.item(1).selected = 'true';
})

requestServiceButton.item(1).addEventListener('click',()=>{
    autoFocusInput.focus();
    document.getElementById("footer").scrollIntoView();
    typeService.item(2).selected = 'true';  
})

requestServiceButton.item(2).addEventListener('click',()=>{
    autoFocusInput.focus();
    document.getElementById("footer").scrollIntoView();
    typeService.item(3).selected = 'true';
})

/* Click menu icon so that navigation appear and click delete button to hidden navigation */
var menuIcon = document.getElementById("menu-icon");
var deleteBtn = document.getElementById("delete-icon");
var listNav = document.getElementById("navigation");

function configMenuBtn(){
    menuIcon.style.display = "none";
    listNav.style.display = "flex";
    deleteBtn.style.display = "block";
}

menuIcon.addEventListener("click",configMenuBtn);
if (menuIcon.clicked == false) 
    menuIcon.addEventListener('touchstart',configMenuBtn);

function configDeleteBtn(){
    menuIcon.style.display = "block";
    listNav.style.display = "none";
    deleteBtn.style.display = "none";
}

deleteBtn.addEventListener("click",configDeleteBtn);
if (deleteBtn.clicked == false) 
    deleteBtn.addEventListener('touchstart',configDeleteBtn);


function resizeDimensionResponsive(){
    let newWidthWindow = window.innerWidth;
    let tempLocationCarousel;
    let newWidthItem;
    if (newWidthWindow >= 576) {
        if (newWidthWindow >= 1200) {
            for (let i = 0; i < mySlides.length; i++)
                mySlides.item(i).style.width = '360px';
            menuIcon.style.display = "none";
            listNav.style.display = "flex";
            deleteBtn.style.display = "none";
        }
        else if (newWidthWindow >= 992 && newWidthWindow < 1200) {
            for (let i = 0; i < mySlides.length; i++)
                mySlides.item(i).style.width = '300px';
            menuIcon.style.display = "none";
            listNav.style.display = "flex";
            deleteBtn.style.display = "none";
        }
        else if (newWidthWindow >= 768 && newWidthWindow < 992) {
            for (let i = 0; i < mySlides.length; i++)
                mySlides.item(i).style.width = '327px';
            menuIcon.style.display = "block";
            listNav.style.display = "none";        
        }
        else if (newWidthWindow >= 576 && newWidthWindow < 768) {
            for (let i = 0; i < mySlides.length; i++)
                mySlides.item(i).style.width = '484px';
            menuIcon.style.display = "block";
            listNav.style.display = "none"; 
        }
        newWidthItem = mySlides.item(0).clientWidth;
        widthItem = newWidthItem;
        tempLocationCarousel = newWidthItem * 3;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(-' + tempLocationCarousel + 'px,0,0)';
    }
    else if (newWidthWindow < 576) {
        let tempWidthItem = newWidthWindow - 56;
        for (let i = 0; i < mySlides.length; i++)
            mySlides.item(i).style.width = (tempWidthItem + "px");
        newWidthItem = mySlides.item(0).clientWidth;
        widthItem = newWidthItem;
        tempLocationCarousel = newWidthItem * 3;
        carousel.style.transition = 'none';
        carousel.style.transform = 'translate3d(-' + tempLocationCarousel + 'px,0,0)';
        menuIcon.style.display = "block";
        listNav.style.display = "none"; 
    }
    countForward=4;
    countBackward=2;
}

window.addEventListener('resize',resizeDimensionResponsive);
window.addEventListener('load',resizeDimensionResponsive);


