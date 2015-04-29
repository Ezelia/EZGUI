var mainScreenJSON = {
	id: 'mainScreen',
	component: 'Window',	
	padding: 0,
	position: { x: 0, y: 0 },
	width: 400,
	height: 640,

	layout: [1, 16],
	children: [
		{
		    text: 'My Awesome App Screen 1',
		    font: {
		        size: '20px',
		        family: 'Skranji',
		        color: '#fff'
		    },
		    component: 'Header',
		    
		    position: 'center',
		  
		    width: 400,
		    height: 40
		},
	{
	    component: 'Layout',

	    z: 1, //the Z index allow to bring the navigation to the top so it can receive events (this is a workaround to the way PIXI handles events)

	    padding: 3,
	    position: { x: 0, y: 0 },
	    width: 400,
	    height: 60,
	    layout: [3, 1],
	    children: [
			null,
			null,
			{ id: 'btNext1', text: 'Next', component: 'Button', position: 'center', width: 100, height: 40 },
	    ]
	},
        //force height to occupy all remaining space
	{
        id:'list1',
	    component: 'List',
	    padding: 3,
	    position: { x: 0, y: 20 },
	    width: 400,
	    height: 500,
	    layout: [null, 5],
	    children: [
			{ text: 'list item 1', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 2', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 3', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 4', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 5', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 6', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 7', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 8', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 9', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },
			{ text: 'list item 10', component: 'Button', skin: 'hListItem', position: 'center', width: 400, height: 100 },


	    ]
	},

        //Fill intermediate children spaces with nulls
        null, null, null, null, null, null,
        null, null, null, null, null, null, 
		{
		    text: 'App footer : vertical slide',
		    font: {
		        size: '20px',
		        family: 'Arial',
		        color: '#fff'
		    },
		    component: 'Header',

		    position: 'center',

		    width: 400,
		    height: 40
		}
	]
}



var secondScreenJSON = {
    id: 'secondScreen',
    component: 'Window',
    padding: 0,
    position: { x: 0, y: 0 },
    width: 400,
    height: 640,

    layout: [1, 16],
    children: [
		{
		    text: 'My Awesome App Screen 2',
		    font: {
		        size: '20px',
		        family: 'Skranji',
		        color: '#fff'
		    },
		    component: 'Header',

		    position: 'center',

		    width: 400,
		    height: 40
		},
	{
	    component: 'Layout',

	    z: 1, //the Z index allow to bring the navigation to the top so it can receive events (this is a workaround to the way PIXI handles events)

	    padding: 3,
	    position: { x: 0, y: 0 },
	    width: 400,
	    height: 60,
	    layout: [3, 1],
	    children: [
			{ id: 'btPrev2', text: 'Back', component: 'Button', position: 'center', width: 100, height: 40 },
			null,
			{ id: 'btNext2', text: 'Next', component: 'Button', position: 'center', width: 100, height: 40 },
	    ]
	},
        //force height to occupy all remaining space
	{
	    component: 'List',
	    padding: 3,
	    dragY: false,
	    position: { x: 0, y: 20 },
	    width: 400,
	    height: 500,
	    layout: [2, 4],
	    children: [
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },
			{ text: 'item', component: 'Button', position: 'center', width: 100, height: 100 },


	    ]
	},

        //Fill intermediate children spaces with nulls
        null, null, null, null, null, null,
        null, null, null, null, null, null,
		{
		    text: 'App footer : horizontal slide',
		    font: {
		        size: '20px',
		        family: 'Arial',
		        color: '#fff'
		    },
		    component: 'Header',

		    position: 'center',

		    width: 400,
		    height: 40
		}
    ]
}



var thirdScreenJSON = {
    id: 'thirdScreen',
    component: 'Window',
    padding: 0,
    position: { x: 0, y: 0 },
    width: 400,
    height: 640,

    layout: [1, 16],
    children: [
		{
		    text: 'My Awesome App Screen 3',
		    font: {
		        size: '20px',
		        family: 'Skranji',
		        color: '#fff'
		    },
		    component: 'Header',

		    position: 'center',

		    width: 400,
		    height: 40
		},
	{
	    component: 'Layout',

	    z: 1, //the Z index allow to bring the navigation to the top so it can receive events (this is a workaround to the way PIXI handles events)

	    padding: 3,
	    position: { x: 0, y: 0 },
	    width: 400,
	    height: 60,
	    layout: [3, 1],
	    children: [
			{ id: 'btPrev3', text: 'Back', component: 'Button', position: 'center', width: 100, height: 40 },
			null,
			null,
	    ]
	},
        //force height to occupy all remaining space
	{
	    component: 'Window',
	    padding: 3,
	    dragY: false,
	    position: { x: 0, y: 20 },
	    width: 400,
	    height: 500,
	    layout: [2, 5],
	    children: [
            { text: 'Checkbox 1 ', component: 'Checkbox', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Radio 1 ', group: 'radioGroup1', component: 'Radio', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Checkbox 2 ', component: 'Checkbox', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Radio 2 ', group: 'radioGroup1', component: 'Radio', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Checkbox 3 ', component: 'Checkbox', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Radio 3 ', group: 'radioGroup1', component: 'Radio', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Checkbox 4 ', component: 'Checkbox', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Radio 4 ', group: 'radioGroup1', component: 'Radio', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Checkbox 5 ', component: 'Checkbox', position: { x: 10, y: 10 }, width: 40, height: 40 },
            { text: 'Radio 5 ', group: 'radioGroup1', component: 'Radio', position: { x: 10, y: 10 }, width: 40, height: 40 },

	    ]
	},

        //Fill intermediate children spaces with nulls
        null, null, null, null, null, null,
        null, null, null, null, null, null,
		{
		    text: 'App footer : Radio and checkbox',
		    font: {
		        size: '20px',
		        family: 'Arial',
		        color: '#fff'
		    },
		    component: 'Header',

		    position: 'center',

		    width: 400,
		    height: 40
		}
    ]
}