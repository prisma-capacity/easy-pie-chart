import { CanvasRenderer } from './CanvasRenderer'

const canvas = new CanvasRenderer(document.getElementById('chart')!, {
    barColor: '#ef1e25',
    trackColor: '#f9f9f9',
    scaleColor: '#dfe0e0',
    scaleLength: 5,
    lineCap: 'round',
    lineWidth: 10,
    trackWidth: undefined,
    size: 200,
    rotate: 0,
    animate: {
        duration: 1000,
        enabled: true
    }
});

canvas.draw(80)