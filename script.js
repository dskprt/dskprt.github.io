window.onload = function() {
    this.fetch("https://api.github.com/users/dskprt").then(response => {
        response.json().then(json => {
            document.getElementById("bio").innerText = json.bio;
        });
    });
}