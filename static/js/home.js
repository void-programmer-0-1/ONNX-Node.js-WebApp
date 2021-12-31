

setTimeout(() => {
    const intro = document.getElementById("intro").innerHTML;
    document.getElementById("intro").innerHTML = document.getElementById("heading").innerHTML;
    document.getElementById("heading").innerText = intro;
},2000)


