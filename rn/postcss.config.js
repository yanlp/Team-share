module.exports = {  
  plugins: {  
    autoprefixer: {  
      browsers: ['last 7 iOS versions', 'last 3 versions', '> 1%']  
    }  
  }  
};


// module.exports = {
//     plugins: [
//         require("postcss-cssnext")(),
//         require("css-declaration-sorter")({
//             order: "concentric-css"
//         }),
//         require("css-mqpacker")(),
//     ]
// };