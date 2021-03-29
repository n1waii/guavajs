function Node(pos, data) {
    return {
        pos,
        data
    }
}

class Quad {
    constructor(tL, bR, ) {
        this.topLeft = tL || [0, 0];
        this.bottomRight = bR || [0, 0];
        this.node = null;
        this.trees = {
            topLeftTree: null,
            topRightTree: null,
            bottomLeftTree: null,
            bottomRightTree: null
        }
    }

    insert(node) {
        // edge cases
        console.assert(node !== null, "Argument 1 is null expected node object");

        if (!this.inBoundary(node.pos)) return console.log("not in boundary");

        if (Math.abs(this.topLeft[0] - this.bottomRight[0]) <= 1 
        && Math.abs(this.topLeft[1] - this.bottomRight[1]) <= 1) { 
            if (this.node === null) { 
                this.node = node; 
                console.log("insereted");
            }
            return [this.topLeft, this.bottomRight]; 
        } 

        // subdivide further
        // left half
        if ((this.topLeft[0] + this.bottomRight[0] / 2) >= node.pos[0]) {  
            console.log('in left')
            // top left
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= node.pos[1]) { 
                console.log('in top left')
                if (this.trees.topLeftTree === null) {
                    this.trees.topLeftTree = new Quad( 
                        [this.topLeft[0], this.topLeft[1]],
                        [
                            (this.topLeft[0] + this.bottomRight[0]) / 2, 
                            (this.topLeft[1] + this.bottomRight[1]) / 2
                        ]
                    ); 
                   this.trees.topLeftTree.insert(node); 
                }
            // bottom left  
            } else {
                if (this.trees.bottomLeftTree === null) {
                    this.trees.bottomLeftTree = new Quad( 
                        [this.topLeft[0], (this.topLeft[1]+this.bottomRight[1])/2], 
                        [
                            (this.topLeft[0] + this.bottomRight[0]) / 2, 
                            this.bottomRight[1]
                        ]
                    ); 
                   this.trees.bottomLeftTree.insert(node); 
                }
            }
        // right half
        } else {
            // top right
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= node.pos[1]) { 
                if (this.trees.topRightTree === null) {
                    this.trees.topRightTree = new Quad( 
                        [(this.topLeft[0]+this.bottomRight[0])/2, this.topLeft[1]], 
                        [
                            this.bottomRight[0], 
                            (this.topLeft[1] + this.bottomRight[1]) / 2
                        ]
                    ); 
                   this.trees.topRightTree.insert(node); 
                }
            // bottom right  
            } else {
                if (this.trees.bottomRightTree === null) {
                    this.trees.bottomRightTree = new Quad( 
                        [(this.topLeft[0]+this.bottomRight[0])/2, (this.topLeft[1]+this.bottomRight[1])/2], 
                        [
                            this.bottomRight[0], 
                            this.bottomRight[1]
                        ]
                    ); 
                   this.trees.bottomRightTree.insert(node); 
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
                if (this.trees.topLeftTree === null) return null;
                return this.trees.topLeftTree.search(p); 
            } 
            // bottom left 
            else { 
                if (this.trees.bottomLeftTree === null) return null; 
                return this.trees.bottomLeftTree.search(p); 
            } 
        } 
        else { 
            // top right 
            if ((this.topLeft[1] + this.bottomRight[1]) / 2 >= p[1]) { 
                if (this.trees.topRightTree === null) return null; 
                return this.trees.topRightTree.search(p); 
            }
            // bottom right 
            else { 
                if (this.trees.bottomRightTree === null) return null; 
                return this.trees.bottomRightTree.search(p); 
            }
        } 
    }

    clear() {
        for (const tree of Object.values(this.trees)) {
            if (tree !== null) tree.clear();
        }
    
        this.node = null;
    }

    getNodesFromPoint(p, list) {
        list = list || [];
        const node = this.getNodeFromPoint(p);
        
        if (node !== null) list.push(node);

        for (const tree of Object.values(this.trees)) {
            if (tree !== null) {
                list.concat(tree.getNodesFromPoint([tree.topLeft, tree.bottomRight]));
            }
        }

        return list;
    }

    inBoundary(p) {
        console.log(p)
        console.log(this.topLeft, this.bottomRight)
        return (
            p[0] >= this.topLeft[0] && 
            p[0] <= this.bottomRight[0] && 
            p[1] >= this.topLeft[1] && 
            p[1] <= this.bottomRight[1]
        );
    }
};

export {
    Quad, Node
}