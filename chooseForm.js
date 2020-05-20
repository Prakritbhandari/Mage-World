class Choose {

    constructor() {
      this.flame = createButton('Fire');
      this.drop = createButton('Water');
      this.shock = createButton('Lightning');
      this.breeze = createButton('Wind');
    }
    hide(){
      this.flame.hide();
      this.drop.hide();
      this.shock.hide();
      this.breeze.hide();
    }
  
    display(){

        this.flame.position(displayWidth/4 , displayHeight/2+displayHeight/4);
        this.drop.position(displayWidth/2+displayWidth/4 , displayHeight/2+displayHeight/4);
        this.shock.position(displayWidth/4, displayHeight/4);
        this.breeze.position(displayWidth/2 + displayHeight/4, displayHeight/4);
  
      this.flame.mousePressed(()=>{

        gen = "flame" ;
        gameState = "play" ;
        this.hide();

      });

      this.drop.mousePressed(()=>{

        gen = "drop" ;

        gameState = "play" ;
        this.hide()

      });

      this.shock.mousePressed(()=>{

        gen = "shock" ;

        gameState = "play" ;
        this.hide()

      });

      this.breeze.mousePressed(()=>{

        gen = "breeze" ;

        gameState = "play" ;
        this.hide();

      });
 
  
    }


}
  
  