import { Component, ViewChild, OnInit, ElementRef, AfterViewInit } from '@angular/core';

declare const WebViewer: any;

@Component({
  selector: 'ngx-pdftron-viewer',
  templateUrl: './pdftron-viewer.component.html',
  styleUrls: ['./pdftron-viewer.component.scss']
})
export class PdftronViewerComponent implements OnInit, AfterViewInit {

  @ViewChild('viewer') viewer: ElementRef;

  wvInstance: any;

  constructor() { }

  ngOnInit(): void {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const { documentViewer, annotationManager, Annotations } = this.wvInstance.Core;
    // and access classes defined in the WebViewer iframe
    const rectangle = new Annotations.RectangleAnnotation();
    rectangle.PageNumber = 1;
    rectangle.X = 100;
    rectangle.Y = 100;
    rectangle.Width = 250;
    rectangle.Height = 250;
    rectangle.StrokeThickness = 5;
    rectangle.Author = annotationManager.getCurrentUser();
    annotationManager.addAnnotation(rectangle);
    annotationManager.drawAnnotations(rectangle.PageNumber);
    // see https://www.pdftron.com/api/web/WebViewerInstance.html for the full list of low-level APIs
  }

  ngAfterViewInit(): void {
    // The following code initiates a new instance of WebViewer.

    WebViewer({
      path: '../../wv-resources/lib',
      enableFilePicker: true,
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf',
      
    }, this.viewer.nativeElement).then(instance => {
      this.wvInstance = instance;
      
      // now you can access APIs through this.webviewer.getInstance()
      instance.UI.openElement('notesPanel');
      // see https://www.pdftron.com/documentation/web/guides/ui/apis
      // for the full list of APIs

      // or listen to events from the viewer element
      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        const [ pageNumber ] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      // or from the docViewer instance
      instance.Core.documentViewer.addEventListener('annotationsLoaded', () => {
        console.log('annotations loaded');
      });

      instance.Core.documentViewer.addEventListener('documentLoaded', this.wvDocumentLoadedHandler)
    })
  }

}
