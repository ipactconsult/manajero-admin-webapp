import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelanceService } from '../../../../services/relance.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { HistoriqueEmailComponent } from '../../historique-email/historique-email.component';
import { Mail } from '../../../../models/Mail';
import { Relance } from '../../../../models/Relance';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'ngx-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  @Input()id: string;


  relances:Relance;
  constructor(
    private relanceservice: RelanceService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    console.log(this.id);

    this.getEmail();
  }



  getEmail() {
    console.log(this.id);

      this.relanceservice
        .getRelanceByid(this.id)
        .subscribe((relance) => {
          this.relances = relance;
          console.log();
          
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

    const Listmail=this?.relances?.email
    const tableResponsibilityTaskCustomer = this.table(
      Listmail,
      ['objet', 'maile','emetteur'],
      ['objet', 'maile','emetteur'],
      [100, 300,120]
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
