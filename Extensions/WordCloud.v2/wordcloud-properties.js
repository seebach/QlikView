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
				min: 1,
				max: 1
			},
			measures: {
				uses: "measures",
				min: 1,
				max: 1,
				items: {
					customProp: {
						ref: "customProp",
						label: "customProp",
						type: "string",
						defaultValue: "customDefault"
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
