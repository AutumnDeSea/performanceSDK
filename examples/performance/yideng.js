class Dali {
    constructor() {
        this.getFCP()
        this.getFID()
    }
    observer(type, callback) {
        const po = new PerformanceObserver((list) => {
            list.getEntries().map(callback)
        })
        po.observe({type, buffered: true})
        return po
    }
    getFCP() {
        const handle = (entry) => {
            if(entry.name == 'first-contentful-paint') {
                if(po) {
                    po.disconnect()
                }
                console.log('fcpηεΌδΈΊ--γ', entry.startTime)
            }
        }
        const po = this.observer('paint', handle);    
    }
    getFID() {
        // const observer = new PerformanceObserver((list, obj) => {
            // console.log('ππ-hahah -γ',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('θͺε·±ηfcp--γ', entry.startTime)
            //     }
            // })
            // console.log('ππ-hahah -γ', obj)
        //  });
        //  observer.observe({type: 'first-input', buffered: true});
    }
    getCLS() {
        // const observer = new PerformanceObserver((list, obj) => {
        //     console.log('ππ-hahah -γ',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('θͺε·±ηfcp--γ', entry.startTime)
            //     }
            // })
            // console.log('ππ-hahah -γ', obj)
        //  });
        //  observer.observe({type: 'layout-shif', buffered: true});
    }
    getLCP() {
        // const observer = new PerformanceObserver((list, obj) => {
            // console.log('ππ-hahah -γ',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('θͺε·±ηfcp--γ', entry.startTime)
            //     }
            // })
            // console.log('ππ-hahah -γ', obj)
        //  });
        //  observer.observe({type: 'largest-contentful-paint', buffered: true});
    }
    getTTFB() {
        // const observer = new PerformanceObserver((list, obj) => {
            // console.log('ππ-hahah -γ',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('θͺε·±ηfcp--γ', entry.startTime)
            //     }
            // })
            // console.log('ππ-hahah -γ', obj)
        //  });
        //  observer.observe({type: 'largest-contentful-paint', buffered: true});
    }


}
export default Dali;