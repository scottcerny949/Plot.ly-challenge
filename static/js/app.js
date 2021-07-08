function init() {
  d3.json("data/samples.json").then((data) => {
    samples = data.names;
    samples.map(samples => +samples)
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

function optionChanged(newData) {
  dataPull(newData);
  makeChart(newData);
}