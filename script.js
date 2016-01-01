document.body.onload = function(e) {

    var target = document.getElementsByClassName('ball')[0];
    var ground = document.getElementsByClassName('arena')[0];
    var highScoreHolder = document.getElementsByClassName('highScore')[0];
    var currentScoreHolder = document.getElementsByClassName('currentScore')[0];
    var W = ground.style.width = window.innerWidth;
    var H = ground.style.height = window.innerHeight;
    var gravity = initialGravity = -230;
    var increaseGravity = -20;
    var power = 50;
    var fps = 30;
    var scaleX = 100;
    var scaleY = 100;
    var fX = 0.95;
    var eY = 0.6;
    var currentScore = 0;
    var highScore = typeof localStorage['highScore'] === "undefined" ? 0 : localStorage['highScore'];

    var updateScores = function() {
        if(highScore < currentScore) {
            highScore = currentScore;
            localStorage['highScore'] = highScore;
        }
        highScoreHolder.innerHTML = highScore;
        currentScoreHolder.innerHTML = currentScore;
    }

    var resetScore = function() {
        currentScore = 0;
        gravity = initialGravity;
        updateScores();
    }

    var ball = {
        velX: 0,
        velY: 0,
        rot: 0,
        deg: 0,
        width: 100,
        height: 100,

        initPos: function() {
            this.posX = W/2 - this.width/2;
            this.posY = H/2 - this.height/2;
            updateScores();
        },

        setPos: function() {
            this.posX = this.posX + (this.velX*fps/scaleX);
            this.posY = this.posY + (this.velY*fps/scaleY);
            this.deg = this.deg + (this.rot*fps/scaleX);
            if(this.posX <0) {
                this.posX = 0;
            }
            else if(this.posX + this.width >W) {
                this.posX = W - this.width;
            }
            if(this.posY <0) {
                this.posY = 0;
                resetScore();
            }
            else if(this.posY + this.height >H) {
                this.posY = H - this.height;
            }
            target.style.left = this.posX;
            target.style.bottom = this.posY;
            target.style.transform = 'rotate('+this.deg+'rad)';
        },

        setVel: function() {
            if(this.posX <= 0 || this.posX + this.width >=W) {
                this.velX = -1 * this.velX;
                this.rot = -1 * this.rot;
            }
            if(this.posY <=0 || this.posY + this.height >=H) {
                this.velY = -1 * eY*this.velY;
            }
            this.velX = fX*this.velX;
            this.rot = fX*this.rot;
            this.velY = this.velY + (gravity/scaleY);
        }

    };

    target.addEventListener('click', function(e) {
        ball.velY += power;
        var dist = (ball.posX + ball.width/2) - e.clientX;
        var powerX = power * (dist*2/ball.width);
        ball.velX += powerX;
        ball.velY += Math.sqrt(power*power - powerX*powerX);
        ball.rot += powerX/power;
        gravity += increaseGravity;
        currentScore++;
        updateScores();
    });

    ball.initPos();

    setInterval(function(){
        ball.setVel();
        ball.setPos();
    },1000/fps);

}

window.addEventListener('resize', function () {
    "use strict";
    window.location.reload();
});
