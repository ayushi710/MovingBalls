/**
 * Created by ayushimittal on 20/08/17.
 */

window.onload = function()
{
    var gameArea =
        {
            canvas : document.createElement("canvas"),
            start : function()
            {
                this.canvas.width = 800;
                this.canvas.height= 500;
                this.context = this.canvas.getContext('2d');

                this.canvas.style.backgroundColor ="#000000";
                document.body.appendChild(this.canvas);
                this.interval =setInterval(updateGameArea,1000/60);
            },
            clear : function()
            {
                this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            }
        }
    gameArea.start();
    var solidColor = ["red","yellow","green","blue","brown","pink","purple","orange","grey","violet","white","darkgray","crimson","cyan","indigo"];
    var direction = ["top","bottom","left","right","top-left","top-right","bottom-left","bottom-right"];
    function Ball(x,y,color,dir)
    {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.color = color;
        this.dir = dir;
        this.render = function()
        {
            var ctx = gameArea.context;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,2 * Math.PI);
            ctx.fillStyle = solidColor[this.color];
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

        }
        this.direction =direction[this.dir];


    }
    var balls = [];
    var no_of_balls;
    var x,y,color,dir;


    function updateGameArea()
    {
        gameArea.clear();
        var b;
        document.getElementsByClassName("slider")[0].defaultValue = 10;
        var val = parseInt(document.getElementsByClassName("slider")[0].value);
        console.log(val);
        var number = parseInt(document.getElementsByClassName("slider")[1].value);

        no_of_balls = number;

        for(var i = 0;i<no_of_balls ; i++)
        {

            x = Math.floor(Math.random()*(790-10+1)+10) ;
            y = Math.floor(Math.random()*(490-10+1)+10);
            color = Math.floor(Math.random()*(14-0+1)+0);
            dir = Math.floor(Math.random()*(7-0+1)+0);
            b = new Ball(x,y,color,dir);
            balls.push(b);
        }

        for(i = 0;i<no_of_balls;i++)
        {
            b = balls[i];

            switch( b.direction )
            {
                case "top": {
                    b.y -= val ;
                }break;
                case "bottom":{
                    b.y += val ;
                }break;
                case "left":{
                    b.x -= val;
                }break;
                case "right":{
                    b.x += val ;
                }break;
                case "top-left":{
                    b.y -= val;
                    b.x -= val;
                }break;
                case "top-right":{
                    b.y -= val;
                    b.x += val;
                }break;
                case "bottom-left":{
                    b.y+= val;
                    b.x-= val;
                }break;
                case "bottom-right":{
                    b.y += val;
                    b.x += val;
                }break;
            }

            collision(b);

            b.render();
        }
    }
    function collision(b)
    {
        if(b.direction === "top")
        {
            if(b.y <= 10)
                b.direction = "bottom";
        }
        else if(b.direction === "bottom")
        {
            if(b.y >= 490)
                b.direction = "top";
        }
        else if(b.direction === "left")
        {
            if(b.x <=10)
                b.direction = "right";
        }
        else if(b.direction === "right")
        {
            if(b.x >= 790)
                b.direction ="left";
        }
        else if(b.direction === "top-left")
        { if(b.x <= 10)
            b.direction = "top-right";
        else if(b.y <= 10)
            b.direction = "bottom-left";

        }
        else if(b.direction === "top-right")
        { if(b.x >= 790)
            b.direction = "top-left";
        else if(b.y <= 10)
            b.direction = "bottom-right";

        }
        else if(b.direction === "bottom-right")
        { if(b.x >= 790)
            b.direction = "bottom-left";
        else if(b.y >= 490)
            b.direction = "top-right";

        }
        else if(b.direction === "bottom-left")
        { if(b.x <= 10)
            b.direction = "bottom-right";
        else if(b.y >= 490)
            b.direction = "top-left";

        }

    }
}