EZGUI 
=====
EZGUI is a gui system for PIXI and Phaser.
it's focused on PIXI 3 but support PIXI 2 to garantee seamless transition, and to remain compatible with Phaser 2.x

![Game GUI sample](http://ezgui.ezelia.com/img/ezgui-game-optimized2.gif) ![App GUI sample](http://ezgui.ezelia.com/img/ezgui-app-optimized2.gif) 


Important 
=========
The code in this repository is still in developement, and some breaking changes may occure


Features.
--------
 * Flexible configuration : EZGUI use a flexible JSON configuration format for theme an gui definitions
 * Themes : a default theme is provided but you can create your own custom theme.
 * Tweening 
 * Bitmap fonts
 * Extendable : you can easily create your own components
 

implemented components
----------------------
 * Window 
 * Layout 
 * Button
 * Label
 * Checkbox
 * Radio
 * Slider
 * List 



TODO 
----
 * Two states button component
 * Tabs component
 * Scrollbar component
 * texts/texts alignements 
 * relative width/height 
 * Documentation for theme definition
 * Documentation for gui definition
 * GUI Designer :)



Known issues 
------------
Bitmap font tint don't work in some PIXI v2 versions and Phaser.

 


License
-------

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