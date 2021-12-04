function init() {
    const stage = new createjs.Stage("basketball-map");
    createjs.Touch.enable(stage);
    // enabled mouse over / out events
    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas



    const circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();

    circle.on("mousedown", function(evt) {
        this.parent.addChild(this);
        this.offset = { x: this.x - evt.stageX, y: this.y - evt.stageY };
    });
    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    circle.on("pressmove", function(evt) {
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        // indicate that the stage should be updated on the next tick:
        update = true;
    });

    circle.on("rollover", function(evt) {
        this.scale = this.originalScale * 1.2;
        update = true;
    });

    circle.on("rollout", function(evt) {
        this.scale = this.originalScale;
        update = true;
    });
}

function stop() {
    createjs.Ticker.removeEventListener("tick", tick);
}

init()