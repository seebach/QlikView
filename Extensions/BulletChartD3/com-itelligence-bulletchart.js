
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

		// find the expected total rows
		// var rowTotal = ?;	
		console.log($element);
		$element.empty();
		var salt = Math.round( Math.random() *10000);
		var html = '';
		var qData = layout.qHyperCube.qDataPages[0];

	console.log(qData);
		//$element.('.sparkline').empty();
		var rowCount = 0;
		var label = '';
			$.each(qData.qMatrix, function(key, row) { 
				var valueArray = [];
				var prevValueArray = [];
			// log loop into rows
			    $.each(row, function(index, cell) {
				//	$.each(this, function(key2, cell) { 
						if(isNaN(row[0].qNum)) {
							label = row[0].qText;
						}
						if(!isNaN(cell.qNum)) {
							valueArray.push(cell.qNum);
						}
				//	});	
				 });
			    // build output
			    html += '<div style="height:'+$element.height()+';width:'+$element.width()+'">';
				html += '<span class="text-'+rowCount+'-'+salt+'" >'+label+'</span>' ;
				html += '<span class="sparkline-'+rowCount+'-'+salt+'" style="width:100%;height:100%">loading...</span>' ;
				html += '</div>';
				
				$element.html(html); //.html(label);

				console.log(salt);
				console.log(label);
			    console.log(valueArray);

			 		var colorArray = ['#AAA','#666','#555'];
					$(".sparkline-"+rowCount+"-"+salt).sparkline(valueArray, {
		                type : 'bullet',
		            //    width : $element.width(),
		            //    height : $element.height()/5 ,
		                targetColor : '#555',
		                performanceColor : '#BBB',
		//                rangeColors : colorArray 
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
				var rowCount=rowCount+1;
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
			});
		
	}
	};
});

