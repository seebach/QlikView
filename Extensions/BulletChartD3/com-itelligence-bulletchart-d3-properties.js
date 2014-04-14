/**
 * @owner Erik Wetterberg (ewg)
 */

define( [], function () {

	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: {
				uses: "dimensions",
				min: 0,
				max: 1
			},
			measures: {
				uses: "measures",
				min: 1,
				max: 5,
				items: {
					customProp: {
						ref: "customProp",
						label: "Show as",
						component: "dropdown",
						options: [ {
								        value: "m",
								        label: "measure line"
								    }, {
								        value: "t",
								        label: "target line"
								    } ,
 									{
								        value: "b",
								        label: "background"
								    } ],
//						options: {"measure line","target line","background"},
						type: "string",
						defaultValue: "m"
					}
				}
			},
			sorting: {
				uses: "sorting"
			},
			settings: {
				uses: "settings",
				items: {
					fonts: {
						type: "items",
						label: "Fonts",
						items: {
							minFontSize: {
								ref: "fontSize.min",
								translation: "Min Font Size",
								type: "number",
								defaultValue: 8
							},
							maxFontSize: {
								ref: "fontSize.max",
								translation: "Max Font Size",
								type: "number",
								defaultValue: 24
							}
						}
					}
				}
			}
		}
	};

} );
