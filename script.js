/*
 * Data setup
 *
 * associate a random number between 0 and 100 for each Tumblr post type
 * we'll use this as our data to display in a column chart
 * the value of the `data` variable will have the form:
 * [{category: 'foo', count: 23}, {category: 'bar', count: 31}]
 */

var data = rnd_hist([
  "video", "link", "photo", "audio", "chat", "quote", "answer", "text"
]);

/*
 * Plotting
 */

/* Create a 600x300 SVG element and append it to <body> with class `plot` */
var svg = d3
  .select("body")
    .append("svg")
      .attr("class", "plot")
      .attr("width", 600)
      .attr("height", 300);

svg
  .selectAll('.category') // create (empty) selection
  .data(data.sort(category_order)) // perform data join, returning 'update' selection
  .enter() // retrieve 'enter' selection
  .append('rect') // for each item in the 'enter' selection, append a <rect> SVG element
    .attr('class', 'category') // whose class attribute is 'category'
    .attr('x', 0.5) // and whose left side is at the left edge of the SVG
    .attr('width', function(d) { return d.count; }) // whose width is exactly the count for the category
    .attr('y', function(d, i) { return i * 20 + 0.5; }) // whose top edge is 20px down the page per item
    .attr('height', 10); // and whose height is 10px


/*
 * Utility functions
 */

function rnd_hist(labels) {
  var hist = [], ct = 0;
  labels.forEach(function(label) {
    ct = Math.floor(Math.random()*100);
    hist.push({category:label, count:ct});
  });
  return(hist);
};

function category_order(a, b) {
  if(a.category > b.category) return 1;
  else if(a.category < b.category) return -1;
  return 0;
};
