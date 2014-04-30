/*globals define, console*/
/*
	ToDo:
		labels in dimension centered
		minsize display handling (scrollbar?)
		Show multiple diemensions
		change display type base on custom setting
		set max barsize
*/
requirejs.config({
	shim : {
		"extensions/com-itelligence-bulletchart-d3/itelligence-bulletchart-d3-bullet-lib" : {
			"deps" : ["extensions/com-itelligence-bulletchart-d3/d3"]
		}
	}
});// 
define(["jquery","text!./styles.css","./com-itelligence-bulletchart-d3-properties", "./itelligence-bulletchart-d3-bullet-lib"], function($, cssProperties,properties) {
	'use strict';$("<style>").html(cssProperties).appendTo("head");
	var runCount = 1;

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
					qWidth : 10,
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
			runCount = runCount+1;
			log('start paint 3');
			log(layout);
			
			// color palette from Patrik Lundblad
			var palette = [
                         '#b0afae',
                         '#7b7a78',
                         '#545352',
                         '#4477aa',
                         '#7db8da',
                         '#b6d7ea',
                         '#46c646',
                         '#f93f17',
                         '#ffcf02',
                         '#276e27',
                         '#ffffff',
                         '#000000'
			            ];
 

//			d3.select($element[0]).append("p").text("loading");
			//check that we have data to render
			if(layout.qHyperCube.qDataPages[0].qMatrix.length>=1 ) { 
			var dimensions = layout.qHyperCube.qDataPages[0].qMatrix.length;	
			// || layout.qHyperCube.qDataPages[0].qMatrix.length) {	
			$element.html("");
			
			var count = 0;
			var salt = Math.round( Math.random() *10000);
			var datastring = []; //'[\n';
			var qData = layout.qHyperCube.qDataPages[0];
			var qMeasures = layout.qHyperCube.qMeasureInfo;
			// log(qMeasures);
			// do we have dimensions?
			var dimFlag = layout.qHyperCube.qDimensionInfo.length;
			 
			var vizArray = [];
			var colorArray = [];

			$.each(qMeasures, function(key, row) {
				//get type of viz
				vizArray.push(qMeasures[key].viz);
				// get color for viz
				colorArray.push(qMeasures[key].color);
			});

			$.each(qData.qMatrix, function(key, row) { 
				var valueArray = [];

				var label = '';
				

				// log loop into rows
				$.each(row, function(index, cell) {
				// log(index);
					
					if(isNaN(row[0].qNum) && dimFlag>0) {
						label = disclosureLabelText( row[0].qText, $element.width(),dimFlag);
					} 	
					if(row[0].qIsOtherCell===true && dimFlag>0) {
						// other label needs tp be set dynamically
						label = disclosureLabelText(  layout.qHyperCube.qDimensionInfo[0].othersLabel, $element.width(),dimFlag);
					}
				//	if((cell.qState==='S')) {
				//	}	
					if(!isNaN(cell.qNum)) {

						valueArray.push(cell.qNum);
					}						
				//	});	
				});
				
				if (typeof valueArray[2] === 'undefined') {
				// get the highest value to create background chart area 
				valueArray[2] = ((valueArray[0]>valueArray[1]) ? valueArray[0] : valueArray[1]);
				}
				// check if we need to add a , to seperate data arrays
				// create data array
				var dataPairs = { "title":label,"ranges":[],"measures":[],"markers":[] }; //,"measures":{valueArray[0]},"markers":{valueArray[1]} };


				// insert values into array
				var valueLength = valueArray.length;
				for (var i = 0; i < valueLength; i++) {
				    if(vizArray[i]==='m') {
						dataPairs["measures"].push(valueArray[i])
				    }
				    if(vizArray[i]==='t') {
						dataPairs["markers"].push(valueArray[i])
				    }
				    if(vizArray[i]==='b') {
						dataPairs["ranges"].push(valueArray[i])
				    }
				}
				//log(dataPairs);
				datastring.push(dataPairs);
					
				count = count+1;	
				
			});
		
//		datastring += ']';

}
		// required markers (,"markers":[2100]),ranges (,"ranges":[1400,2500])
		// optional subtitle ("subtitle":"US$, in thousands")
/*		var data2=[
				  {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220,270],"markers":[250]},
				  {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
				  {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
		//		  {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
				  {"title":"New Customers","measures":[1000],"ranges":[2500],"markers":[2100]},
		//		  {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
				]
			; */

		var data = datastring;
	    log(data);


	    var divHeight = $element.height();
	    var divWidth = $element.width();
	    var divMarginLabel = disclosureLabelWidth(divWidth,dimFlag);
	    var divMarginRight = disclosureRightMargin(divWidth);
	    var divMarginText = ''; 
	    var elementHeight = (divHeight/dimensions)*0.95;
	    var elementRelativeMargin = 25;
	    var elementRelativeHeight = 25;
	    var marginTop = (elementHeight*0.1) ;
	    var marginBottom = disclosureLegendHeight(elementHeight*0.3);
	    // log('h:'+divHeight+' w:'+divWidth +' eh:'+elementHeight);

	    var titleFontSize = disclosureFontSize(elementHeight);

		var margin = {top: 5, right: 40, bottom: 20, left: 120},
		    width = $element.width() - divMarginLabel - divMarginRight,
		    // todo: divide by total number of elements in dimensions
		    height = elementHeight - marginTop - marginBottom;
		//log('mt:'+marginTop +' mb:'+ marginBottom+' h:'+height);

		var chart = d3.bullet()
		    .width(width)
		    .height(height);

		var w = $element.width(), h = $element.height();

		var svg = d3.select($element[0]).selectAll("svg")
		      .data(data)
		    .enter().append("svg")
		      .attr("class", "bullet")
		      .attr("width", width + divMarginLabel + divMarginRight)
		      .attr("height", height + marginTop + marginBottom)
//		      .attr("width", width + divMarginLabel + divMarginRight)
//		      .attr("height", height + marginTop + marginBottom)
		    .append("g")
		      .attr("transform", "translate(" + divMarginLabel + "," + marginTop + ")")
		     // .transition()
		      .call(chart);


		var title = svg.append("g")
		      .style("text-anchor", "end")
		      .attr("transform", "translate(-6," + height / 2 + ")");

		title.append("text")
		      .attr("class", "title")
		      //.fontSize('8px')
		      //.style("font-size", function(d) {	return d.size + "px";
		      .style("font-size", titleFontSize )
		      .text(function(d) { return d.title; });

/*		title.append("text")
		      .attr("class", "subtitle")
		      .attr("dy", "1em")
		      .text(function(d) { return d.subtitle; });
*/
		log('Runs: '+runCount);


		// set colors
//		$("rect.range.s0").css("fill","red");
//		$("rect.measure.s0").css("fill","red");
//		$(".marker").css("stroke","red");
		var range = 0;
		var marker = 0;
		var measure = 0;
		var colorShow = '';

		var vizLength = vizArray.length;
		for (var i = 0; i < vizLength; i++) {
		    var colorShow = palette[colorArray[i]];
			
		    if(vizArray[i]==='m') {
				$("rect.measure.s"+measure).css("fill",colorShow);
				measure++;
			//    log(i + ' m '+ vizArray[i] + ' - '+colorShow);
		    }
		    if(vizArray[i]==='t') {
				$("line.marker.s"+marker).css("stroke",colorShow);
				marker++;
			   log(i + ' t '+ vizArray[i] + ' - '+colorShow);
		    }
		    if(vizArray[i]==='b') {
				$("rect.range.s"+range).css("fill",colorShow);
				range++;
			//    log(i + ' b '+ vizArray[i] + ' - '+colorShow);
		    }
		}
	// disclosure functions 	
		// adjust title 
		function disclosureFontSize (elementHeight) {
			var size = "14px";
			if (elementHeight>=23 & elementHeight<=30) {
				size = Math.round(elementHeight)-17+"px";
			} 
			if (elementHeight<22) {
					size = "8px";
			}
			//log(size+' '+elementHeight);
			return size;
		} 
	

		function disclosureLabelText(dimLabel,divWidth,dimFlag) {
			var label = '';
			var letterLength = 8;
/*			if( noDimension()===true){
				return label;
			} */
//			log(divWidth);
//			log('ll '+dimLabel.length*letterLength);
			if(divWidth>=400 ) {
				label = dimLabel;
			} else if( dimLabel.length*letterLength<=400) {
				// log(((dimLabel.length*5)-divWidth)/5);
				if (dimLabel.length*letterLength >= disclosureLabelWidth(divWidth,dimFlag) ) {
					// determine how many letters to cut, add 3 to total because of dots..
					var letters = 3+Math.floor(((dimLabel.length*letterLength)-disclosureLabelWidth(divWidth))/letterLength);
//					log('letters '+letters);
					label =  dimLabel.slice( 0,dimLabel.length-letters )+'...';
				} else {
					label = dimLabel;
				}
			} else if(divWidth<=100) {
				// no label;
			}

			return label;
		}

		function disclosureLabelWidth(divWidth,dimFlag) {
			var width = 0;
			if( dimFlag===0 ) {
				return width;
			}
/*			if( noDimension()===true){
				return width;
			} */
			//log(divWidth);
			// show label if there is space enough
			if(divWidth>=200 && divWidth<=400) {
				width = divWidth*0.3;
			} else if (divWidth>=400){	
				width = 140;
			}
			//log('w:'+width);
			return width;
		}

		function disclosureRightMargin(divWidth) {
			var width = 0;
			// show label if there is space enough
			if (divWidth>=400){	
				width = 20;
			}
			//log('w:'+width);
			return width;
		}
		function disclosureLegendHeight(divHeight) {
			var height = 5;
//			log(divHeight);
			// show lengend if there is space enough
			if(divHeight>=20) {
				height = divHeight;
			}
			return height;
		}

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
		 // i use this logging function so its easy to turn logging on or off
		 function log(obj) {
				  console.log(obj);
//				  dump(obj);
			};
//
function dump(object) {
        if (window.JSON && window.JSON.stringify)
            console.log(JSON.stringify(object));
        else
            console.log(object);
    };
//
		},
		clearSelectedValues : function($element) {
			//jQuery can not change class of SVG element, need d3 for that
			d3.select($element[0]).selectAll(".selected").classed("selected", false);
		},
/*		noDimension : function ($element,layout) {
				if(layout.qHyperCube.qDimensionInfo[0].length>=1) {
					return true;
				}
				return false;
		};
*/
	};
});
