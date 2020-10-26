var ctxObj = {
    canvas : null,
    context : null,
    create: function(canvas_tag_id, w, h){
        this.canvas = document.getElementById(canvas_tag_id);
        this.canvas.height = h
        this.canvas.width = w
        this.context = this.canvas.getContext('2d');
        return this.context;
    }
}

var sprite = function(filename, is_pattern) {
    this.image = null;
    this.pattern = null;
    this.TO_RADIANS = Math.PI/180;

    // if (filename!=undefined && filename!="" & filename !=null){
        if(filename){
        this.image = new Image();
        this.image.src = filename;

        if (is_pattern) { this.pattern = ctxObj.context.createPattern(this.image, 'repeat')}

    } else {
        console.log("unable to load sprite.");
    }

    this.draw = function(x, y, w, h){
        // Pattern?
        if (this.pattern!=null){
            ctxObj.context.fillStyle = this.pattern
            ctxObj.context.fillRect(x, y, h, w)
        } else {
            // Image
            if(w==undefined || h==undefined){
                ctxObj.context.drawImage(this.image, x, y,
                                         this.image.width,
                                         this.image.height)
            } else {
                // Stretched
                ctxObj.context.drawImage(this.image, x, y,w, h)
            }
        }
    }

    this.rotate = function (x, y, angle){
        ctxObj.context.save();
        ctxObj.context.translate(x,y);
        ctxObj.context.rotate(angle* this.TO_RADIANS);
        ctxObj.context.drawImage(this.image,
                                -this.image.width/2,
                                -this.image.height/2);
        ctxObj.context.restore();

    }
}

document.addEventListener('DOMContentLoaded',()=>{
    // Initialise
    ctxObj.create("canvas",800, 800)
    
    var WALL = "wall.png";
    var CRATE = "crate.png"

    var image1 = new sprite(WALL, true);
    var image2 = new sprite(CRATE, false);
    var patternImg = new sprite(CRATE, true);
    var angle = 0;

    setInterval(function(){
        // ctxObj.context.beginPath();
        // ctxObj.context.rect(0,0,640,480)
        ctxObj.context.fillStyle = '#000000'
        ctxObj.context.fillRect(0,0,800,800)

        image1.draw(0,0,216,216)
        image2.draw(216,74, 256, 32)
        patternImg.draw(300,250,100,100)
        image1.rotate(150,350,angle+=4.0)
        image2.rotate(150,625, -angle/2)

        ctxObj.context.fill()
    },25)
})