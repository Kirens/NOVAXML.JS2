var NOVA = NOVA || {};

window.onload = function() {
    if (typeof PDFJS === 'undefined') {
        alert('Built version of pdf.js is not found\nPlease run `node make generic`');
        return;
    }

    var scale = 1.5; //Set this to whatever you want. This is basically the "zoom" factor for the PDF.
    //PDFJS.workerSrc = '../../build/generic/build/pdf.worker.js';

    PDFJS.getDocument("Schedule.pdf").then(function(pdf) {
        pdf.getPage(1).then(function(page) {

            var scale = 1.5;
            var viewport = page.getViewport(scale);

            var container = document.getElementById("pdfContainer");
            
            var canvas = document.createElement("canvas");
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            container.appendChild(canvas);

            var textLayerDiv = document.createElement("div");
            container.appendChild(textLayerDiv);

            page.getTextContent().then(function(textContent) {
                var textLayer = new TextLayerBuilder({
                    textLayerDiv: textLayerDiv,
                    viewport: viewport,
                    pageIndex: 0
                });
                
                //Enable this line to render divs contiaining the content of the pdf. 
                //textLayer.setTextContent(textContent); 
                
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);


            });


        });
    });
};