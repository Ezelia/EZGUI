EZGUI 
=====
EZGUI is a gui system for PIXI and Phaser.
it's focused on PIXI 3 but support PIXI 2 to garantee seamless transition, and to remain compatible with Phaser 2.x

![Game GUI sample](http://ezgui.ezelia.com/img/ezgui-game-optimized2.gif) ![App GUI sample](http://ezgui.ezelia.com/img/ezgui-app-optimized2.gif) 


Note for Phaser 2.4.x users
===========================
if you use Phaser 2.4.x, please include phaser-compat-2.4.js file *after* phaser.js script (see examples/Phaser/phaser-2.4.html) 
if you load custom resources to be used in your GUI templates and you are loading them with phaser default loader, 
you'll need to add an event listener for onLoadComplete and pass EZGUI.Compatibility.fixCache (see examples/game/phaser-2.4.html line ~193)




Important 
=========
The code in this repository is still in developement, and some breaking changes may occure


Online components demos
======================= 
 * [simple window](http://ezgui.ezelia.com/examples/01-window/1-simple.html)
 * [window with children](http://ezgui.ezelia.com/examples/01-window/2-children.html)
 * [window with header](http://ezgui.ezelia.com/examples/01-window/3-header.html)
 * [window layout](http://ezgui.ezelia.com/examples/01-window/4-layout.html)
 * [window layout relative positionning](http://ezgui.ezelia.com/examples/01-window/6-layout-relative-positions.html)
 * [simple button](http://ezgui.ezelia.com/examples/02-button/1-simple.html)
 * [button with skin](http://ezgui.ezelia.com/examples/02-button/2-skin.html)
 * [checkbox](http://ezgui.ezelia.com/examples/03-checkbox/1-list.html)
 * [radio](http://ezgui.ezelia.com/examples/04-radio/1-list.html)
 * [slider](http://ezgui.ezelia.com/examples/05-slider/1-horizontal.html)
 * [Fonts](http://ezgui.ezelia.com/examples/06-fonts/01.html)
 * [Phaser complex](http://ezgui.ezelia.com/examples/Phaser/)
 * [Pixi complex](http://ezgui.ezelia.com/examples/Pixi/)

 * [Phaser Game screens](http://ezgui.ezelia.com/examples/game/phaser.html)
 * [Phaser 2.4 Game screens](http://ezgui.ezelia.com/examples/game/phaser-2.4.html)

 * [Pixi Game screens](http://ezgui.ezelia.com/examples/game/pixi.html)

 * [Phaser App screens](http://ezgui.ezelia.com/examples/app/phaser.html)
 * [Pixi App screens](http://ezgui.ezelia.com/examples/app/pixi.html)

Online Kits demos
=================
 * [Game Main screen Kit (Pixi)](http://ezgui.ezelia.com/examples/kits/MainScreen-Pixi.html)
 * [Game Main screen Kit (Phaser)](http://ezgui.ezelia.com/examples/kits/MainScreen-Phaser.html)
 

Documentation
=============
A work in progress [documentation](https://github.com/Ezelia/EZGUI/wiki) is available in [the wiki section](https://github.com/Ezelia/EZGUI/wiki)

There are also a lot of [commented examples](https://github.com/Ezelia/EZGUI/tree/master/examples) to get started


Features.
=========
 * Flexible configuration : EZGUI use a flexible JSON configuration format for theme an gui definitions
 * Themes : a default theme is provided but you can create your own custom theme.
 * Tweening 
 * Bitmap fonts
 * Extendable : you can easily create your own components
 

implemented components
======================
 * Window 
 * Layout 
 * Button
 * Label
 * Checkbox
 * Radio
 * Slider
 * List 
 * Input



TODO 
====
 * Enhance Phaser 2.4 compatibility
 * Two states button component
 * Tabs component
 * Scrollbar component
 * texts/texts alignements 
 * relative width/height 
 * Documentation for theme definition
 * Documentation for gui definition
 * GUI Designer :)



Known issues 
============
Input control : viewport do not follow the caret.

 


License
=======

```
The MIT License (MIT)
Copyright (c) 2015 Ezelia
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```