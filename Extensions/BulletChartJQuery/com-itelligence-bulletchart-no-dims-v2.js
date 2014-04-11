
define(["jquery", "./bulletchart-properties","./jquery.sparkline.min" ], function($, properties) {
	return {
			//Refer to the properties file
		definition : properties,

		initialProperties : {
				version: 1.0,
				qHyperCubeDef : {
					qDimensions : [], 
					qMeasures : [],
					qInitialDataFetch : [{
						qWidth : 4,
						qHeight : 10
					}] 
				},
				fontSize : {
					min : 8,
					max : 24
				}
			},
			snapshot : {
				canTakeSnapshot : true
			}, 

		paint: function ($element,layout) {

		console.log($element);
		$element.empty();
		//$element.('.sparkline').empty();
		var $newDiv = $("<div/>").addClass("sparkline") ;

		$element.append($newDiv);
		var valueArray = [];
		var prevValueArray = [];

    $.each(layout.qHyperCube.qDataPages[0].qMatrix, function(index, value) {
		$.each(this, function(key, cell) { 
			if(!isNaN(cell.qNum)) {
				valueArray.push(cell.qNum);
			}
		});	
	  });

 		var colorArray = ['#AAA','#666','#555']
			$element.find('div:first').sparkline(valueArray, {
                type : 'bullet',
                width : $element.width(),
                height : $element.height() ,
/*                targetColor : '#555',
                performanceColor : '#BBB',
                rangeColors : colorArray */
 			tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{fieldkey}}={{value}}</span>' ,
        		tooltipValueLookups: {
	            names: {
	                0: 'Automotive',
	                1: 'Locomotive',
	                2: 'Unmotivated',
	                3: 'Three',
	                4: 'Four',
	                5: 'Five'
	                // Add more here
	            	}
        	}
              }); 
		// store value array for animation later
		/*$.each(valueArray, function(key, cell) { 
			if(!isNaN(cell)) {
				prevValueArray.push(cell);
			}
		});	*/
			console.log(prevValueArray);
			// reset array to ensure data refrash
			valueArray = undefined;
			console.log(valueArray);
		}
	};


} );

