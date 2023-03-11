import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Relance } from '../../../models/Relance';
import { RelanceService } from '../../../services/relance.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'ngx-pdfpormise',
  templateUrl: './pdfpormise.component.html',
  styleUrls: ['./pdfpormise.component.scss']
})
export class PdfpormiseComponent implements OnInit {
  id: string;

  relances:Relance;
  constructor(
    private relanceservice: RelanceService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.getEmail();
  }



  getEmail() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("id");
      this.relanceservice
        .getRelanceByid(this.id)
        .subscribe((relance) => {
          this.relances = relance;
          console.log();
          
        });
    });
  }


  buildTableBody(data: any, columns: any, header: any) {
    const body = [];
    body.push(header);

    data.forEach(function (row: any) {
      const dataRow: any = [];

      columns.forEach(function (column: any) {
      
          dataRow.push(row[column].toString());
        
      });

      body.push(dataRow);
    });

    return body;
    };

   
  
  table(data: any, columns: any, header: any,width: any[]) {
    return {
      layout: "",
      style: "table",

      table: {
        headerRows: 1,
        widths: width,

        body: this.buildTableBody(data, columns, header),
      },
    };
  }

 
   generatePdf() {

    const Listmail=this?.relances?.promise
    console.log(this.relances);
    const tableResponsibilityTaskCustomer = this.table(
      Listmail,
      ['amount'],
      ['amount' ],
      [300]
    );
    const docDefinition = {
      content: [
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [170, 170, 170],

            body: [
              [
                "Ipact Consult",
                "",
                
                "Résidence la Baie du lac, Lot 344," +
                  " Cité les Pins, angle Boulevard du Lac Nord," +
                  " Lac 2, Tunis, Tunisie",
                  
              ],
            ],
          },
        },
        {
          text: "Invoice Payment ®",
          style: "header",
        },
      

        // to treat a paragraph as a bulleted list, set an array of items under the ul key

       
      
       

      

        
       
      
       
        tableResponsibilityTaskCustomer,
        
        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginLeft: 200,
        },
        info: {
          fontSize: 12,
          bold: true,
          marginLeft: 200,

        },
        table: {
          bold: true,
          marginBottom: 50,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        content: {
          fontSize: 12,
          bold: true,
          marginBottom: 90,
          marginLeft:50,
        },
        subsubheader: {
          marginTop: 30,
          marginBottom: 20,

          fontSize: 13,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }


}
