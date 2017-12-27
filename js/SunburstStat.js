class SunburstStat{
	constructor(){

	}

	update(data){
		var nodeData = {
	        "name": "TOPICS", "children": [{
	            "name": "Topic A",
	            "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
	        }, {
	            "name": "Topic B",
	            "children": [{"name": "Sub B1", "size": 3}, {"name": "Sub B2", "size": 3}, {
	                "name": "Sub B3", "size": 3}]
	        }, {
	            "name": "Topic C",
	            "children": [{"name": "Sub A1", "size": 4}, {"name": "Sub A2", "size": 4}]
	        }]
	    };

	    // Variables
	    var width = 300;
	    var height = 300;
	    var radius = Math.min(width, height) / 2;
	    var color = d3.scaleOrdinal(d3.schemeCategory20b);

	    // Create primary <g> element
	    var g = d3.select('#Sunburst')
	        .attr('width', width)
	        .attr('height', height)
	        .append('g')
	        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

	    // Data strucure
	    var partition = d3.partition()
	        .size([2 * Math.PI, radius]);

	    // Find data root
	    var root = d3.hierarchy(nodeData)
	        .sum(function (d) { return d.size});

	    // Size arcs
	    partition(root);
	    var arc = d3.arc()
	        .startAngle(function (d) { return d.x0 })
	        .endAngle(function (d) { return d.x1 })
	        .innerRadius(function (d) { return d.y0 })
	        .outerRadius(function (d) { return d.y1 });

	    // Put it all together
	    g.selectAll('path')
	        .data(root.descendants())
	        .enter().append('path')
	        .attr("display", function (d) { return d.depth ? null : "none"; })
	        .attr("d", arc)
	        .style('stroke', '#fff')
	        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });
	}
}