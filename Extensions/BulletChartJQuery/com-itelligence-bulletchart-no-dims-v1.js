
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
						qWidth : 1,
						qHeight : 10
					}] 
				},
				fontSize : {
					min : 8,
					max : 24
				}
			},
/*			snapshot : {
				canTakeSnapshot : true
			}, */

		paint: function ($element,layout) {

		var valueArray = [];
		console.log(layout);
    $.each(layout.qHyperCube.qDataPages[0].qMatrix, function(index, value) {
		// alert(this[1].qNum);
		
	      if (!this[0].qIsEmpty) {
        valueArray.push(this[0].qNum);
		 } 
		 if (!this[1].qIsEmpty) {
      		valueArray.push(this[1].qNum);
      		valueArray.push(this[1].qNum*1.1);
	     }
/*	     if (!this[2].qIsEmpty) {
		   valueArray.push(this[2].qNum);
	      }  */
	  });
 //-   alert(valueArray);
 		var colorArray = ['#333','#222','#111']
		//$element.add( "div" ).attr('id', 'BulletChart');
		//$("#BulletChart").html( "Hello world!!" );
			$element.sparkline(valueArray, {
//			$("#BulletChart").sparkline(valueArray, {

                type : 'bullet',
                width : $element.width(),
                height : $element.height() ,
                targetColor : '#555',
                performanceColor : '#BBB',
                rangeColors : colorArray
              }); 
		}
	};


} );

