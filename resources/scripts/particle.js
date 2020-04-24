class Particle {
    constructor() {
        this.x = Math.random()*config.width;
        this.y = Math.random()*config.height;
    }

    update() {
        if (!(this.x > 0 && this.x < config.width && this.y > 0 && this.y < config.height)) {
            let chance = Math.random();
            // Not all particles are created the same
            if (chance >= config.particleRespawn) {
                // Some particles just go to the other side
                if (this.x < 0)  this.x = config.width-1;
                else if (this.x >= config.width) this.x = 1;

                if (this.y < 0) this.y = config.height-1;
                else if (this.y >= config.height) this.y = 1; 
            } else {
                // And Others respawn randomly
                this.x = config.width*Math.random();
                this.y = config.height*Math.random();
            }
            return;    
        }

        let angle = 2*Math.PI*noise.simplex3(this.x/config.noiseRatio, this.y/config.noiseRatio, config.iter);
        this.x += config.particleSpeed * Math.cos(angle);
        this.y += config.particleSpeed * Math.sin(angle);

        // In order not to recalculate noise in draw
        let r = 127.5*(1+Math.cos(angle));
        let g = 127.5*(1+Math.cos(angle-2/3*Math.PI));
        let b = 127.5*(1+Math.cos(angle-4/3*Math.PI));
        
        config.ctx.fillStyle = `rgb(${r}, ${g}, ${b}, ${config.particleOpacity})`;
    }

    draw() {
        //config.ctx.fillStyle = 'rgb(255,255,255)';
        config.ctx.fillRect(this.x, this.y, config.particleSize, config.particleSize);
    }
}