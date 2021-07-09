// setup initial function for data prior to user using dropdown

function init() {
  d3.json("data/samples.json").then((data) => {
    samples = data.names;
    samples.map(samples => +samples);
    var dropDown = d3.select("#selDataset");

    samples.forEach((sample) => {
      dropDown
      .append("option")
      .attr("key", sample)
      .text(sample)
    });

    var sampleData = samples[0];
    makeChart(sampleData);
    dataPull(sampleData);
  });
};

// Function called by DOM changes
function optionChanged(newData) {
  dataPull(newData);
  makeChart(newData);
}

// function to pull the data from the json
function dataPull(id) {
  
  d3.json("data/samples.json").then((metaData) => {
    sample = metaData.metadata;
    console.log(sample);

    var id = d3.select("#selDataset").node().value;
    var sampleData = sample.filter(sampleObject => sampleObject.id == id);
    var result = sampleData[0];
    var demoData = d3.select("#sample-metadata");
    console.log(sampleData);
    console.log(demoData);

    // clear out the data table
    demoData.html("");
 
    // add the data to the demographics table
    Object.entries(result).forEach(([key,value]) => {
      demoData
      .append("p")
      .text(`${key}: ${value}`);
    });
    makeChart(id);
  });
};

// function for plotting the charts
function makeChart() {
  d3.json("data/samples.json").then((data) => {
    samplesData = data.samples;
    console.log(samplesData);

    // get user id choice and filter
    var id = d3.select("#selDataset").node().value;
    var chartArrays = samplesData.filter(sampleObject =>sampleObject.id == id);
    var result = chartArrays[0];
    var sample_values = result.sample_values;
    console.log(sample_values);
    var otu_ids = result.otu_ids;
    console.log(otu_ids);
    var otu_labels = result.otu_labels;
    console.log(otu_labels);
    var y = otu_ids.slice(0,10).map(option_id => `OTU ${option_id}`).reverse();
  
    // plot the Bar Chart
    var barChart = {
      x: sample_values.slice(0,10).reverse(),
      y: y,
      type: "bar",
      orientation: "h",
      text: otu_labels
    };
    var barData = [barChart];
    var layout = {
      title: "Top 10 Bacteria Culture Found"
    };
    Plotly.newPlot("bar", barData, layout);
    
    // plot the Bubble Chart
    var bubChart = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids
      }
      
    };
    var bubData = [bubChart];
    var bubLayout = {
      xaxis: {title: "OTU ID"},
      title: "Bacteria Cultures Per Sample"     
    };
    Plotly.newPlot("bubble", bubData, bubLayout);
  });
};

init();