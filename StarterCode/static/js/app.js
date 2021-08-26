function getData (){
    d3.json("samples.json").then((data) => {
      console.log(data);
      // Creating the dropdown 
      var subjectId = d3.select("#selDataset"); 
      var allIds = data.names; 
    
    
    allIds.map(id => {subjectId.append("option").text(id);
    });

    
     var metadata = data.metadata; 
    
      // Event handlers 
      var subjectId = d3.select("#selDataset");
      subjectId.on("change",getData); 
    
      // ID selection 
      
      var selection = subjectId.property("value");
    
      // Got help to obtain this line. 
      var selected = data.names.indexOf(selection);
    
     // Check this function--> var selected = data.filter(id => id.id == selection);
      // Obtaining the data from "samples"
    
      var sample_values = data.samples[selected].sample_values.slice(0,10).reverse();
      var otu_ids = data.samples[selected].otu_ids.slice(0,10);
      var otu_labels = data.samples[selected].otu_labels.slice(0,10);
      var otuIds = otu_ids.map(d => "OTU " + d)
    
    
    // Create the Trace for the Bar Chart 
        var trace = {
          x: sample_values,
          y: otuIds,
          type: "bar",
          orientation: 'h',
          text: otu_labels
        };
        var dataBar = [trace];
    
    // Define the plot layout
    var layoutBar = {
      title: "Top 10 Bacteria Cultures Found",
      titlefont: {size: 24},
    };
    
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", dataBar, layoutBar);
    
    // ------------------------------------------------- 
    // Create the Trace for the Bubble Chart 
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: sample_values.toString(),
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: 'Portland',
        size: sample_values
      }
    };
    var dataBubble = [trace1];
    
    // Define the Bubble layout
    var layoutBubble = {
    title: "Bacteria Cultures Per Samble",
    titlefont: {size: 24},
    xaxis: {title: "OTU ID"}
    
    };
    
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", dataBubble, layoutBubble);
    
    
    // Table 
    var sampleMetadata = d3.select("#sample-metadata"); 
    sampleMetadata.html("");
    var tableID = metadata.find(element => element.id == selection);
    Object.entries(tableID).find(([key, value]) => {
      sampleMetadata.append("p").text(`${key}: ${value}`);
      })
    
    
    // Exercise with tutor ---> use of .filter() 
    
    var metadataArr = metadata.filter(id => id.id == selection)[0];
    console.log(metadataArr.wfreq);
    
    // Create the Trace for the Gauge Chart 
    
    var dataGauge = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: metadataArr.wfreq,
      title: { text: "Scrubs per week" },
      type: "indicator",
      mode: "gauge",
      text: metadataArr.wfreq,
      gauge: {
        axis: { range: [null, 9] },
      threshold: {
          line: { color: "#8B008B", width: 5 },
          thickness: 0.75,
          value: metadataArr.wfreq},
      steps: [
        { range: [0, 9], color: "#DCDCDC" },
        { range: [1, 2], color: "#DCDCDC" },
        { range: [2, 3], color: "#D3D3D3" },
        { range: [3, 4], color: "#D3D3D3" },
        { range: [4, 5], color: "#C0C0C0" },
        { range: [5, 6], color: "#C0C0C0" },
        { range: [6, 7], color: "#A9A9A9" },
        { range: [7, 8], color: "#A9A9A9" },
        { range: [8, 9], color: "#808080" }],
    
      }
    }];
    
    // Define the Bubble layout
    var layoutBubble = {
    title: "Belly Button Washing Frequency",
    titlefont: {size: 24},
    };
    
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("gauge", dataGauge, layoutBubble);
    
    
    });
    } 
    getData();