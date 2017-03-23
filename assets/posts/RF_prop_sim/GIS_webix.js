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
		   			width: 200,
		   			rows: [
		   				{ header: "col1", body: "content1"},
		   				{ header: "col2", body: "content2"},
		   				{ header: "col3", body: "content3"}   				   				
		   			]
	   			},
	   			{	   			
	   				view: "accordion",
		   			multi:true,
		   			width: 600,
		   			cols: [
		   				{ 
		   				  header: "Shuttle Radar Topography [Costa Rica]", 
		   				  height: 600,
		   				  body: { view: "template", content: "outer" }}   				   				
	   				]
	   			}

   			]

   	   }) //webix.ui

	d3.select("div#layout").style("max-width", maxWidth + "px");
	d3.select("div.outer")
	  .style("width", "580px")
	  .style("height", "560px")
//	  .style("border", "1px solid black")
	  .style("position", "relative");

	gis = new GIS("outer");

   })
}
