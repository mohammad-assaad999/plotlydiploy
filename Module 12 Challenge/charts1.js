// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var resultArray1 = samples.filter(sampleObj => sampleObj.id == sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray2 = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var result1 = resultArray1[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var result2 = resultArray2[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    console.log(otu_ids);

    var otu_labels = result.otu_labels;
    console.log(otu_labels);

    var sample_values = result.sample_values;
    console.log(sample_values);

    // 3. Create a variable that holds the washing frequency.
    var washing_frequency = result2.wfreq;
    console.log(washing_frequency);

    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    console.log(yticks);

    // Use Plotly to plot the bar data and layout.
    var barData = [{
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h',
    }];

    var barLayout = {
    title: "Top 10 Bacteria Cultures Found"
    };

    Plotly.newPlot('bar', barData, barLayout)
    
    // Use Plotly to plot the bubble data and layout.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values}
    }];

    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU ID'},
      hovermode: 'closest'      
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: washing_frequency,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number"
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 500, margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
