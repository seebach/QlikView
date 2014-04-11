/*function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = d3.max(d.ranges) * .2;
  return function(d) {
    return Math.max(0, d + k * (Math.random() - .5));
  };
}
*/
define(["jquery", "./bulletchart-properties-d3","./d3.js","./bullet-d3.js" ], function($, properties) {
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
		console.log("s10");

		// create a container
		var div = $('<div style="display:block; float:left;width:'+$element.width()+'px; height:'+$element.height()+'px;border:1px dashed #CCCCCC;"></div>');
		$element.append(div);    
		div.attr('id', 'd3-bulletchart');
		console.log(div);

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
				
				$element.html(html); //.html(label);
				var data=[
					{"crimeType":"mip","totalCrimes":24},
					{"crimeType":"theft","totalCrimes":558},
					{"crimeType":"drugs","totalCrimes":81},
					];
				console.log(salt);
				console.log(label);
			    console.log(valueArray);

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

		var margin = {top: 5, right: 40, bottom: 20, left: 120},
		    width = 960 - margin.left - margin.right,
		    height = 50 - margin.top - margin.bottom;

		var chart = d3.bullet()
		    .width(width)
		    .height(height);
		
		var w = $element.width(), h = $element.height();
		$element.html('loading..');
		d3.select($element[0]) ;
		//.append("svg").attr("viewBox", "0 0 " + w + " " + h).attr("width", w).attr("height", h).append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")").selectAll("text").data(data).enter().append("text").style("font-size"), function(error, data)  {

//		d3.json("bullets.json", function(error, data) {
		  var svg = d3.select("d3-bulletchart").selectAll("svg")
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

		 
				
		}	
	}
});

