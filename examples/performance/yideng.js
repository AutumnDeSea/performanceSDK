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
                console.log('fcp的值为--》', entry.startTime)
            }
        }
        const po = this.observer('paint', handle);    
    }
    getFID() {
        // const observer = new PerformanceObserver((list, obj) => {
            // console.log('🚗🚗-hahah -》',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('自己的fcp--》', entry.startTime)
            //     }
            // })
            // console.log('🚗🚗-hahah -》', obj)
        //  });
        //  observer.observe({type: 'first-input', buffered: true});
    }
    getCLS() {
        // const observer = new PerformanceObserver((list, obj) => {
        //     console.log('🚗🚗-hahah -》',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('自己的fcp--》', entry.startTime)
            //     }
            // })
            // console.log('🚗🚗-hahah -》', obj)
        //  });
        //  observer.observe({type: 'layout-shif', buffered: true});
    }
    getLCP() {
        // const observer = new PerformanceObserver((list, obj) => {
            // console.log('🚗🚗-hahah -》',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('自己的fcp--》', entry.startTime)
            //     }
            // })
            // console.log('🚗🚗-hahah -》', obj)
        //  });
        //  observer.observe({type: 'largest-contentful-paint', buffered: true});
    }
    getTTFB() {
        // const observer = new PerformanceObserver((list, obj) => {
            // console.log('🚗🚗-hahah -》',  list.getEntries())
            // list.getEntries().forEach(entry => {
            //     if(entry.name == 'first-contenful-paint') {
            //         console.log(entry.startTime)
            //         console.log('自己的fcp--》', entry.startTime)
            //     }
            // })
            // console.log('🚗🚗-hahah -》', obj)
        //  });
        //  observer.observe({type: 'largest-contentful-paint', buffered: true});
    }


}
export default Dali;