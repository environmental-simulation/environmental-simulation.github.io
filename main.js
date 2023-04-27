const btnL = document.querySelector(".left-btn");
const btnR = document.querySelector(".right-btn");
const tabMenu = document.querySelector(".tab-menu");

const IconVisibility = () => {
    let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
    let scrollableWidth = tabMenu.scrollWidth -tabMenu.clientWidth;

    btnL.style.display = scrollLeftValue > 0 ? "block" : "none";
    btnR.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
}

IconVisibility();

btnR.addEventListener("click", () => {
    tabMenu.scrollLeft += 150;
    setTimeout(() => IconVisibility(), 50);
});

btnL.addEventListener("click", () => {
    tabMenu.scrollLeft -= 150;
    setTimeout(() => IconVisibility(), 50);
});

window.onresize = function(){
    IconVisibility();
}

//draggable nav
let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
    if(!activeDrag) return;
    tabMenu.scrollLeft -= drag.movementX;
    IconVisibility();
    tabMenu.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
    activeDrag = false;
    tabMenu.classList.remove("dragging");
});

tabMenu.addEventListener("mousedown", () => {
    activeDrag = true;
});

const tabs = document.querySelectorAll(".tab");
const tabBtns = document.querySelectorAll(".tab-button");

const tab_nav = function(tabBtnClick){
    tabBtns.forEach((tabBtn) => {
        tabBtn.classList.remove("active");
    });

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    tabBtns[tabBtnClick].classList.add("active");
    tabs[tabBtnClick].classList.add("active");

    // Store the index of the active tab in localStorage
    localStorage.setItem("activeTabIndex", tabBtnClick);
}

// Retrieve the index of the active tab from localStorage, if available
const activeTabIndex = localStorage.getItem("activeTabIndex") || 0;

if (activeTabIndex !== null) {
    // Set the appropriate tab as active
    tab_nav(activeTabIndex);

} else {
    localStorage.setItem("activeTabIndex", tabBtnClick);
}

tabBtns.forEach((tabBtn, i) => {
    tabBtn.addEventListener("click", () => {
        tab_nav(i);
        IconVisibility();
    });
});
