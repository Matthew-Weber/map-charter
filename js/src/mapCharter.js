Reuters = Reuters || {};
Reuters.Graphics = Reuters.Graphics || {};

Reuters.Graphics.MapGenerator = Backbone.View.extend({
	data: undefined,
	mapData:undefined,
	projection: "mercator",
	legendTemplate:Reuters.Graphics.mapCharter.Template.maplegend,
	tooltipTemplate:Reuters.Graphics.mapCharter.Template.maptooltip,
	initialize: function(opts){
		this.options = opts; 
		var self = this;

		_.each(opts, function(item, key){
			self[key] = item;
		});

		d3_queue.queue()
		.defer(d3.json, self.mapDataURL)
		.defer(d3.json, self.mapShapeURL) 
		.await(ready);
	
		//FIX 
		function ready (error, mapData, mapShape ) {

			var geography = topojson.feature(mapShape, mapShape.objects[self.objectName]).features;

			geography.forEach(function(d){
				mapData.forEach(function(item){					
					if (d.id == item[self.dataIdProperty]){
						_.each(item, function(value,key){
							d.properties[key] = value;
						});
					}					
				});		
			});

			self.data = geography;
			self.dataParse();
			
		}
	
	//end of initialize		
	},
	dataParse: function(){

		var self = this;

		if (self.scaleType =="ordinal"){
			self.color= d3.scale.ordinal()
				.domain(self.colorDomain)
				.range(self.colorRange);
			
			self.tooltipScale= d3.scale.ordinal()
				.domain(self.colorDomain)
				.range(self.scaleDisplay);
		}
		if (self.scaleType =="threshold"){
			self.color= d3.scale.threshold()
				.domain(self.colorDomain)
				.range(self.colorRange);						
		}
		

	    self.commaFormat = d3.format(",f");
	    self.pctFormat = d3.format(".1%");

		self.mapRender();

		
	},
	geographyFill: function(d){
		var self = this;
		var strokecolor = d3.rgb(self.color(d.properties[self.colorValue])).darker(0.8);
		self.t = textures.lines().size(7).stroke(strokecolor).background(self.color(d.properties[self.colorValue]));
		self.svg.call(self.t);

		if (self.hashValue){
			return self.hashValue(d);
		}

		return 	self.color(d.properties[self.colorValue]);
	},
	mapRender: function() { 
		var self = this;
        self.trigger("renderChart:start")
		//FIX: need a jst to build the legend.
		self.targetDiv = $(self.el).attr("id");
		self.graphicDiv = self.targetDiv+"graphic";

		self.width = $(self.el).width();
		self.height = self.width * self.heightModifier;

		$(self.el).html(function(){
			return self.legendTemplate({data:self.data,  self:self});
		});

		self.svg = d3.select("#"+self.graphicDiv).append("svg")
		    .attr("width", self.width)
		    .attr("height", self.height);
		
		self.project = d3.geo.mercator()
		    .center(self.center)
		    .rotate(self.rotate)
		    .scale(self.width*self.scaleModifier)
			.translate([self.width / 2, self.height / 2])
			.precision(0);
	
		self.path = d3.geo.path()
			.projection(self.project);

		self.map = self.svg.append("g")
	        .attr("class", "map");

		self.map.selectAll("path")
			.data(self.data)
	    	.enter()
			.append("path")
	    	.attr("d", self.path)
	    	.attr("class", "geography")
    		.attr("fill", function(d){
				return self.geographyFill(d);
    		})
    		.attr("title", function(d){
	    		return self.tooltipTemplate({d:d, self:self});
    		});
    	
    	//fix, all kinds goofy in here	
		self.smallCountries = ["Andorra", "Jersey", "Liechtenstein","Malta", "Monaco","San Marino", "Vatican City"];
		self.spikeLabels = ["block 42", "block 44", "block 46","block 48","block 50","block 52"];
	
		self.mapLabels = self.map.append("g")
			.attr("id", "mapLabels")
			.selectAll(".geographyLabel")
		    .data(self.data)
			.enter().append("text")
		    .attr("class","geographyLabel")
		    .attr("transform", function(d) { return "translate(" + self.path.centroid(d) + ")"; })
			.attr("dx", function(d){
				if (self.mapShapeURL.indexOf("us-simple") > -1){return d.properties.dx;}
				if (d.properties.dx){return d.properties.dx * self.width;}				
			})	
			.attr("dy", function(d){
				if (self.mapShapeURL.indexOf("us-simple") > -1){return d.properties.dy;}
				if (d.properties.dy){return d.properties.dy * self.width;}
				return 0;
			})	
		    .text(function(d,i) { 
				if (self.spikeLabels.indexOf(d.properties.RefName) > -1){return;}

			    if (d.properties[self.labelColumn] == "District of Columbia"){ 
				    if (i == 51){ return "D.C.";}else{return "";}
			    }
			    return d.properties[self.labelColumn]; 
			})
			.classed("left-align", function(d){
	    		if (self.smallCountries.indexOf(d.properties.displaynam) >-1){
		    		return true;
	    		}
    		});

			self.$('.geography').tooltip({
                html: true, 
                constraints: [
                    {
                      to:'window',
                      attachment:"together",
                      pin: true
                    }
                  ]
            });
            		
        self.trigger("renderChart:end")
		//on resize call resize
		$(window).on("resize", _.debounce(function(event) {
			self.update();
		},100));
		
	//end of render
	},
	update: function() {
		var self = this;
        self.trigger("update:start")
		self.width = $(self.el).width();
		self.height = self.width * self.heightModifier;

		self.svg
			.transition()
			.duration(1000)
		    .attr("width", self.width)
		    .attr("height", self.height);

		self.project
			.scale(self.width*self.scaleModifier)
			.translate([self.width / 2, self.height / 2]);

	    self.path = d3.geo.path()
	    	.projection(self.project);

		self.map
		    .selectAll("path")
		    .transition()
			.duration(1000)
	    	.attr("d", self.path);

		self.mapLabels
			.transition()
			.duration(1000)
		    .attr("transform", function(d) { return "translate(" + self.path.centroid(d) + ")"; })
			.attr("dx", function(d){
				if (self.mapShapeURL.indexOf("us-simple") > -1){return d.properties.dx;}
				if (d.properties.dx){return d.properties.dx * self.width;}				
			})	
			.attr("dy", function(d){
				if (self.mapShapeURL.indexOf("us-simple") > -1){return d.properties.dy;}
				if (d.properties.dy){return d.properties.dy * self.width;}
				return 0;
			});
        self.trigger("update:end")

	}, 

//end of view
});










