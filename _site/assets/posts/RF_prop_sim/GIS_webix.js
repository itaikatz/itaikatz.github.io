window.onload = function() { 

    var maxWidth = 900;
    webix.ready(function(){
   		webix.ui({

   			container: "layout",
			maxWidth: maxWidth,
			cols: [
	   			{
		   			view: "accordion",
		   			multi:true,
		   			width: 300,
		   			// type: "clean",
		   			rows: [
		   			               

						{ header:"Propagation Model", //height:150, 
						  body: {
						  	type: "template", 
						  	rows: [
						  		{ view: "radio", id: "propModel" , value:"Terrain",
						  		  options: [
						  		  	 { "id": "Distance", "value":"Distance"},
						  		  	 { "id": "Terrain", "value":"Terrain"}
						  		  ]
						  		}
						  	]
						  } 
						},

		   				{ header: "RF Sources", height: 330, 
		   				  body: {
		   				  	view:"datatable", id:"datatable", select:false, scroll: 'y',
		   				  	columns: [
		   				  	  { id:"id", header: "ID", width: 50},
		   				  	  { id: "lat", header: "Lat", width: 50 }, 
		   				  	  { id:"lon", header: "Lon", width: 50 },
		   				  	  { id:"trash", header:"", template:"<input type='button' value='Delete' class='details_button'>"}
		   				  	],
		   				  	onClick:{
	                        	details_button:function(ev, id) {
                          			gis.removeSource(id.row);
                          			$$("datatable").remove(id.row);
                         		}
                       		}
		   				  }
		   				}
		   			]
	   			},
	   			{	   			
	   				view: "accordion",
		   			multi:true,
		   			width: 580,
		   			cols: [
		   				{ 
		   				  header: "Shuttle Radar Topography [Costa Rica]", 
		   				  height: 420,
		   				  body: { view: "template", content: "outer" }
		   				}   				   				
	   				]
	   			}

   			]

   	   }) //webix.ui

    function updateTableFunc(source_id, x, y) {
    	$$("datatable").add({
            id: source_id,
            lat: x,
            lon: y
            });
	}

	d3.select("div#layout").style("max-width", maxWidth + "px");
	d3.select("div.outer")
	  .style("width", "560px")
	  .style("height", "600px")
	  .style("position", "relative");

	//gis = new GIS("outer", updateTableFunc, 
	//	           "costarica_min_topo.txt", "relief.tiff");
	 gis = new GIS("outer", updateTableFunc,
	 	  		  "https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/costarica_min_topo.txt",
	 	  		  "https://crossorigin.me/https://itaikatz.github.io/assets/posts/RF_prop_sim/relief.tiff");


	$$("propModel").attachEvent("onChange", function(newv, oldv){
		gis.changeKernel(newv);
	});

   })
}
