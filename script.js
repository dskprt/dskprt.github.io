var currentPage = 0;

window.onload = function() {
    this.fetch("https://api.github.com/users/dskprt/repos").then(response => {
        response.json().then(json => {
            for(var i = 0; i < json.length; i++) {
                var name = json[i].name;
                var private = json[i].private;
                var url = json[i].html_url;
                var desc = json[i].description || "";
                var lang = json[i].language || "";
                var license = json[i].license || "";

                if(private) {
                    return;
                }

                const div = document.createElement("div");
                div.className = "page";
                div.id = "repo";
                div.innerHTML = `
                <span onclick="previous()" class="arrow arrow-top"></span>
                <a href="${url}" target="_blank" style="color: inherit; text-decoration: none;">
                    <div>
                        <h1>${name}</h1><small>${license.name || ""}</small>
                        <h4 style="font-weight: normal;">${desc}</h4>
                        <small>${lang}</small>
                    </div>
                </a>
                <span onclick="next()" class="arrow arrow-bottom"></span>`;

                document.body.insertBefore(div, document.body.firstChild);
            }
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
