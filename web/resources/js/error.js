// Convert Circles and Ellipses to Paths
MorphSVGPlugin.convertToPath("ellipse", "circle");
var select = function(s) {
    return document.querySelector(s);
};

// Milk Spill
var milkSpill = new TimelineMax()
    .to('#milk-spill--large', 60, {scale: 1.25, transformOrigin: "right", ease: Power1.easeInOut});

// Face Hover
var face = new TimelineMax({ yoyo: true, repeat: -1 })
    .to('#milk-face', 10, { yPercent: -15, ease: Power1.easeInOut });

// Blink Eyes
var tl = new TimelineMax({repeatDelay:5, repeat:-1, yoyo:true});
tl.to(["#eye-left-open", "#eye-right-open"], 0.10, {transformOrigin:"center", scaleY:0, ease:Power4.easeNone,  repeat:1,  yoyo:true},0);

// Mouth
var frown = 'M368.4 240.8s-15.4-10.5-27.3 3.5';
var mouth = 'M338.4 239.8l32-3.9';

var tlMouth = new TimelineMax({repeatDelay:8, repeat:-1, yoyo:true});
tl.to('#mouth', 3, { morphSVG: { shape: frown }, ease: Back.easeOut.config(1.7) })

var mainTl = new TimelineMax({SVG2GIF:true, repeat:0}).timeScale(1);