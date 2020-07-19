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
    background(69,90,100)
    strokeWeight(1)
    A.draw()
    B.draw()
    C.draw()
    strokeWeight(0)
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
        speed = 100000
        this.changed(speedCheck)
        this.child()[1].innerHTML = 'Slow Down'
    }
    else{
        speed = 1
        this.changed(speedCheck)
        this.child()[1].innerHTML = 'Speed Up'
    }
}

function setup(){
    let canvas = createCanvas(900, 900)
    background(69,90,100) 
    canvas.parent('sierpinski')
    textSize(24)
    textFont('Segoe UI')

    A = new Point(padding, height - padding, diameter)
    B = new Point(width - padding, height - padding, diameter)
    C = new Point((width - padding * 2) / 2, sqrt(3) * padding, diameter)

    lastPoint = new Point(0, 0, smalldiameter)
    let r1 = random()
    let r2 = random()
    lastPoint.x = (1 - sqrt(r1)) * A.x + (sqrt(r1) * (1 - r2)) * B.x + (r2 * sqrt(r1)) * C.x
    lastPoint.y = (1 - sqrt(r1)) * A.y + (sqrt(r1) * (1 - r2)) * B.y + (r2 * sqrt(r1)) * C.y

    playButton = createButton('Play')
    playButton.parent('sierpinski')
    playButton.position(padding, padding)
    playButton.mousePressed(toggleSim)


    resetButton = createButton('Reset')
    resetButton.parent('sierpinski')
    resetButton.position(padding * 2 + playButton.width, padding)
    resetButton.mousePressed(reset)


    label = document.createElement('label')
    label.id = 'speed-label'
    document.getElementById('sierpinski').appendChild(label) 

    speedUp = createCheckbox('Speed Up', false)
    speedUp.parent('speed-label')
    speedUp.class('check-box')
    speedUp.id('speed-check')
    speedUp.changed(speedCheck)

    A.draw()
    B.draw()
    C.draw()
    strokeWeight(0)
}

function draw(){
        
    if(play){
        for(j = 0; j < speed;  j++){
            r = random(3)

            if(r <= 1){
                lastPoint = lastPoint.halfway(A, smalldiameter)
                lastPoint.draw()
            }
            else if(r <= 2){
                lastPoint = lastPoint.halfway(B, smalldiameter)
                lastPoint.draw()
            }
            else{
                lastPoint = lastPoint.halfway(C, smalldiameter)
                lastPoint.draw()
            }
            nbPoints++;
        }
    }

    fill(69,90,100)
    rect(padding/2, padding * 2.5, padding * 6, padding - 10)
    fill(255, 255, 255)
    text('Number of points : ' + nbPoints, padding / 2, padding * 3)
}

