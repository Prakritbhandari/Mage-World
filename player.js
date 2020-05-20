class Player {
    constructor(x,y,width,height){
        var options = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width;
        this.height = height;
        World.add(world, this.body);

        this.name = null;

    }

    display(){
        rectMode(CENTER);

        fill("blue");
        rect(this.body.position.x,this.body.position.y,this.width,this.height);

    }
};