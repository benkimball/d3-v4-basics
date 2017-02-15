/*
 * Data setup
 *
 * associate a random number between 0 and 100 for each Tumblr post type
 * we'll use this as our data to display in a bar chart
 * the value of the `data` variable will have the form:
 * [{category: "foo", count: 23}, {category: "bar", count: 31}]
 */

function load_data() {
  var category_names = [
    "video", "link", "photo", "audio", "chat", "quote", "answer", "text"
  ];
  function rnd_hist(labels) {
    var hist = [], ct = 0;
    labels.forEach(function(label) {
      ct = Math.floor(Math.random()*100);
      hist.push({category:label, count:ct});
    });
    return(hist);
  };
  return(rnd_hist(category_names));
};

/*
 * Plot a histogram of category counts.
 */
function plot(data, dimensions) {
  /* accessors */
  function category(d) { return d.category; }
  function count(d) { return d.count; }

  /* comparators */
  function category_order(a, b) {
    if(a.category > b.category) return 1;
    else if(a.category < b.category) return -1;
    return 0;
  };

  data = data.sort(category_order);
 
  /* d3 "Conventional Margins": http://bl.ocks.org/mbostock/3019563 */
  var margin = {top: 20, right: 10, bottom: 20, left: 60};
  var width = dimensions.width - margin.left - margin.right,
      height = dimensions.height - margin.top - margin.bottom;

  /* Create the root SVG element */
  var svg = d3
    .select("body")
      .append("svg")
        .attr("class", "plot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  /*
   * Set up scales for the X and Y axes
   */
  var x = d3.scaleLinear()
          .domain([0, 100])
          .rangeRound([0, width]),
      y = d3.scaleBand()
          .domain(data.map(category))
          .range([0, height])
          .padding(0.1);

  /*
   * Set up SVG axes for the plot
   */
  var xAxis = d3.axisBottom(x),
      yAxis = d3.axisLeft(y);

  /*
   * Draw the axes
   */
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,"+height+")")
      .call(xAxis);
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  /* Plot a rectangle for each category */
  svg
    .selectAll(".category") // create (empty) selection
    .data(data.sort(category_order)) // perform data join, returning "update" selection
    .enter() // retrieve "enter" selection
    .append("rect") // for each item in the "enter" selection, append a <rect> SVG element
      .attr("class", "category") // whose class attribute is "category"
      .attr("x", 0.5) // and whose left side is at the left edge of the SVG
      .attr("width", function(d) { return x(d.count); }) // whose width is exactly the count for the category
      .attr("y", function(d, i) { return y(d.category); }) // whose top edge is 20px down the page per item
      .attr("height", y.bandwidth()); // and whose height is 10px


}

plot(load_data(), {width: 600, height: 300});

