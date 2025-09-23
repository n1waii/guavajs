
# Guava.js 2D Game Engine

**Guava.js** is a lightweight, extensible 2D game engine for JavaScript. It provides a simple API for creating interactive games and simulations with support for object management, collision detection, input handling, and event-driven programming.

---

## Table of Contents
1. [Purpose](#purpose)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Overview](#api-overview)
    - [World](#world)
    - [Object2D](#object2d)
    - [InputService](#inputservice)
    - [Events](#events)
6. [Example](#example)

---

## Purpose

Guava.js is designed to help developers rapidly prototype and build 2D games or interactive applications in the browser. Its modular structure and event-driven architecture make it easy to manage game objects, handle user input, and respond to collisions.

## Features

- **World management**: Create and manage a 2D world with customizable dimensions.
- **Object system**: Add, remove, and update 2D objects with position, size, velocity, and custom properties.
- **Collision detection**: Built-in system for detecting collisions between objects.
- **Input handling**: Simple keyboard and mouse/touch input services.
- **Event system**: Use signals/events to react to input, collisions, and custom triggers.
- **Extensible**: Easily extend objects and add custom behavior.


Download or clone the repository, then include `guava.js` in your HTML:
```html
<script src="guava.js"></script>
```

## Usage

1. **Create a World**: Instantiate a new world with a given width and height.
2. **Create Objects**: Add 2D objects to the world (rectangles, circles, or custom shapes).
3. **Handle Input**: Use `InputService` to listen for keyboard or mouse/touch events.
4. **Respond to Events**: Connect to object or input events for custom game logic.

## API Overview

### World
The `World` class manages all objects and handles the main game loop.
```js
const world = new World(width, height);
```
- **addObject(obj: Object2D): void** — Adds an object to the world.
- **removeObject(obj: Object2D): void** — Removes an object from the world.
- **start(): void** — Starts the main update and render loop.
- **stop(): void** — Stops the game loop.

### Object2D
Base class for all 2D objects in the world.
```js
const obj = new Object2D({
  x: 100,
  y: 200,
  width: 50,
  height: 50,
  color: 'red'
});
```
- **x, y** — Position of the object.
- **width, height** — Size of the object.
- **velocityX, velocityY** — (Optional) Velocity for movement.
- **onTouched** — Event triggered when this object collides with another.
- **update(dt)** — Override to define custom per-frame logic.

### InputService
Global service for handling user input.
```js
InputService.onInput.Connect((input) => { ... });
InputService.onInputEnded.Connect((input) => { ... });
```
- **onInput** — Event fired when a key or button is pressed.
- **onInputEnded** — Event fired when a key or button is released.

#### Input Event Object
- **input.key** — The key pressed (e.g., `'a'`, `'ArrowLeft'`).
- **input.type** — Type of input (`'keyboard'`, `'mouse'`, `'touch'`).

### Events
Guava.js uses an event system based on signals:
- **onInput**: Fires when input is detected (keyboard, mouse, or touch).
- **onInputEnded**: Fires when input is released.
- **onTouched**: Fires when an object collides with another.

Connect to events using `.Connect(callback)`:
```js
object.onTouched.Connect((otherObject) => {
  // Handle collision
});
```

## Example

```js
// 1. Create a world
const world = new World(800, 600);

// 2. Create a player object
const player = new Object2D({
  x: 400, y: 550, width: 100, height: 20, color: 'blue'
});

// 3. Add the player to the world
world.addObject(player);

// 4. Handle keyboard input to move the player
InputService.onInput.Connect((input) => {
  if (input.key === 'ArrowLeft') player.velocityX = -300;
  if (input.key === 'ArrowRight') player.velocityX = 300;
});
InputService.onInputEnded.Connect((input) => {
  if (input.key === 'ArrowLeft' || input.key === 'ArrowRight') player.velocityX = 0;
});

// 5. Respond to collisions
player.onTouched.Connect((other) => {
  console.log('Player touched:', other);
});


---
