function isColliding(element0, element1) {
    // aabb check
    console.log(element0, element1);
    if (element0.position.x < element1.position.x + element1.width &&
    element0.position.x + element0.width > element1.position.x &&
    element0.position.y < element1.position.y + element1.height &&
    element0.position.y + element0.height > element1.position.y) {
        return true;
    }

    return false;
}

export {
    isColliding
}