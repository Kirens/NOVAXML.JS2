var NOVA = NOVA || {};

NOVA.PDF = function(object) {

}
NOVA.buildPDF = function() {
    //var pdfSource = "php/phpProxy.php?id=951101-8914&week=7";
    PDFJS.getDocument("Schedule.pdf").then(function(pdf) {
        pdf.getPage(1).then(function(page) {


            var scale = 1.5;
            PDFJS.workerSrc = '../../build/generic/build/pdf.worker.js';
            var viewport = page.getViewport(scale);

            var canvas = document.createElement("canvas");
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;



            var container = document.getElementById("pdfContainer");
            container.appendChild(canvas);

            var textLayerDiv = document.createElement("div");
            container.appendChild(textLayerDiv);

            page.getTextContent().then(function(textContent) {
                var textLayer = new TextLayerBuilder(textLayerDiv, viewport, 0);
                textLayer.setTextContent(textContent);
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                page.render(renderContext);
            });







            /*page.getTextContent().then(function(textContent) {
                var textLayerBuilder = new TextLayerBuilder(textLayerDiv, viewport, 0);
                textLayerBuilder.setTextContent(textContent);
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);


            });*/
            /*var renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                    textLayer: textLayerDiv
                };
                page.render(renderContext);*/

            /*page.getTextContent().then(function(textContent){
                
            });*/

        });
    });
}
NOVA.startNova = function(id, school, startWeek, stopWeek, container) {
    NOVA.buildPDF();
}
NOVA.init = function() {

}



function Call() {
    this.fieldArray = [];
    this.queryArray = [];
}

//Create XMLConverter class.
function XMLConverter() {
    this.weeks = [];
}
XMLConverter.prototype.appendWeek = function(week) {
    alert("test");
}