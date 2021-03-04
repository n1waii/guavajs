export default function ImageElementComponent(self) {
    return {
        image: "",
        imageTransparency: 0,
            
        setImage: (element) => {
            self.image = element;
        },
    };
}