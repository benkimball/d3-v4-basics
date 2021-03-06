Progressive Enhancement
Or, Only Do Little Bits At A Time

Step 1: Hello, World.

Begin with local data. Generate one paragraph per datum, display data as content of paragraph tag. :step1:

Step 2: Sorting

Hey, those aren't in alphabetical order! I want to sort them. :step2:

Step 3: Generating SVG

OK, but I want a histogram plot, not a bunch of text. To create a plot, we're going to need to transform the data into SVG elements instead of HTML elements. Our initial goal is a column of rectangles. To plot a rectangle, we need to know where its top-left corner is, plus its height and width. :step3:

Step 4: Browsers Apply CSS to SVG Elements

This plot is ugly. Let's make it a little easier on the eyes. Hey, we can just use CSS! :step4:

Step 5: Scales

We've got a lot of magic numbers in our script. Each bar is a fixed height and placed at a fixed y-location regardless of the size of the plot. And each bar's width in pixels is exactly equal to its count. If we want to change the size of the plot, we'll have to recalculate all of those numbers by hand. D3 provides scale objects that will do a much better job of determining where our rectangles should be placed. Notice that the top border of the top bar has reappeared. Try changing the values of width and height.

Step 6: Margins

So far I've been ignoring the fact that this histogram is useless; it doesn't tell us which category is represented by which bar. There are a number of ways to display this information, but we'll use conventional axes. But before we jump in to the details of the D3 axis object, we need to address the lack of margins in our plot. Right now there's no space for an axis to live. We'll use Mike Bostock's margin convention, http://bl.ocks.org/mbostock/3019563.

Step 7: Axes

Our first goal is to draw a horizontal axis with appropriate tick marks to show the values. Our second goal is to print the name of each category to the left of its associated bar. You could draw all of these things yourself by doing a bunch of math and then appending SVG text and line elements, but that would be dumb. Use D3!

Step 8: Troubleshooting

Wait a minute. What happened to our sorting? Our new Y axis shows us that we're no longer sorting by category name. How can we be sure that our plot is using the right data? Well, let's start by adding tooltips to the bars to make sure that we don't have a mismatch between the axis labels and the bars.

Nope, okay, so what changed? Well, we're now using the output of the y() function to determine the vertical position of each bar, and y() is an axis object. Let's check its API: https://github.com/d3/d3-axis. Nope, nothing about sorting or ordering there. But remember that we created the axis using an ordinal scale object, so let's check that: https://github.com/d3/d3-scale/blob/master/README.md#scaleOrdinal. Bingo! The description of the domain([values]) function says in part, "[i]f domain is specified, sets the domain to the specified array of values. The first element in domain will be mapped to the first element in the range, the second domain value to the second range value, and so on." And when we call axis.domain(), we're passing in an unsorted list of category names.

So how do we fix it? First, for clarity, let's put all of our plotting code into a function and all of our data loading code into a different function. Now we just need to perform the data sort at the beginning of the plotting code.

Finally, while we're cleaning things up, let's add an accessor functions for category, since we call that function repeatedly.
