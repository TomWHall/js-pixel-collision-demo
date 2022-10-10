# JavaScript pixel collision test demo

A demo of pixel-based sprite collision detection in JavaScript, using bitwise operations.
Includes a MaskBuilder class to auto build a mask from a transparent PNG sprite image.

![Screenshot](https://tomwhall.github.io/js-pixel-collision-demo/js-pixel-collision-demo.png)

[Online demo](https://tomwhall.github.io/js-pixel-collision-demo/)

## Build

* If not installed, install [Node.js](https://nodejs.org/)
* Install NPM packages:
```
npm install
```
* To build in release mode:
```
release.cmd
```
* To build in dev mode with file watch:
```
dev.cmd
```

Files are output to /build

## Overview of modules and interfaces

### MaskBuilder module

* Accepts an image file, assumed to be a PNG with transparency
* Draws the image to a temporary canvas element and then reads back the pixel data including the canvas background color
* Builds a Uint32Array typed array where each element is a row in the mask
* Maximum sprite width is 32 pixels due to the above, but you could extend this by using multiple mask "columns" per sprite

### MaskTester module

* Checks for pixel overlap between 2 sprite instances, each with a mask property 
* If bounding boxes don't overlap, returns false
* Iterates rows which overlap vertically 
* If sprites partially overlap horizontally, performs left or right bit shifts to align masks
* Uses logical AND to test for pixel collisions between masks

### Sprite interface

* A simple interface for animation purposes

### Caveats

This is aimed at retro-style platform games where the sprites are relatively small and slow moving, but precise pixel hits are important (think classic games like Jet Set Willy).
You probably wouldn't use this approach with lots of large, fast moving sprites - you'd use more coarse checks on bounding rects, circles etc. 

### Trivia

The 2 sprites used in the demo are the player and devil characters from my "Tom's Halls" game written around 2007.
