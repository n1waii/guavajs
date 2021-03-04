export default function SpriteComponent(self) {
    return {
        costumes: [],
        state: 0,

        switchCostume: (i) => {
            console.assert(
                i < self.costumes.length-1 && i > 0,
                "Costume number out of range"
            );
            self.setImage(self.costumes[self.state]);
        }

        addCostume: (img) => {
            self.costumes.append(img);
        },

        nextCostume: () => {
            self.state = ((self.state + 1) > self.costumes.length-1) ? 0 : self.state + 1;
            self.switchCostume(state);
        },

        getCurrentCustome: () => {
            return self.costumes[self.state];
        },

        getCustomeState: () => {
            return self.state;
        }
    };
}