

setTimeout(() => {

    const img = document.createElement("img");
    img.setAttribute("src", "img/waiting.gif");
    img.setAttribute("class","img-fluid");

    const text = document.createElement("p");
    text.id = "cant";
    text.innerHTML = "Enter the Number to Predict PLZ";

    document.getElementById("warning").appendChild(img);
    document.getElementById("warning-text").appendChild(text);

},3000)