var pemain = localStorage.getItem("pemain"); 

if (pemain == null || pemain === "") {
  pemain = prompt("Masukkan Nama Pemain : "); 
  localStorage.setItem("pemain", pemain); 
}

document.getElementById("pemain").innerHTML = pemain; // Tampilkan nama pemain

function setBackgroundMoving() {
  setTimeout(function () {
    var bg = document.getElementById("board");
    bg.style.backgroundPosition =
      parseInt(bg.style.backgroundPosition.replace("px", "")) - 3 + "px";

    document.getElementById("score").innerHTML =
      parseInt(document.getElementById("score").innerHTML) + 1;

    setBackgroundMoving();
  }, 10);
}
setBackgroundMoving();

function setBoxMoving() {
  var box = document.getElementById("box");
  var pirate = document.getElementById("pirate");

  setTimeout(function () {
    box.style.marginLeft =
      parseInt(box.style.marginLeft.replace("px", "")) - 3 + "px";

    if (parseInt(box.style.marginLeft.replace("px", "")) < -100) {
      box.style.marginLeft = "1100px";
    }
    
    var hitboxMargin = 1; // Ubah sesuai kebutuhan

    // Posisi relatif objek
    var pirateRight = pirate.offsetLeft + pirate.offsetWidth;
    var boxLeft = box.offsetLeft;

    if (
      pirateRight - hitboxMargin > boxLeft &&
      pirate.offsetLeft + hitboxMargin < box.offsetLeft + box.offsetWidth &&
      pirate.offsetTop + pirate.offsetHeight - hitboxMargin > box.offsetTop &&
      pirate.offsetTop + hitboxMargin < box.offsetTop + box.offsetHeight
    ) {
      // Objek pirate dan box bertabrakan, Anda dapat mengatur game over di sini
      alert(
        "Game Over! Score Anda : " + document.getElementById("score").innerHTML + "🎉" + "\n\nKlik OK untuk bermain lagi."
      );
      window.location.reload();
    } else {
      // Objek pirate berhasil menghindari tabrakan, lanjutkan permainan
      setBoxMoving();
    }
  }, 5);
}
setBoxMoving();

window.addEventListener("keyup", function (e) {
  if (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 13) {
    document.getElementById("pirate").style.marginTop = "10px";
    document.getElementById("pirate").setAttribute("class", "freeze");
    setTimeout(function () {
      document.getElementById("pirate").style.marginTop = "270px";
      document.getElementById("pirate").setAttribute("class", "");
    }, 500);
  }
});