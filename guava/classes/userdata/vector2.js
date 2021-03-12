function lerp(a, b, x) {
    return a + (b - a) * x;
}

export default class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    lerp(vector2, a) {
        this.x = lerp(this.x, this.vector2.x, a);
        this.y = lerp(this.y, this.vector2.y, a);
    }

    add(vector2) {
        this.x += vector2.x;
        this.y += vector2.y;
        return this;
    }

    sub(vector2) {
        temp = new Vector2(vector2.x, vector2.y);
        temp.x *= -1; 
        temp.y *= -1;
        return this.add(temp);
    }

    getMagnitude(vector2) {
        return Math.abs(Math.sqrt(vector2.x**2 + vector2.y**2));
    }
}