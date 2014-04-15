/*globals define, console*/
requirejs.config({
	shim : {
		"extensions/com-itelligence-wordcloud/d3.layout.cloud" : {
			"deps" : ["extensions/com-itelligence-wordcloud/d3"]
		}
	}
});
define(["jquery", "./wordcloud-properties", "./d3.layout.cloud"], function($, properties) {
	return {
		type : "WordCloud v2",
		//Refer to the properties file
		definition : properties,

		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 2,
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
			var wordarr = [], extraData = [], maxVal = 0, self = this;
			var minT = layout.fontSize.min, maxT = layout.fontSize.max;
			var w = $element.width(), h = $element.height();
			var i;
			//Do not paint if there is no space to paint on - it will cause the d3 algorithm to loop.
			if(w < 20 || h < 20) {
				return;
			}
			$element.html("");

			//check that we have data to render
			if(layout.qHyperCube.qDataPages[0].qMatrix.length) {
				$.each(layout.qHyperCube.qDataPages[0].qMatrix, function(key, row) {

					var dimension = row[0], measure = row[1];

					//Needs both measure and dimension
					if(!!measure && !!dimension && !isNaN(measure.qNum)) {
						if(dimension.qIsOtherCell) {
							dimension.qText = layout.qHyperCube.qDimensionInfo[0].othersLabel;
						}
						wordarr.push({
							text : dimension.qText,
							size : measure.qNum
						});

						//The color information is randomized
						extraData[dimension.qText] = {
							value : dimension.qElemNumber,
							col : '#' + Math.floor(Math.random() * 16777215).toString(16)
						};
						maxVal = Math.max(maxVal, measure.qNum);
					}
				});
				for(i in wordarr ) {
					wordarr[i].size = minT + ((wordarr[i].size / maxVal ) * maxT );
				}
				var draw = function(words) {
					d3.select($element[0]).append("svg").attr("viewBox", "0 0 " + w + " " + h).attr("width", w).attr("height", h).append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")").selectAll("text").data(words).enter().append("text").style("font-size", function(d) {
						return d.size + "px";
					}).attr("text-anchor", "middle").attr("transform", function(d) {
						return "translate(" + [d.x * 1.5, d.y * 1.5] + ")rotate(" + d.rotate + ")";
					}).attr("fill", function(d) {
						return extraData[d.text] ? extraData[d.text].col : "red";
					}).text(function(d) {
						return d.text;
					}).classed('selectable', true).attr('data-value', function(d) {
						return extraData[d.text].value;
					}).on('click', function() {
						if(this.hasAttribute("data-value")) {
							var value = parseInt(this.getAttribute("data-value"), 10), dim = 0, isSelected = d3.select(this).classed("selected");
							if(value > -1) {
								self.selectValues(dim, [value], true);
								d3.select(this).classed("selected", !isSelected);
							}
						}
					});
				};
/*				d3.layout.cloud().size([w, h]).words(wordarr).rotate(function() {
					return ~~(Math.random() * 2 ) * 90;
				})*/
				d3.layout.cloud().fontSize(function(d) {
					return d.size;
				}).on("end", draw).start();
			}
		},
		clearSelectedValues : function($element) {
			//jQuery can not change class of SVG element, need d3 for that
			d3.select($element[0]).selectAll(".selected").classed("selected", false);
		}
	};
});
