
var canvas;
var ctx;
var escenario=new Image();
var mouseX=100;
var mouseY=100;
var lastPress=null;

var mirilla=new Image();
var dog=new Image();
var tittle=new Image();
var imgIns=new Image();

var sx=0;//variables para el pintado sprite perro
var sy=0;
var swidth=58.5;
var sheight=50;
var xdog=100;
var ydog=300;
var countEffect=100;

//variables para pintado  sprites patos

var dsx=0;
var dsy=0;
var dswidth=35.5;
var dsheight=35;
var xduck=300;
var yduck=200;

var d2sx=0;
var d2sy=0;
var d2swidth=35.5;
var d2sheight=35;
var x2duck=300;
var y2duck=200;

var rastreo=true;
var jumpdog=false;
var duckhunt=false;
var duck2hunt=false;
var cerrarRastreo=false;
var duck=new Image();
var duck2=new Image();

var fall=false;
var fall2=false;
var countFall=0;
var countFall2=0;

var speedAnimation=0;
var score=0;
var duckScape=0;
var speedDuck=1;
var countGoD2=0;

var player=new Circle(0,0,3);
var duckCircle=new Circle(0,0,30);
var duckCircle2=new Circle(0,0,30);
var  pressing = [];
var inst=false;
var gameOver=false;
var goDuck2=false;

//variables de Audio
var shot=new Audio();
var ras=new Audio();
var fly=new Audio();
var lad=new Audio();
var musicMenu=new Audio();
var laugh=new Audio();

var SCENE_1 = 1,
		SCENE_2 = 2,
		SCENE_3 = 3,
    KEY_ENTER = 13,
    KEY_SPACE = 17,
    currentScene = 1;

var trophy=false;
//variables para el registro de puntuacion mas alta
var highscores = [];
		posHighscore = 10;

//clase circulo
function Circle(x,y,radius){
		this.x=(x==null)?0:x;
		this.y=(y==null)?0:y;
		this.radius=(radius==null)?0:radius;
	}

	Circle.prototype.distance=function(circle){
		if(circle!=null){
			var dx=this.x-circle.x;
			var dy=this.y-circle.y;
			return (Math.sqrt(dx*dx+dy*dy)-(this.radius+circle.radius));
		}
	}

	Circle.prototype.stroke=function(ctx){
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		ctx.stroke();
	}

	Circle.prototype.drawImage=function(ctx,img){
		if(img.width)
			ctx.drawImage(img,this.x-this.radius,this.y-this.radius);
		else
			this.stroke(ctx);
	}

window.onload=function(){

  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  init();


}

function addHighscore(score) {
  posHighscore = 0;
   while (highscores[posHighscore] > score && posHighscore < highscores.length) {
    posHighscore += 1;
   }
   highscores.splice(posHighscore, 0, score);
   if (highscores.length > 10) {
    highscores.length = 10;
   }
   localStorage.highscores = highscores.join(',');
}

function init(){

    rastreo=true;
    speedAnimation=200;
    speedDuck=2;
    loadImages();
    loadAudio()
    repaint();
    anim();
    enableInputs()

    if (localStorage.highscores) {
			highscores = localStorage.highscores.split(',');
		}
 }

 function reset(){

    sx=0;
    sy=0;
    swidth=58.5;
    sheight=50;
    xdog=100;
    ydog=300;
    countEffect=100;

    dsx=0;
    dsy=0;
    dswidth=35.5;
    dsheight=35;
    xduck=300;
    yduck=200;

    d2sx=0;
    d2sy=0;
    d2swidth=35.5;
    d2sheight=35;
    x2duck=300;
    y2duck=200;
    countGoD2=0;
    goDuck2=false;
    rastreo=true;
    jumpdog=false;
    duckhunt=false;
    duck2hunt=false;
    cerrarRastreo=false;
    //duck=new Image();
    fall=false;
    countFall=0;
    fall2=false;
    countFall2=0;
    speedAnimation=200;
    score=0;
    duckScape=0;
    speedDuck=2;
    inst=false;
    gameOver=false;
    currentScene = SCENE_1;
    //init();

 }

 function repaint(){


 paint();
 run();
 window.requestAnimationFrame(repaint);

 }

 function setRandomPosition(){

   return Math.floor(Math.random()*100)+50;
 }

function setRandomLeft(){

    return Math.floor(Math.random()*350)+200;
}



 function paint() {

   	if(currentScene == SCENE_1){
        //ejecutaremos las acciones de menu.

        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();

        //canvas.strokeStyle="black";

        ctx.fillStyle="white";
        ctx.fill();

        countEffect++;
        //para añadir efecto parpadeo al texto de comenzar el juego
        if(countEffect>=30){

          ctx.font="20px Verdana";
          ctx.fillText('PRESS ENTER TO START',170,250);
          if(countEffect>=60)
              countEffect=0;

        }
        ctx.font="15px Verdana";
        ctx.fillText("PRESS ctrl FOR LOOK THE INSTRUCTIONS",140,300);


        ctx.drawImage(tittle,100, 50,400,150);

        if(inst){

          ctx.drawImage(imgIns,0, 0,canvas.width,canvas.height);
        }


    }

    else if(currentScene == SCENE_2){
        //ejecutamos las acciones de juego
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();

        if(cerrarRastreo && !gameOver){

          if(!duckhunt){

            xduck+=speedDuck;
            yduck-=speedDuck;
            //si se sale de los limites de la pantalla
            if(xduck>canvas.width || xduck<0 || yduck<0){
              //llamar funcion randomx
              duckScape++;
              xduck=setRandomPosition();
              yduck=400;
            }
            //si el pato es cazado



          }

          else{

            //pintar animacion del pato muriendo
            if(fall){
              yduck+=speedDuck;
              if(yduck>canvas.height){
                fall=false;
                duckhunt=false;
                xduck=setRandomPosition();
                yduck=400;
              }
            }

          }

          if(goDuck2){

            if(!duck2hunt){

              x2duck-=speedDuck;
              y2duck-=speedDuck;
              //si se sale de los limites de la pantalla
              if(x2duck>canvas.width || x2duck<0 || y2duck<0){
                //llamar funcion randomx
                duckScape++;
                //HACER OTRO SET random
                //HACER Q LOS PATOS NO SALGAN SIEMPRE
                x2duck=setRandomLeft();
                y2duck=400;
                goDuck2=false;
              }

            }

            else{

              //pintar animacion del pato muriendo
              if(fall2){
                y2duck+=speedDuck;
                if(y2duck>canvas.height){
                  fall2=false;
                  duckhunt2=false;
                  x2duck=setRandomLeft();
                  y2duck=400;
                  goDuck2=false;
                }
              }

            }
            ctx.drawImage(duck2,d2sx,d2sy,d2swidth,d2sheight,x2duck,y2duck,60,60);
          }


            ctx.drawImage(duck,dsx,dsy,dswidth,dsheight,xduck,yduck,60,60);
            //pato tipo dos

        }

        if(gameOver){

          //pintamos animacion perro riendose
            ctx.fillText("GAME OVER",250,200);
            ctx.drawImage(dog,sx,sy,swidth,sheight,270,232,80,80);

        }

        ctx.drawImage(escenario,0,0,canvas.width,canvas.height);

        if(!cerrarRastreo){
          if(xdog<350){
            xdog++;

          }

          else{
            rastreo=false;
          }
            ctx.drawImage(dog,sx,sy,swidth,sheight,xdog,ydog,80,80);

        }



        ctx.fillText('SCORE: '+score,40,30);
        ctx.fillText('DUCK SCAPE:'+duckScape,460,30);
        ctx.drawImage(mirilla,mouseX, mouseY,20,20);
        //player.drawImage(ctx,duck);
        ctx.fill();


    }

    else if(SCENE_3){

      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.beginPath();

			ctx.fillText('HIGH SCORES', 250, 100);

			for (i = 0, l = highscores.length; i < l; i += 1) {
				if (i === posHighscore) {
					ctx.fillText('*' + highscores[i], 300, 120 + i * 20);
				} else {
					ctx.fillText(highscores[i], 300, 120 + i * 20);
				}
			}

    }


 }

 function run(){
   if(currentScene == SCENE_1){
       //ejecutaremos las acciones de menu.
       musicMenu.play();
       if (lastPress === KEY_ENTER){
				currentScene = SCENE_2;
				lastPress = null;
        musicMenu.pause();
			}

      if(lastPress=== KEY_SPACE ){

        inst=!inst;
        lastPress=null;
      }


   }

   else if(currentScene == SCENE_2){

     if(!gameOver){

       if(!cerrarRastreo){
         if(rastreo){
           ras.play();
         }
         else{

             lad.play();

         }
       }

       else {
         ras.pause();
         lad.pause();
       }


          player.x= mouseX;
       		player.y=mouseY;

           duckCircle.x=xduck;
           duckCircle.y=yduck;

           duckCircle2.x=x2duck;
           duckCircle2.y=y2duck;
           
           if(player.x<0)
       		 	 player.x=0;
       		if(player.x>canvas.width)
       		 	 player.x=canvas.width;
       		if(player.y<0)
       		 	 player.y=0;
       		if(player.y>canvas.height)
       		 	 player.y=canvas.height;

           //comprobamos si hemos acertado a un pato en el disparo y si es asi incrementamos puntuacion
         if(lastPress==1){


           if(player.distance(duckCircle)<10){

             shot.play();
             score++;
             duckhunt=true;

           }

           else if(player.distance(duckCircle2)<10){

             shot.play();
             score++;
             duck2hunt=true;
           }

           lastPress=null;
         }

         //subimos la velocidad de los patos cuando llegamos a una cierta puntuacion para subir la dific
         if(score>5 && score <15){
           speedDuck=3;
         }

         if(score>15){
           speedDuck=4;
         }

         //si se escapan 7 patos activamos game over
         if(duckScape>6){
           gameOver=true;
           addHighscore(score);//guardamos la puntuacion obtenida
         }

         if(!goDuck2){

           //var rand= Math.floor(Math.random()*100)+1;
           countGoD2++;
           if(countGoD2>700){
             goDuck2=true;
             countGoD2=0;
           }
         }


     }

     else{
        //reproducimos sonido risa perro
        //si pulsamos enter nos lleva al marcador de puntuacion
        laugh.play();
        if (lastPress === KEY_ENTER){

 				lastPress = null;
        currentScene = SCENE_3;
        //reset();

 			}
     }




   }

   else if(currentScene == SCENE_3){

     if (lastPress === KEY_ENTER){

     lastPress = null;

     reset();

   }
   }




 }

 function loadImages(){

 //imagen de fondo
   escenario.src="./sprites/stage.png";
   mirilla.src="./sprites/mira.png";
   dog.src="./sprites/duckh.png";
   duck.src="./sprites/duckh.png";
   duck2.src="./sprites/duckhi.png";
   tittle.src="./sprites/menu.jpg";
   imgIns.src="./sprites/instrucciones.jpg";
 }

 function loadAudio(){

   shot.src="./AUDIO/disparo.mp3";
   fly.src="./AUDIO/fly.mp3";
   ras.src="./AUDIO/rastreo.mp3";
   lad.src="./AUDIO/ladrido.mp3";
   musicMenu.src="./AUDIO/menu.mp3";
   laugh.src="./AUDIO/gameover.mp3";

 }

 function anim(){

   if(!gameOver){

     //animacion movimiento del perro
     if(!cerrarRastreo){
       if(rastreo){
         sx+=61.1;
         if(sx>320){
           sx=0;
         }
       }
       //para bajar en la hoja de sprites
       else{
         if(!jumpdog){
           sy=61.1;
           //if(sx>184){
           sx=0;
           jumpdog=true;
         }
         else{
           sx=61.1;

           if(ydog>250){
             ydog-=10;
           }

           else{
             cerrarRastreo=true;
           }

         }
     }


       //sx+=61.1;
     }

     else{
       //animacion del pato volando
       if(!duckhunt){
         speedAnimation=100;
         dsy=150;
         dsx+=40;
         if(dsx>110){
           dsx=0;
         }
       }


       else{
         //animacion cuando ha sido cazado
         if(!fall){
           dsy=240;
           dsx=0;
           countFall++;
           if(countFall>5){
             fall=true;
             countFall=0;
           }
         }
         //animacion de pato cayendo
         else{

           dsx=40;
         }

       }

       if(goDuck2){

         if(!duck2hunt){
           //animacion pato
              d2sy=150;
              d2sx+=40;
              if(d2sx>110){
                d2sx=0;
              }
         }

         else{
           //si va mal borrar esto
           if(!fall2){
             d2sy=240;
             d2sx=0;
             countFall2++;
             if(countFall2>5){
               fall2=true;
               countFall2=0;
             }
           }
           //animacion de pato cayendo
           else{

             d2sx=40;
           }
         }
       }



     }



   }

   //animacion gameOver
   else{

     sy=61.1;
     sx=197.8;

   }







   setTimeout(anim,speedAnimation)
 }



 function enableInputs(){
   document.addEventListener('mousemove',function(evt){
     mouseX=evt.pageX-canvas.offsetLeft;
     mouseY=evt.pageY-canvas.offsetTop;
   },false);
   canvas.addEventListener('mousedown',function(evt){
   lastPress=evt.which;
   },false);
   window.addEventListener('keydown', function(evt){lastPress = evt.which;})

 }


 //eventos de raton
 window.addEventListener('load',init,false);
 window.addEventListener('mousemove',function(evt){mouseX=evt.x-canvas.offsetLeft;
                                                   mouseY=evt.y-canvas.offsetTop;
                                                 });
