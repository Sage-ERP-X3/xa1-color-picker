"use strict";
// load colorwheel component and its dependencies.
require.shallow('./deps/raphael');
require('./deps/colorwheel/colorwheel');

// load CSS files - none in this case
/*['/xa1-color-picker/public/color-picker.css'].forEach(function(href){
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: href,
    }).appendTo("head");
});*/

// small helper function
function append(parent, tag){
    return parent.appendChild(document.createElement(tag));
}

// add a 'color-picker' widget to the container 
// returns our color widget's API

exports.stylesheets = ["/xa1-color-picker/public/color-picker.css"];

exports.create = function(container){
    if (container.editable) {
        // create two divs, one for the wheel and one for the input
        var wheelDiv = append(container.div, 'div');
        wheelDiv.className = 'xa1-color-picker-wheel';
        var input = append(container.div, 'input');
        input.className = 'xa1-color-picker-input';
        
        // create the wheel and link it to the input field
        var wheel = Raphael.colorwheel(wheelDiv, 150);
        wheel.input(input);
        
        // handle the change event
        wheel.onchange(function(){
            container.setDirty();
        });
        
        // return the widget's API
        return {
            setValue: function(value){
                wheel.color(Raphael.getRGB(value));
            },
            getValue: function(){
                return wheel.color().hex;
            },
        };
    }
    else {
        // create a div for the color sample
        var sample = append(container.div, 'div');
        sample.className = 'xa1-color-picker-sample';
        
        // return the widget's API
        return {
            setValue: function(value){
                sample.style['background-color'] = value;
            },
        };
    }
};
