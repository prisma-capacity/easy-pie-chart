import { CanvasRenderer } from './canvasRenderer'
import { EasyPieChart } from './easyPieChart'

const easy = new EasyPieChart(document.getElementById("canvas-chart")!, null);

const svg = new EasyPieChart(document.getElementById("svg-chart")!, {
    renderer: "SVG",
    lineWidth: 10
});

