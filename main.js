// recupération des données du fichier json
let spriteData;
fetch("./assets/Data/bird_spritsheet.json").then((res) =>
  res.json().then((data) => {
    console.log(data);
    spriteData = data;
  })
);

// function de chargement des images(spritesheet)

function loadImages(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    console.log(img);
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`could not load image ${URL}`));
    img.src = url;
  });
}

// chargement des images (spritesheet à faire)
loadImages("./assets/images/Bird_Spritesheet.png")
  .then((img) => {
    console.log(img);
    // document.body.appendChild(img);

    //affichage d'une image
    const canvas = document.querySelector("#canvas");

    spriteData.forEach((sprite) => {
      drawImage(canvas, img, sprite);
    });
  })
  .catch((err) => console.error(err));

function drawImage(canvas, image, sprite) {
  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height,
    canvas.width / 2 - sprite.width / 2,
    canvas.height / 2 - sprite.height / 2,
    sprite.width,
    sprite.height
  );
}

// changement d'image à intervalle régulier

function animate(canvas, image, sprites) {
  let currentSpriteIndex = 0;
  const interval = setInterval(() => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(canvas, image, sprites[currentSpriteIndex]);
    currentSpriteIndex = (currentSpriteIndex + 1) % sprites.length;
  }, 100);

  function stopAnimation() {
    clearInterval(interval);
  }

  return stopAnimation;
}

// Déplacement de l'image sur le canvas
function handleKeydown(event, canvas, image, sprite) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (event.key) {
    case "ArrowLeft":
      sprite.x -= 10;
      break;
    case "ArrowRight":
      sprite.x += 10;
      break;
    case "ArrowUp":
      sprite.y -= 10;
      break;
    case "ArrowDown":
      sprite.y += 10;
      break;
  }

  drawSprite(canvas, image, sprite);
}
