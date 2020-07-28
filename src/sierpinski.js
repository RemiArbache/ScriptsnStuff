let sierpinskiSketch = function(p){

    let A, B, C
    let padding = 50
    let diameter = 10
    let smalldiameter = 2
    let r
    let nbPoints = 0
    let resetButton
    let playButton
    let play = false
    let lastPoint 
    let speed = 10
    
    function reset(){
        nbPoints = 0
        p.background(69,90,100)
        p.strokeWeight(1)
        A.draw(p)
        B.draw(p)
        C.draw(p)
        
        p.strokeWeight(0)
        let r1 = p.random()
        let r2 = p.random()
        lastPoint.x = (1 - p.sqrt(r1)) * A.x + (p.sqrt(r1) * (1 - r2)) * B.x + (r2 * p.sqrt(r1)) * C.x
        lastPoint.y = (1 - p.sqrt(r1)) * A.y + (p.sqrt(r1) * (1 - r2)) * B.y + (r2 * p.sqrt(r1)) * C.y
        lastPoint.draw(p)
    }
    
    function toggleSim(){
        if(play){
            playButton.html("Play")
        }
        else{
            playButton.html("Pause")
        }
        play = !play
    }
    
    function speedCheck(){
        if(this.checked()){
            speed = 1000
            this.child()[1].innerHTML = 'Slow Down'
        }
        else{
            speed = 1
            this.child()[1].innerHTML = 'Speed Up'
        }
    }
    
    p.setup = function() {
        let canvas = p.createCanvas(900, 900)
        canvas.parent('sierpinski')
        p.textSize(24)
        p.textFont('Segoe UI')
        
        A = new Point(padding, p.height - padding, diameter)
        B = new Point(p.width - padding, p.height - padding, diameter)
        C = new Point(p.width / 2, p.height - padding - ( (p.sqrt(3)/2) * (p.width - 2 * padding))  , diameter)
        
        playButton = p.createButton('Play')
        playButton.parent('sierpinski')
        playButton.position(padding, padding)
        playButton.mousePressed(toggleSim)
        
        resetButton = p.createButton('Reset')
        resetButton.parent('sierpinski')
        resetButton.position(padding * 2 + playButton.width, padding)
        resetButton.mousePressed(reset)
        
        label = document.createElement('label')
        label.id = 'speed-label'
        document.getElementById('sierpinski').appendChild(label) 
        
        speedUp = p.createCheckbox('Speed Up', false)
        speedUp.parent('speed-label')
        speedUp.class('check-box')
        speedUp.id('speed-check')
        speedUp.changed(speedCheck)
        
        lastPoint = new Point(0, 0, smalldiameter)
        reset()
    }
    
    p.draw = function draw(){
        
        if(play){
            for(j = 0; j < speed;  j++){
                r = p.random(3)
                
                if(r <= 1){
                    lastPoint = lastPoint.halfway(A, smalldiameter)
                    lastPoint.draw(p)
                }
                else if(r <= 2){
                    lastPoint = lastPoint.halfway(B, smalldiameter)
                    lastPoint.draw(p)
                }
                else{
                    lastPoint = lastPoint.halfway(C, smalldiameter)
                    lastPoint.draw(p)
                }
                nbPoints++;
            }
        }
        
        p.fill(69,90,100)
        p.rect(padding/2, padding * 2.5, padding * 6, padding - 10)
        p.fill(255, 255, 255)
        p.text('Number of points : ' + nbPoints, padding / 2, padding * 3)
    }   
}

let sketch1 = new p5(sierpinskiSketch)