*(Note. this changelog do not contain all versions information, will be updated)* 

0.4.2 beta
==========
 * Fixed Pixi v4.6+ compatibility issues
 * Droping Pixi v2 compatibility
 * added tsconfig.json file

0.3.3 beta
==========
 * using official PixiJS Plugin interface to register EZGUI and get reference to the main renderer .   
 * fixed Pixi v4 compatibility issues with WebGL renderer.

0.3.2 beta
==========
 * phaser 2.4.9 to 2.6.2 compatibility fixes 
 * pixi 4.0.0 compatibility fixes    
 


0.3.11 beta
==========
 * partial compatibility fix for Phaser 2.4.4 
   Canvas renderer is OK
   WebGL have strange behaviour
   
 

0.3.1 beta
==========
 * small fixes
 * fix Tabs component issue with phaser (issue #27)


0.3.0 beta
==========

New features
------------
 * experimental component erase/rebuild through erase() / rebuild() calls : 
   this will allow for example to modify size, change component skin, ...etc at runtime
 * Added Tabs controls (custom skin is still missing tabs will use button skin for now)
 

Fixes
-----
 * small fixes to relative positionning and size to take parent Window paddings in consideration. 


0.2.1 beta
==========

Fixes
-----
 * programmatically addChild/addChildAt for List component (components inheriting Layout class)
 * Input Control issue on mobiles fixed






0.2.0 beta
==========
New features
------------
 * support of percentage values in width/height and position.x/y for components childrens


Fixes
-----
 * Input Control issue while setting text programmatically (https://github.com/Ezelia/EZGUI/issues/20)



__________________________________________________

0.9.1 beta
==========
Fixes
-----
 * Fix - Phaser 2.4 compatibility



__________________________________________________

0.9.0 beta
==========
New features
------------
 * Input control
 * Main Screen kit



0.9.0 beta
==========
New features
------------
 * Input control