class Plugin {
  async render(div) {
    this.img = document.createElement('img');
    this.loaded = false;
    div.appendChild(this.img);

    this.img.addEventListener('load', () => {
      this.loaded = true;
      div.innerText = 'The Hat';
    });

    this.img.src = 'https://raw.githubusercontent.com/tradica/hackphx-taco/master/dfSmb.png';

    this.img.style.display = 'none';
    div.style.width = '140px';
    div.style.height = '140px';
    div.innerText = 'loading, please wait!';
    console.log(ui.getViewport());
  }

  draw(ctx) {
    if (!this.loaded) return;
    const viewport = ui.getViewport();
    const planets = ui.getPlanetsInViewport();

    for (const p of planets) {
      const pixelCenter =
        viewport.worldToCanvasCoords(p.location.coords);
      const trueRadius = viewport.worldToCanvasDist(
        ui.getRadiusOfPlanetLevel(p.planetLevel)
      );

      ctx.drawImage(
        this.img,
        0,
        0,
        958,
        980,
        pixelCenter.x - (trueRadius * 3),
        pixelCenter.y - (trueRadius * 3),
        //pixelCenter.x,
        //pixelCenter.y,
        trueRadius * 6,
        trueRadius * 6
      );
    }
  }

  destroy() {}
}

plugin.register(new Plugin());
