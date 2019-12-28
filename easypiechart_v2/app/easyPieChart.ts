class EasyPieChart {
    barColor: string = '#ef1e25';
    trackColor: string = '#f9f9f9';
    scaleColor: string = '#dfe0e0';
    scaleLength: number = 5;
    lineCap: string = 'round';
    lineWidth: number = 3;
    trackWidth?: number;
    size: number = 110;
    rotate: number = 0;
    animate: Object = {
        duration: 1000,
        enabled: true
    };

    easing(_x:number, t:number, b:number, c:number, d:number): number {
        t = t / (d/2);
        if (t < 1) {
            return c / 2 * t * t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    }

    onStart(_from:number, _to:number) {
        return;
    }
    
    onStep(_from:number, _to:number, _currentValue:number) {
        return;
    }

    onStop(_from:number, _to:number) {
        return;
    }
}

