# rpi-rgb-led-matrix-web-api

# WARNING: STILL IN PROGRESS - NOT FULLY WORKING YET!

## Description

A HTTP-based API to run a LED-matrix with [rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix).

## Prerequisites

* one compatible RGB LED Matrix P3, for example [this one](https://www.waveshare.com/wiki/RGB-Matrix-P3-64x64)
* one [Raspberry PI supported by rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix#all-raspberry-pi-versions-supported)
* Rasbian installed and running flawless on the Raspberry PI ([see recommendations](https://github.com/hzeller/rpi-rgb-led-matrix#all-raspberry-pi-versions-supported))
* [rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix) build sucessfully and installed on the Raspberry PI
* `npm` installed on the host (your computer) and on Raspberry PI
* `Typescript` installed via npm (`npm install typescript`) on the host to transpile the code to JavaScript (you can do that on the RPI, but is slower)
* `NodeJS` installed (use provided [install_nodejs](./install_nodejs)) on the Raspberry PI to run the code
