class SheieldBar {
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

        strokeWeight(2);
        stroke("black");
        fill("#3C72BE");
        rect(this.body.position.x,this.body.position.y,this.width,this.height);
        

    }
};