import Node from "./quadTreeNode.js";

export default class Quad {
    constructor(tL, bR, node) {
        this.topLeft = tL || [0, 0];
        this.bottomRight = bR || [0, 0];
        this.node = node || null;
        this.topLeftTree = null;
        this.topRightTree = null;
        this.bottomLeftTree = null;
        this.bottomRightTree = null;
    }

    insert(node) {
        // edge cases
        console.assert(node !== null, "Argument 1 is null expected node object");

        if (!this.inBoundary(node.pos)) return;

        if (Math.abs(this.topLeft[0] - this.bottomRight[0]) <= 1 
        && Math.abs(this.topLeft[1] - this.bottomRight[1]) <= 1) { 
            if (this.node === null) { 
                this.node = node; 
            }
            return; 
        } 

        // subdivide further
        // left half
        if ((this.topLeft[0] + this.bottomRight[0] / 2) >= node.pos[0]) {  
            // top left
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= node.pos[1]) { 
                if (this.topLeftTree === null) {
                    this.topLeftTree = new Quad( 
                        [this.topLeft[0], this.topLeft[1]), 
                        [
                            (this.topLeft[0] + this.bottomRight[0]) / 2, 
                            (this.topLeft[1] + this.bottomRight[1]) / 2
                        ]
                    ); 
                   this.topLeftTree.insert(node); 
                }
            // bottom left  
            } else {
                if (this.bottomLeftTree === null) {
                    this.bottomLeftTree = new Quad( 
                        [this.topLeft[0], (this.topLeft[1]+this.bottomRight[1])/2), 
                        [
                            (this.topLeft[0] + this.bottomRight[0]) / 2, 
                            this.bottomRight[1]
                        ]
                    ); 
                   this.bottomLeftTree.insert(node); 
                }
            }
        // right half
        } else {
            // top right
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= node.pos[1]) { 
                if (this.topRightTree === null) {
                    this.topRightTree = new Quad( 
                        [(this.topLeft[0]+this.bottomRight[0])/2, this.topLeft[1]), 
                        [
                            this.bottomRight[0], 
                            (this.topLeft[1] + this.bottomRight[1]) / 2
                        ]
                    ); 
                   this.topRightTree.insert(node); 
                }
            // bottom right  
            } else {
                if (this.bottomRightTree === null) {
                    this.bottomRightTree = new Quad( 
                        [this.topLeft[0], (this.topLeft[1]+this.bottomRight[1])/2), 
                        [
                            (this.topLeft[0] + this.bottomRight[0]) / 2, 
                            this.bottomRight[1]
                        ]
                    ); 
                   this.bottomRightTree.insert(node); 
                }
            }
        }
    }

    search(p) {
        if (!this.inBoundary(p)) return null;
        if (this.node !== null) return this.node;

        if ((this.topLeft[0] + this.bottomRight[0]) / 2 >= p[0]) { 
            // top left
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= p[1]) { 
                if (this.topLeftTree === null) return null;
                return this.topLeftTree.search(p); 
            } 
            // bottom left 
            else { 
                if (this.bottomLeftTree === null) return null; 
                return this.bottomLeftTree.search(p); 
            } 
        } 
        else { 
            // top right 
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= p[1]) { 
                if (this.topRightTree === null) return null; 
                return this.topRightTree.search(p); 
            } 
            // bottom right 
            else { 
                if (this.bottomRightTree === null) return null; 
                return this.bottomRightTree.search(p); 
            } 
        } 
    }

    inBoundary(p) {
        return (
            p[0] >= topLeft[0] && 
            p[0] <= bottomRight[0] && 
            p[1] >= topLeft[1] && 
            p[1] <= bottomRight[1]
        );
    }
}