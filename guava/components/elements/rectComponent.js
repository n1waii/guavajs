export default function RectComponent(self) {
    return {
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        anchorPoint: [0, 0],

        backgroundColor: "white",
        backgroundTransparency: 0,

        border: "none",
        borderSize: 1,
        borderColor: "black",
        borderRadius: 0,

        setProperty: (prop, value) => {
            console.assert(this[prop] !== undefined, "Property does not exist for element");
            self[prop] = value;
            return self;
        },

        setBorder: (b, bSize, bColor, bRadius) => {
            self.border = b || self.border;
            self.borderSize = bSize || self.borderSize;
            self.borderColor = bColor || self.borderColor;
            self.borderRadius = bRadius || self.borderRadius;
            return self;
        },
        
        setPosition: (newX, newY) => {
            self.x = newX;
            self.y = newY;
            console.log("set pos");
            return self;
        },

        setSize: (newWidth, newHeight) => {
            self.width = newWidth;
            self.height = newHeight;
            return self;
        },

        setWidth: (newWidth) => {
            self.width = newWidth;
            return self;
        },

        setHeight: (newHeight) => {
            self.height = newHeight;
            return self;
        },

        render: (scene) => {
            //let scene = self.world.getScene();
            scene.context.fillStyle = self.backgroundColor;
            scene.context.strokeStyle = self.borderColor;
            scene.context.fillRect(self.x, self.y, self.width, self.height);
        },
    };
}