
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
