const Engine = Matter.Engine ;
const World = Matter.World;
const Bodies = Matter.Bodies;

var monster ;

var monsters;

spawnPeriod = 1;

HP = 100;

MHP = 100 ;

gameState = "login";

monsterA = 0;

playerA = 0;

gen = "none" ;

AT = "monster" ;

T = "none" ; 

sheild = 0 ;

sheildS = "off" ;

sheildCount = "0";

xp = 0;

lvl = 1;

Xvalue = 250 ; 

Yvalue = 250 ;

pos = 0;

p = 0;

function preload(){
  play_background = loadImage("background.png");
  fight_background = loadImage("fight.jpg");
  form_image = loadImage("login.png")
  underwater_background = loadImage("underwater.jpg");
  end = loadImage("end.jpg")
  monster_image = loadImage("monster.png");
  sheild_image = loadImage("sheildb.png");
  burn = loadImage("burn.png");
  waterBeam = loadImage("waterattack.png");
  lightningB = loadImage("lightning.png");
  tornadoB = loadImage("tornadoB.png");
  tornado_image = loadImage("tornado.png");
  fire_image = loadImage("fire.png");
  lightning_image = loadImage("blueThunder.png");
  waterAttack_image = loadImage("waterBeam.png");
  hero_image = loadImage("hero.png");
  monster_attack_image = loadImage("monsterAttack.png");
  player_front = loadImage("player_front.png");
  player_down = loadImage("player_down.png");
  player_right = loadImage("player_right.png");
  player_left = loadImage("player_left.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;

  //database = firebase.database();

  form = new Form();

  selection = new Choose();

  sheildB = createSprite(displayWidth/4 , displayHeight/2+displayHeight/4,100,50);
  sheildB.visible = false ;
  sheildB.addImage(sheild_image);

  firePunch = createSprite(displayWidth/2+displayWidth/4 , displayHeight/2+displayHeight/4,100,50);
  firePunch.visible = false ;
  firePunch.addImage(burn);

  rain = createSprite(displayWidth/2+displayWidth/4 , displayHeight/2+displayHeight/4,100,50);
  rain.visible = false ;
  rain.addImage(waterBeam);

  lightningStrike = createSprite(displayWidth/2+displayWidth/4 , displayHeight/2+displayHeight/4,100,50);
  lightningStrike.visible = false ;
  lightningStrike.addImage(lightningB)

  windStorm = createSprite(displayWidth/2+displayWidth/4 , displayHeight/2+displayHeight/4,100,50);
  windStorm.visible = false ;
  windStorm.addImage(tornadoB)

  inv_monster = createSprite(displayWidth/2+displayWidth/4+50,displayHeight/2,50,50);
  inv_monster.visible = false;
  inv_monster.addImage(monster_image);

  flame =createSprite(displayWidth/2+displayWidth/4+50,displayHeight/2,50,50);
  flame.addImage(fire_image);
  flame.visible = false;

  waterAttack =createSprite(displayWidth/2+displayWidth/4,displayHeight/2+displayHeight/6,50,50);
  waterAttack.addImage(waterAttack_image);
  waterAttack.visible = false;

  lightning =createSprite(displayWidth/2+displayWidth/4+75,displayHeight/3,50,50);
  lightning.addImage(lightning_image);
  lightning.visible = false;
  
  tornado =createSprite(displayWidth/2+displayWidth/4+50,displayHeight/2+100,50,50);
  tornado.addImage(tornado_image);
  tornado.visible = false;
  
  hero =createSprite(displayWidth/4,displayHeight/2,50,50);
  hero.addImage(hero_image);
  hero.visible = false;
  
  monster_attack = createSprite(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15) 
  monster_attack.addImage(monster_attack_image);
  monster_attack.visible = false;


}

function draw() {
  background(255);  

  Engine.update(engine);

  //console.log(T);

  //console.log(playerA);

  //console.log(sheildCount);

  if(gameState === "login"){
    form.display();
  }

  if(gameState === "choose"){
    selection.display();
  }

  if(lvl === 1){
    if(gen === "flame"){

      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }
  
      if(gameState === "play"){

       
        if(spawnPeriod > 100){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
    
      }
    
      }
    
  
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;
    
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
    
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
        
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
        HP-=0.25 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "flame"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "flame" && playerA>10 && playerA<200){
        pAttack = new Flame(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.75;
        flame.visible = true;
      }
      else{
        flame.visible = false;
      }
    
      if(playerA>200){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;
      player.visible = true;  
    
    }

    }
  
    if(gen === "drop"){
  
      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
       
        if(spawnPeriod > 100){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
          //console.log(spawnPeriod);
    
      }
    
      }
    
      //if(monsterA > 0){
       // monsterA+=0.25 ;
      //}
    
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
    
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
        
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
        HP-=0.25 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "drop"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "drop" && playerA>10 && playerA<200){
        pAttack = new Drop(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.5;
        waterAttack.visible = true;
      }
      else{
        waterAttack.visible = false;
      }
    
      if(playerA>200){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;  
      player.visible = true;  
  
    }


    }
  
    if(gen === "shock" ){
  
      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
       
        if(spawnPeriod > 100){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
          //console.log(spawnPeriod);
    
      }
    
      }
    
      //if(monsterA > 0){
       // monsterA+=0.25 ;
      //}
    
      if(gameState === "fight"){
    
        image(fight_background, 0,0,displayWidth, displayHeight);

        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
  
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
    
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
        HP-=0.25 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "shock"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "shock" && playerA>10 && playerA<300){
        pAttack = new Shock(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.5;
        lightning.visible = true;
      }
      else{
        lightning.visible = false;
      }
    
      if(playerA>400){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;    
      player.visible = true;  

    }


    }
  
    if(gen === "breeze" ){
  
      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
  
        if(spawnPeriod < 100) {
          HP = 150 ;
        }
       
        if(spawnPeriod > 100){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
          //console.log(spawnPeriod);
    
      }
    
      }
    
      //if(monsterA > 0){
       // monsterA+=0.25 ;
      //}
    
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
    
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
    
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
          HP-=0.25 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "breeze"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "breeze" && playerA>10 && playerA<200){
        pAttack = new Breeze(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.5;

        tornado.visible = true;
      }
      else{
        tornado.visible = false;
      }
    
      if(playerA>200){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;    
      player.visible = true;  

    }


    }
  }

  if(lvl === 2){
    if(gen === "flame"){

      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
       
        if(spawnPeriod > 50){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
    
      }
    
      }
    
  
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
    
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
        
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
        HP-=0.5 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "flame"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "flame" && playerA>10 && playerA<200){
        pAttack = new Flame(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=1;
        flame.visible = true;
      }
      else{
        flame.visible = false;
      }
    
      if(playerA>200){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;    
      player.visible = true;  

    }


    }
  
    if(gen === "drop"){
  
      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
       
        if(spawnPeriod > 50){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
          //console.log(spawnPeriod);
    
      }
    
      }
    
      //if(monsterA > 0){
       // monsterA+=0.25 ;
      //}
    
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
    
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
        
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
        HP-=0.5 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "drop"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "drop" && playerA>10 && playerA<200){
        pAttack = new Drop(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.75;
        waterAttack.visible = true;
      }
      else{
        waterAttack.visible = false;
      }
    
      if(playerA>200){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;    
      player.visible = true;  

    }


    }
  
    if(gen === "shock" ){
  
      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
       
        if(spawnPeriod > 50){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
          //console.log(spawnPeriod);
    
      }
    
      }
    
      //if(monsterA > 0){
       // monsterA+=0.25 ;
      //}
    
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
  
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
    
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
        HP-=0.5 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "shock"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "shock" && playerA>10 && playerA<400){
        pAttack = new Shock(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.75;
        lightning.visible = true;
      }
      else{
        lightning.visible = false;
      }
    
      if(playerA>400){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;    
      player.visible = true;  

    }


    }
  
    if(gen === "breeze" ){
  
      if(p === 0){
        player = createSprite(Xvalue,Yvalue,25,25);
        player.shapeColor = "red"
        player.addImage(player_front);
        p = 1;
      }  
      if(gameState === "play"){
  
        player.display();
  
        if(spawnPeriod < 50) {
          HP = 150 ;
        }
       
        if(spawnPeriod > 50){
    
          gameState = "fight" ;
    
        }
    
        if(spawnPeriod>0){
          spawnPeriod+=0.25 ;
          //console.log(spawnPeriod);
    
      }
    
      }
    
      //if(monsterA > 0){
       // monsterA+=0.25 ;
      //}
    
      if(gameState === "fight"){

        image(fight_background, 0,0,displayWidth, displayHeight);
    
        player.x = displayWidth/4;
        player.y = displayHeight/2;
        player.visible = false;

    
        player.display();
    
        monster = new Monster(displayWidth/2+displayWidth/4,displayHeight/2,50,50);
        //monster.display();
    
        if(AT === "monster"){
          monsterA = monsterA+0.25;
        }
    
      }
    
      if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    
        attack = new MonsterAttack(displayWidth/2-25,displayHeight/2,displayWidth/2-50,displayHeight/15);
    
        //attack.display();
    
        if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild < 1)
          HP-=0.5 ;
        //console.log(HP);
    
      }
  
      if(monsterA>100){
        AT = "player" ;
        monsterA = 0;
      }
  
      if(AT === "player" && T === "breeze"){
        playerA++ ;
      }
  
      if(AT === "player" && T === "breeze" && playerA>10 && playerA<200){
        pAttack = new Breeze(displayWidth/2+displayWidth/4,displayHeight/2,75,75);
        //pAttack.display()
        
        MHP-=0.75;
        tornado.visible = true;
      }
      else{
        tornado.visible = false;
      }
    
      if(playerA>200){
        AT = "monster" ;
    
        T = "none" ;
        playerA = 0 ;
      }
    
      if(HP<0){
        gameState = "end";
        background(0);
        text("You Tried",displayWidth/2,displayHeight/2);
    }

    if(gameState === "play"){
      player.x = Xvalue;
      player.y = Yvalue;  
      player.visible = true;  
    }


    }
  }

  if (gameState === "fight"){
    hpBar = new HPbar(displayWidth/4+HP/2,displayHeight/4,HP,20);
    hpBar.display();

    spawnPeriod = 0;
  }

  if (gameState === "fight"){
    mhpBar = new MHPbar((displayWidth/2+displayWidth/4)-MHP/2,displayHeight/4,MHP,20);
    mhpBar.display();
  }

  if(AT === "player" && gameState === "fight" && gen === "flame"){
    firePunch.visible = true;

    if(mousePressedOver(firePunch)){
      if(gameState === "fight" && AT === "player"){
        T = "flame" ;
    }
    }
  }

  if(AT === "player" && gameState === "fight" && gen === "drop"){
    rain.visible = true;

    if(mousePressedOver(rain)){
      if(gameState === "fight" && AT === "player"){
      T = "drop" ;
    }
    }
  }

  if(AT === "player" && gameState === "fight" && gen === "shock"){
    lightningStrike.visible = true;

    if(mousePressedOver(lightningStrike)){
      if(gameState === "fight" && AT === "player"){
      T = "shock" ;
    }
    }
  }

  if(AT === "player" && gameState === "fight" && gen === "breeze"){
    windStorm.visible = true;

    if(mousePressedOver(windStorm)){
      if(gameState === "fight" && AT === "player"){
      T = "breeze" ;
    }
    }
  }

  if(MHP<0){
    gameState = "play";
    
    spawnPeriod = 1;

    if(lvl = 1 && gen !== "breeze"){
      HP = 100 ;
    
      MHP = 100 ;
    }

    if(lvl = 1 && gen === "breeze"){
      HP = 150 ;
    
      MHP = 100 ;
    }

    if(lvl = 1 && gen !== "breeze"){
      HP = 150 ;
    
      MHP = 150 ;
    }

    if(lvl = 1 && gen === "breeze"){
      HP = 250 ;
    
      MHP = 150 ;
    }
        
    monsterA = 0;
    
    playerA = 0;
        
    AT = "monster" ;
    
    T = "none" ; 

    sheild = 0 ;

    sheildS = "off" ;

    sheildCount = "0";

    xp+=20 ;
  }

  if(gameState === "play" || gameState === "fight" || gameState === "end"){
    form.hide();
  }

  if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild > 0 && lvl === 1){
    sheild-- ;
  }

  if(monsterA>20 && monsterA < 100 && gameState === "fight" && sheild > 0 && lvl === 2){
    sheild-=2 ;
  }

  if(sheildS === "off" && sheild<1 && gameState === "fight" && lvl === 1){
    sheildCount++;
  }

  if(sheildS === "off" && sheild<1 && gameState === "fight" && lvl === 2){
    sheildCount+=3;
  }

  if(sheildCount > 100 && gameState === "fight"){
    sheildS = "on" ;
  }

  if(sheild>0){
    sheildBar = new SheieldBar((displayWidth/4+HP/2)+HP/2+sheild/2,displayHeight/4,sheild,20);
    sheildBar.display();
  }

  if(gameState === "fight"){
    sheildB.visible = true ;
    text("Sheild",displayWidth/4 , displayHeight/2+displayHeight/4);

    if(mousePressedOver(sheildB)){
      if(gameState === "fight" && sheildS === "on" && gen !== "drop" && lvl === 1){
        sheild = 50 ;
        sheildS = "off"
        sheildCount = 0;
    }

    if(gameState === "fight" && sheildS === "on" && gen === "drop" && lvl === 1){
        sheild = 150 ;
        sheildS = "off"
        sheildCount = 0;
    }

    if(gameState === "fight" && sheildS === "on" && gen !== "drop" && lvl === 2){
      sheild = 100 ;
      sheildS = "off"
      sheildCount = 0;
  }

  if(gameState === "fight" && sheildS === "on" && gen === "drop" && lvl === 2){
      sheild = 250 ;
      sheildS = "off"
      sheildCount = 0;
  }
    }
  }

  if(gen !== "drop"){
    chargeTime = (100-sheildCount)+1 ;
    chargeTime2 = (100-sheildCount) ;
  }

  if(gen === "drop"){
    chargeTime = (100-sheildCount)+1 ;
    chargeTime2 = (100-sheildCount)+2 ;
  }

  if(sheild<1 && gameState === "fight" && lvl === 1){
    text("Sheild will Charge in " + chargeTime,displayWidth/4,displayHeight/4+20);
  }

  if(sheild<1 && gameState === "fight" && lvl === 2){
    text("Sheild will Charge in " + chargeTime2,displayWidth/4,displayHeight/4+20);
  }

  if(gameState === "play" || gameState === "fight"){
    text("XP : "+xp, displayWidth/2,displayHeight /4 - 60);
    text("Level : "+lvl,displayWidth/2,displayHeight/4 - 80);
  }

  if(xp < 39){
    lvl = 1;
  }
  
  if(xp > 39){
    lvl = 2;
  }

  if(gameState !== "fight" && xp >1){
    sheildB.visible = false;
    firePunch.visible = false;
    rain.visible = false;
    lightningStrike.visible = false;
    windStorm.visible = false;
  }

  if(gameState === "play" && pos === 0){
    Xvalue = displayWidth/2 ; 
    Yvalue = displayHeight/2 ;

    pos = 1;
  }

  if(gameState === "play" && keyIsDown(UP_ARROW)){
    Yvalue-=10;
    player.addImage(player_front);
  }

  if(gameState === "play" && keyIsDown(DOWN_ARROW)){
    Yvalue+=10;
    player.addImage(player_down);
  }

  if(gameState === "play" && keyIsDown(RIGHT_ARROW)){
    Xvalue+=10;
    player.addImage(player_right);
  }

  if(gameState === "play" && keyIsDown(LEFT_ARROW)){
    Xvalue-=10;
    player.addImage(player_left);
  }

  if(Xvalue>1470|Xvalue<61||Yvalue>790||Yvalue<70){
    gameState = "end";
    background(0);
    image(underwater_background, 0,0,displayWidth, displayHeight);
    textSize(24);
    fill("black");
    text("You Died from Drowning",displayWidth/2-150,displayHeight/2);
    player.visible = false
  }

  if(gameState === "play"){
    image(play_background, 0,0,displayWidth, displayHeight);

  }

  if(gameState === "fight"){
    inv_monster.visible = true;
    hero.visible = true;
  }
  else{
    inv_monster.visible = false;
    hero.visible = false;
  }
  
  if(gameState === "login" || gameState === "choose"){
    image(form_image, 0,0,displayWidth, displayHeight);
  }

  if(monsterA>20 && monsterA < 100 && gameState === "fight"){
    monster_attack.visible = true;
  }
  else{
    monster_attack.visible = false;
  }

  if(gameState === "end"&&HP<0){
    image(end, 0,0,displayWidth, displayHeight);
    fill("black");
    textSize(24);
    text("You were Killed",displayWidth/2-150,displayHeight/2);
  }

  if(gameState === "end"){

    sheildB.visible = false ;
    monster_attack.visible = false;
    hero.visible = false;
    tornado.visible = false;
    lightning.visible = false;
    waterAttack.visible = false;
    flame.visible = false;
    inv_monster.visible = false;
    windStorm.visible = false ;
    lightningStrike.visible = false ;
    rain.visible = false ;
    firePunch.visible = false ;
    
  }

  drawSprites();
}