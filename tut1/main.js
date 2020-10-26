var ctxObj = {
    canvas : null,
    context : null,
    create: function(canvas_tag_id){
        this.canvas = document.getElementById(canvas_tag_id);
        this.context = this.canvas.getContext('2d');
        return this.context;
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    // Initialise
    ctxObj.create("canvas")
    ctxObj.context.beginPath();
    ctxObj.context.rect(0,0,640,480)
    ctxObj.context.fillStyle = 'black'
    ctxObj.context.fill()
})