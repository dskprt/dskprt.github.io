var currentPage = 0;

window.onload = function() {
    this.fetch("https://api.github.com/users/dskprt").then(response => {
        response.json().then(json => {
            document.getElementById("bio").innerText = json.bio;
        });
    });

    document.getElementById("main-page").style.opacity = "100%";
}

function previous() {
    showPage(currentPage -= 1);
}

function next() {
    showPage(currentPage += 1);
}

async function showPage(n) {
    var pages = document.getElementsByClassName("page");

    if(n > pages.length) {
        currentPage = 1;
    }

    if(n < 1) {
        currentPage = pages.length;
    }

    for(var i = 0; i < pages.length; i++) {
        pages[i].style.opacity = "0%";
        pages[i].style.pointerEvents = "none";
        pages[i].style.cursor = "default";
    }

    pages[currentPage - 1].style.opacity = "100%";
    pages[currentPage - 1].style.pointerEvents = "all";
    pages[currentPage - 1].style.cursor = "inherit";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
