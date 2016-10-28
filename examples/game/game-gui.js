var mainScreenJSON = {
	id: 'mainScreen',
	component: 'Window',	
	padding: 4,
	position: { x: 0, y: 0 },
	width: 600,
	height: 500,
	layout: [1, 4],
	children: [
        {
            id: 'label1',
            text: 'My Awesome Game',
            font: {
                size: '50px',
                family: 'Skranji',
                color: '#8f8'
            },
            component: 'Label',
            position: 'center',
            width: 600,
            height: 80
        },
		{
		  id: 'playBtn',
		  text: 'Play',
		  component: 'Button',
		  position: 'center',
		  
		  width: 190,
		  height: 80
		},
		{
		  id: 'optionsBtn',
		  text: 'Options',
		  component: 'Button',
		  position: 'center',
		  width: 190,
		  height: 80
		}		
	]
}

var avatarSelectScreenJSON = {
	id: 'avatarSelectScreen',
	component: 'Window',    
	padding: 4,
	position: { x: 0, y: 0 },
	width: 600,
	height: 500,

	layout: [1, 3],
	children: [
        {
        	text: 'Click an avatar to select',
        	component: 'Label',
        	position: 'center',
        	font: {
        	    size: '35px',
        	    family: 'Skranji',
        	    color: 'white'
        	},
        	width: 300,
        	height: 80
        },
        {
        id: 'avatarSelectScreen',
        component: 'List',    
        padding: 4,
        position: 'center',
        width: 500,
        height: 200,
        layout: [3, 1],
        children: [
		    { id: 'avatar1', component: 'Radio', group: 'avatarRadio', position: 'center', width: 128, height: 128, image: '../../assets/img/bomb1.png', checkmark: '../../assets/img/bomb1-selected.png', checked: true },
		    { id: 'avatar2', component: 'Radio', group: 'avatarRadio', position: 'center', width: 128, height: 128, image: '../../assets/img/bomb2.png', checkmark: '../../assets/img/bomb2-selected.png' },
		    { id: 'avatar3', component: 'Radio', group: 'avatarRadio', position: 'center', width: 128, height: 128, image: '../../assets/img/bomb3.png', checkmark: '../../assets/img/bomb3-selected.png' },
        ]
        },
		{
		    id: 'avatarSelectBtn',
		    text: 'OK',
		    component: 'Button',
		    position: 'center',
		    width: 100,
		    height: 60
		}
    ]
    /*
	layout: [5, 4],
	children: [
		null, null,
		{
		    text: 'Select an avatar',
		    component: 'Label',
		    position: 'center',
		    font: {
		        color: 'white'
		    },
		    width: 300,
		    height: 80
		},
        null, null,
		
		null,
		{ image: '../../assets/img/bomb1.png', position: 'center', width: 128, height: 128 },
		{ image: '../../assets/img/bomb2.png', position: 'center', width: 128, height: 128 },
		{ image: '../../assets/img/bomb3.png', position: 'center', width: 128, height: 128 },
		null,

		null,
		{ id: 'avatar1', component: 'Radio', group: 'avatarRadio', position: 'center', width: 60, height: 60, checked:true },
		{ id: 'avatar2', component: 'Radio', group: 'avatarRadio', position: 'center', width: 60, height: 60 },
		{ id: 'avatar3', component: 'Radio', group: 'avatarRadio', position: 'center', width: 60, height: 60 },
		null,
		
		null, null,
		
		{
		  id: 'avatarSelectBtn',
		  text: 'Select',
		  component: 'Button',
		  position: 'center',
		  width: 190,
		  height: 80
		},
	]*/
}


var levelSelectScreenJSON = {
	id: 'levelSelectScreen',
	component: 'Window',
	padding: 4,
	position: { x: 0, y: 0 },
	width: 600,
	height: 550,


	layout: [1, 1],
	children: [
	{
		id: 'levelsList',
		component: 'List',
		dragX:false,
		padding: 3,
		position: {x:0, y:0},
		width: 590,
		height: 450,
		layout: [3, 2],
		children: [
			{ id: 'lvl1', text: '1', userData: 'level 1', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl2', text: '2', userData: 'level 2', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl3', text: '3', userData: 'level 3', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl4', text: '4', userData: 'level 4', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl5', text: '5', userData: 'level 5', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl6', text: '6', userData: 'level 6', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl7', text: '7', userData: 'level 7', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl8', text: '8', userData: 'level 8', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl9', text: '9', userData: 'level 9', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl10', text: '10', userData: 'level 10', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },

			{ id: 'lvl11', text: '11', userData: 'level 11', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl12', text: '12', userData: 'level 12', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl13', text: '13', userData: 'level 13', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl14', text: '14', userData: 'level 14', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl15', text: '15', userData: 'level 15', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl16', text: '16', userData: 'level 16', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl17', text: '17', userData: 'level 17', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl18', text: '18', userData: 'level 18', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },
			{ id: 'lvl19', text: '19', userData: 'level 19', component: 'Button', position: 'center', width: 100, height: 100, skin: 'levelBtn' },

		]
	}
	]
}


var fakeGameScreenJSON = {
	id: 'fakeGameScreen',
	component: 'Window',	
	padding: 4,
	position: { x: 0, y: 0 },
	width: 600,
	height: 500,


	layout: [3, 3],
	children: [
        null,
		{
		    id: 'gameLabel',
		    text: 'Label',
		    component: 'Label',
		    position: 'center',
		    font : {
                color:'white'
		    },
		    width: 200,
		    height: 80
		},
        null,
		{
		  id: 'gameBtn1',
		  text: 'Show dialog',
		  component: 'Button',
		  position: 'center',
		  width: 150,
		  height: 60
		},
        null,
		{
		  id: 'gameBtn2',
		  text: 'Show end level',
		  component: 'Button',
		  position: 'center',
		  width: 150,
		  height: 60
		},
        null,
		{
		    id: 'gameBtn3',
		    text: 'Back to menu',
		    component: 'Button',
		    position: 'center',
		    width: 150,
		    height: 60
		},
        null
	]
}


var dialog1JSON = {
	id: 'dialog1',
	component: 'Window',
	image: '../../assets/img/panel-650x400.png',

	
	padding: 4,
	position: { x: 0, y: 0 },
	width: 400,
	height: 300,
	children: [
		{
		  id: 'dialog1HideBtn',
		  text: 'Hide',
		  component: 'Button',
		  image:'../../assets/img/orange-btn.png',
		  position: 'center',
		  font: {
		      size: '30px',
		      family: 'Skranji',
		      color: 'white'
		  },
		  anchor: {x:0.5, y:0.5},
		  width: 100,
		  height: 60
		}	
	]	
}

var dialog2JSON = {
	id: 'dialog2',
	component: 'Window',
	image: '../../assets/img/panel-650x400.png',
	header: { position: { x: 0, y: -40 }, height: 100, image:'../../assets/img/lvlcomplete.png', },
	padding: 4,
	position: { x: 0, y: 0 },
	width: 400,
	height: 300,
    layout:[1, 4],
    children: [
        
        {

            position: 'center',
            image: '../../assets/img/star2.png',
            width: 150,
            height: 60

        },
        null,
		{
		    id: 'dialog2HideBtn',
		    text: 'Hide',
		    component: 'Button',
		    image: '../../assets/img/orange-btn.png',
		    position: 'center',
		    font: {
		        size: '30px',
		        family: 'Skranji',
		        color: 'white'
		    },
		    anchor: { x: 0.5, y: 0.5 },
		    width: 100,
		    height: 60
		}
	]
}