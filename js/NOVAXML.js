var NOVA = NOVA || {
    create: function(){
    },
    start: function(){
    },
    Schedule: function(){
        
        //Change these to prototype
        this.toCSV = function(){
        };
        this.toXML = function(){
        };
        this.toICAL = function(){
        };
    },
    week: function(nr, parent){
        
        var days = {};
        
        var get = function(loc, scale, completeFn, textAnalysisFn){
            if (typeof PDFJS === 'undefined') {
                alert('Built version of pdf.js is not found\nPlease run `node make generic`');
                return;
            }
            
            PDFJS.getDocument(loc).then(function(pdf) {
                pdf.getPage(1).then(function(page) {
                    
                    var viewport;
                    //Make folowing a function?
                    if(scale.width || scale.height){
                        //if scale is sent as an object {width: int, height: int, prio: 'max/min'}
                        viewport = page.getViewport(1);
                        
                        if(!scale.height){
                            //if only width is sent
                            viewport = page.getViewport(scale.width/viewport.width);
                        }else if(!scale.width){
                            //if only height is sent
                            viewport = page.getViewport(scale.height/viewport.height);
                        }else{
                            //if both are defined chose priority of scale; min/max value. If scale.prio not defined, set it to min
                            //min/max works as as css-background css contain/cover
                            var widhtChange = scale.width/viewport.width,
                                heightChange = scale.height/viewport.height;
                            
                            if(scale.prio == 'max'){
                                viewport = page.getViewport(Math.max(widhtChange,heightChange));
                            }else{
                                viewport = page.getViewport(Math.min(widhtChange,heightChange));
                            }
                        }
                        
                    }else if(!isNaN(parseFloat(scale))){
                        //if scale is scale value
                        viewport = page.getViewport(scale);
                    }else{
                        //if scale is not understood
                        viewport = page.getViewport(1);
                    }
                    
                    var canvas = document.querySelector('canvas');
                    var context = canvas.getContext('2d');
                    
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    canvas.parentElement.style.width = viewport.width + 'px';
                    
                    
                    page.getTextContent().then(function(textContent) {
                                                
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        
                        var render;
                        
                        if(typeof textAnalysisFn === 'function')
                            render = textAnalysisFn(renderContext);
                        
                        if(render !== false){
                            var renderObj = page.render(renderContext);
                            if(typeof completeFn === 'function')
                                renderObj.then(completeFn);
                        }
                    });
                });
            });
        };
    }
};

window.onload = createStuff;

function createCanvasImage(canvas){
    var el = document.createElement('div');
    el.style.backgroundImage = 'url(' + canvas.toDataURL('data:image/png') + ')';
    el.style.width = canvas.width + 'px';
    el.style.height = canvas.height + 'px';
    canvas.parentElement.appendChild(el);
    //canvas.parentElement.removeChild(canvas);
}

function createStuff(){
    var container = document.getElementById('pdfContainer');

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    container.appendChild(canvas);
    
    var tmp = new NOVA.Week();
    tmp.get('Schedule.pdf', {width:Math.min(document.body.getBoundingClientRect().width-20, 900),height:10,prio:'max'});
}