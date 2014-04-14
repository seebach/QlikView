/*globals define, console*/
requirejs.config({
	shim : {
		"extensions/com-itelligence-bulletchart-d3/itelligence-bulletchart-d3-bullet-lib" : {
			"deps" : ["extensions/com-itelligence-bulletchart-d3/d3"]
		}
	}
});
define(["jquery", "./com-itelligence-bulletchart-d3-properties", "./itelligence-bulletchart-d3-bullet-lib","text!./styles.css"], function($, properties) {
	'use strict';
	$("<style>").html(properties).appendTo("head");
	return {
		type : "BullectChart",
		//Refer to the properties file
		definition : properties,

		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 5,
					qHeight : 50
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
		paint : function($element, layout) { 
				console.log('start paint 2');
		//	d3.select($element[0]).append("p").text("New paragraph!");

/*
//			d3.select($element[0]).append("p").text("loading");
			//check that we have data to render
			if(layout.qHyperCube.qDataPages[0].qMatrix.length>=1 ) { 
			// || layout.qHyperCube.qDataPages[0].qMatrix.length) {	
			$element.html("");
			var count = 0;
			var salt = Math.round( Math.random() *10000);
			var datastring = '[';
			var qData = layout.qHyperCube.qDataPages[0];
			console.log(layout.qHyperCube);

			$.each(qData.qMatrix, function(key, row) { 
				var valueArray = [];
				var label = '';
				// log loop into rows
				$.each(row, function(index, cell) {
				//	$.each(this, function(key2, cell) { 
					if(isNaN(row[0].qNum)) {
						label = row[0].qText;
					} else {
						label = 'no dim';
					}
					if(!isNaN(cell.qNum)) {
						valueArray.push(cell.qNum);
					}						
				//	});	
				});
*/				/*
				If (typeof valueArray[2] == 'undefined') {
				// get the highest value to create background chart area 
				valueArray[2] = ((valueArray[0]>valueArray[1]) ? valueArray[0] : valueArray[1]);
				}*/
				// check if we need to add a , to seperate data arrays
/*				if (count > 0) {
					datastring += ',';
				}
				datastring += '{"title":"'+label+'",';
				datastring += '"measures":['+valueArray[0]+'],';
				datastring += '"markers":['+valueArray[1]+'],';
				datastring += '"ranges":['+valueArray[2]+']}';
					
				console.log('datastring'); 					
				console.log(datastring); 					
				// build output

				// reset array to ensure data refrash
				valueArray = undefined;
				console.log(valueArray);
				count = count+1;	
			});
		
		datastring += ']';
*/

		// required markers (,"markers":[2100]),ranges (,"ranges":[1400,2500])
		// optional subtitle ("subtitle":"US$, in thousands")
		var data=[
				  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220,270],"markers":[250]},
				  {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
				  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
		//		  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
				  {"title":"New Customers","measures":[1000],"ranges":[2500],"markers":[2100]},
		//		  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
				]
			;

	    console.log(data);

		var margin = {top: 5, right: 40, bottom: 20, left: 120},
		    width = $element.width() - margin.left - margin.right,
		    // todo: divide by total number of elements in dimensions
		    height = ($element.height()/5) - margin.top - margin.bottom;

		var chart = d3.bullet()
		    .width(width)
		    .height(height);

		var w = $element.width(), h = $element.height();

		var svg = d3.select($element[0]).selectAll("svg")
		      .data(data)
		    .enter().append("svg")
		      .attr("class", "bullet")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		      .call(chart);

		var title = svg.append("g")
		      .style("text-anchor", "end")
		      .attr("transform", "translate(-6," + height / 2 + ")");

		title.append("text")
		      .attr("class", "title")
		      .text(function(d) { return d.title; });

		title.append("text")
		      .attr("class", "subtitle")
		      .attr("dy", "1em")
		      .text(function(d) { return d.subtitle; });

		
		function randomize(d) {
			  if (!d.randomizer) d.randomizer = randomizer(d);
			  d.markers = d.markers.map(d.randomizer);
			  d.measures = d.measures.map(d.randomizer);
			  return d;
			};

		function randomizer(d) {
				  var k = d3.max(d.ranges) * .2;
				  return function(d) {
				    return Math.max(0, d + k * (Math.random() - .5));
				  };
			};	 
		 	
		},
		clearSelectedValues : function($element) {
			//jQuery can not change class of SVG element, need d3 for that
			d3.select($element[0]).selectAll(".selected").classed("selected", false);
		}
	};
});