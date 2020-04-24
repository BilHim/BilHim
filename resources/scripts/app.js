let config = {
    width: window.innerWidth,
    height: window.innerHeight,
    unit: 50,
    bgOpacity: 0.04,
    
    particleCount: 1000,
    particleSize: 1.5,
    particleSpeed: 2,
    particleRespawn: 0.25,
    particleOpacity: 0.75,
    
    noiseRatio: 300,
    iter: 0,
    iterSpeed: 0.001,

    mainText: 'Bilal Himite',
    mainFont: 'Gelasio',
    mainFontScale: 1,

    secondaryText: 'Engineering Student • Developer • Web Designer',
    secondaryFont: 'Gelasio',
    secondaryFontScale: 0.285,

    textSize: 125,
    textGap: 0
};

function resize() {
    config.width = window.innerWidth;
    config.height = window.innerHeight;

    config.canvas.width = config.width;
    config.canvas.height = config.height;

    config.textSize = config.width / 10;

    config.mainFontSize = config.mainFontScale * config.textSize;
    config.secondaryFontSize = config.secondaryFontScale * config.textSize;

    config.textGap = (config.mainFontSize + config.secondaryFontSize) / 2;

    config.ctx.textAlign = 'center';
    config.ctx.textBaseline = 'middle';

    config.ctx.fillStyle = 'rgba(0,0,0)';
    config.ctx.fillRect(0, 0, config.width, config.height);
}

function vectorField() {
    config.ctx.strokeStyle = 'rgb(255,0,0)';
    for (let x = 0; x < config.width; x += config.unit) {
        for (let y = 0; y < config.height; y += config.unit) {
            let angle = noise.simplex3(x/config.noiseRatio, y/config.noiseRatio, config.iter);
            config.ctx.beginPath();
            config.ctx.moveTo(x, y);
            config.ctx.lineTo(x+config.unit/2*Math.cos(angle), y+config.unit/2*Math.sin(angle));
            config.ctx.stroke();
        }   
    }
}

var app = function() {
    let requestAnimFrame = window.requestAnimationFrame;

    config.canvas = document.getElementById('canvas');

    config.canvas.width = config.width;
    config.canvas.height = config.height;

    config.ctx = config.canvas.getContext('2d');

    // Create an array of particles
    config.particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        config.particles.push(new Particle());
    }

    // Size text properly
    resize();

    // Paint a black bg
    config.ctx.fillStyle = 'rgba(0,0,0)';
    config.ctx.fillRect(0, 0, config.width, config.height);

    config.ctx.textAlign = 'center';
    config.ctx.textBaseline = 'middle';

    // Genenrate a random start
    let start = Math.random()*10000;
    config.iter = start;

    // Draw loop
    function draw() {
        // Clear background
        config.ctx.fillStyle = `rgba(0,0,0,${config.bgOpacity})`;
        config.ctx.fillRect(0, 0, config.width, config.height);

        // Show vector field
        //vectorField();

        for (let particle of config.particles) {
            particle.update();
            particle.draw();
        }

        // Draw text on screen
        if (config.iter > start + 0.075){
            config.ctx.fillStyle = `rgba(255,255,255, 0.2)`;
        
            config.ctx.font = `bold ${config.mainFontSize}px/1 '${config.mainFont}'`;
            config.ctx.fillText(config.mainText, config.width/2, config.height/2 - config.textGap/3);
            
            config.ctx.font = `${config.secondaryFontSize}px/1 '${config.secondaryFont}'`;
            config.ctx.fillText(config.secondaryText, config.width/2, config.height/2 + config.textGap*2/3);    
        }
        
        // Increment noise z-axis
        config.iter += config.iterSpeed;

        // Request another frame
        requestAnimFrame(draw);
    }

    function mouseMove() {
        config.iter += 4*config.iterSpeed;
    }

    function mouseDown() {
        config.iter += Math.random()*10000;
    }

    config.canvas.onmousemove = mouseMove;
    config.canvas.onmousedown = mouseDown;

    requestAnimFrame(draw);

};

window.onload = app;
window.onresize = resize;