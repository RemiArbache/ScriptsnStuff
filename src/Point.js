class Point{
    constructor(x, y, d){
        this.x = x;
        this.y = y;
        this.diameter = d;

    }

    draw(p){
        p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    halfway(pointB, diameter){
        return new Point((this.x + pointB.x)/2, (this.y + pointB.y)/2, diameter);
    }
}