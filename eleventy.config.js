var handlebars = require('handlebars');
var paginate = require('handlebars-paginate');
handlebars.registerHelper('paginate', paginate);
const fs = require('fs');
handlebars.registerPartial('pagination', '{{pagination}}');



// this is the custom registered helper that check if 2 expressions are equivalent    
handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

//  this is another custom helper that increments the value by 1
handlebars.registerHelper('inc', function(value) {
  return parseInt(value) + 1;
});




module.exports = function(eleventyConfig) {
  // Copy `img/` to `_site/img as well as the css to the cite css`
	eleventyConfig.addPassthroughCopy("./src/css");
  // Copy `img/` to `_site/img`
	eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addWatchTarget("./src/css/");

  eleventyConfig.on("eleventy.before", async ({dir, runMode, outputMode}) =>{
    console.log('starting to build')
    // console.log(dir.output)
    fs.rmSync(dir.output, {recursive: true, force: true });
  });

  eleventyConfig.on("eleventy.after", async ({dir, runMode, outputMode}) =>{
    console.log('The built is completed')  
  });

  
  

  eleventyConfig.setLibrary("hbs", handlebars);

    // Return your Object options:
  return {
      dir: {
        input: "src",
        output: "dist"
      }
  }
};