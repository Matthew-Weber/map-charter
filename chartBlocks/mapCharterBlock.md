	Reuters.Graphics.usmap = new Reuters.Graphics.MapGenerator({
		el: "#reutersGraphic-chart1",
		mapShapeURL: "//graphics.thomsonreuters.com/mapshapes/us-simple.json",
		mapDataURL:"//d3sl9l9bcxfb5q.cloudfront.net/json/cc_scotus_abortion_map_county",
		projection: "mercator",
		objectName:"states",
		dataIdProperty:"fips",
		labelColumn:"STATEAP",
		center:[ -98.5561,37.8106],
		rotate:[-2.0,0],
		scaleModifier:.95,
		heightModifier:.59,
		colorDomain:[60,70,80,90],
		colorRange:[red1,red2,red3,red4,red5],
		scaleDisplay:["Less than 60%","60-70%","70-80%","80-90%","90% or more"],
//		legendTemplate:Reuters.Graphics.Template.maplegend,
//		tooltipTemplate:Reuters.Graphics.Template.maptooltip,
		scaleType:"threshold",
		colorValue:"pctcountywithout",
		//hashValue:function(d){
		//	var self = this;
		//	if (d.properties.surgicalcenter != "N"){
		//		return self.t.url()					
		//	}
		//	return 	self.color(d.properties[self.colorValue])				
		//},	
	}); 


/*
	Reuters.Graphics.europemap = new Reuters.Graphics.MapGenerator({
		el: "#reuters-map",
		mapShapeURL: "//graphics.thomsonreuters.com/mapshapes/europe.json",
		mapDataURL:"//d3sl9l9bcxfb5q.cloudfront.net/json/cc_scotus_abortion_map_county",
		projection: "mercator",
		objectName:"countries",
		dataIdProperty:"iso",
		labelColumn:"displaynam",
		center:[15.75, 55.75],
		rotate:[-1.4,0],
		scaleModifier:1,
		heightModifier:1.25,
		colorDomain:[60,70,80,90],
		colorRange:[red1,red2,red3,red4,red5],
		scaleDisplay:["Less than 60%","60-70%","70-80%","80-90%","90% or more"],
		tooltip: function(d) {			
			var self = this;

			return "<h3>"+d.properties.STATE+"</h3><br><p>Percentage of counties without abortion providers</p><h2>" + d.properties.pctcountywithout+"%</h2><br><p>Number of abortion providers</p><h2>" + d.properties.providers+"</h2>"
		},
		legendTemplate:Reuters.Graphics.Template.maplegend,
		tooltipTemplate:Reuters.Graphics.Template.maptooltip,
		scaleType:"threshold",
		colorValue:"pctcountywithout",
		//hashValue:function(d){
		//	var self = this;
		//	if (d.properties.surgicalcenter != "N"){
		//		return self.t.url()					
		//	}
		//	return 	self.color(d.properties[self.colorValue])				
		//},	
	}); 
*/

		
/*
	Reuters.Graphics.worldMap = new Reuters.Graphics.MapGenerator({
		el: "#reuters-map",
		mapShapeURL: "//graphics.thomsonreuters.com/mapshapes/world.json",
		mapDataURL:"//d3sl9l9bcxfb5q.cloudfront.net/json/cc_zika_world",
		projection: "mercator",
		objectName:"countries",
		dataIdProperty:"iso",
		labelColumn:"displaynam",
		center:[ 1,30],
		rotate:[-1.4,0],
		scaleModifier:.16,
		heightModifier:.6,
		colorDomain:[60,70,80,90],
		colorRange:[red1,red2,red3,red4,red5],
		scaleDisplay:["Less than 60%","60-70%","70-80%","80-90%","90% or more"],
		tooltip: function(d) {			
			var self = this;

			return "<h3>"+d.properties.name+"</h3>"
		},
		legendTemplate:Reuters.Graphics.Template.maplegend,
		tooltipTemplate:Reuters.Graphics.Template.maptooltip,
		scaleType:"threshold",
		colorValue:"pctcountywithout",
		//hashValue:function(d){
		//	var self = this;
		//	if (d.properties.surgicalcenter != "N"){
		//		return self.t.url()					
		//	}
		//	return 	self.color(d.properties[self.colorValue])				
		//},	
	}); 
*/

Reuters.Graphics.usmap.on("renderChart:start", function(evt){
    var self = this;
    
})		
Reuters.Graphics.usmap.on("renderChart:end", function(evt){
    var self = this;
    
})		
Reuters.Graphics.usmap.on("update:start", function(evt){
    var self = this;
    
})		
Reuters.Graphics.usmap.on("update:end", function(evt){
    var self = this;
    
})
