import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TokenStorageService } from "../../../../../auth/service/token/token.service";
import { ProjectCharter } from "../../../../models/ProjectCharter";
import { ProjectCharterService } from "../../../../services/project-charter/project-charter.service";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: "ngx-export-pdf",
  templateUrl: "./export-pdf.component.html",
  styleUrls: ["./export-pdf.component.scss"],
})
export class ExportPdfComponent implements OnInit {
  id: string;

  @Input() projectCharter: ProjectCharter;
  projectcharter = null;
  constructor(
    private projectCharterService: ProjectCharterService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.projectcharter = this.projectCharter;
  }

  buildTableBody(data: any, columns: any, header: any) {
    const body = [];
    body.push(header);

    data.forEach(function (row: any) {
      const dataRow: any = [];

      columns.forEach(function (column: any) {
        if (column === 'contact') {
          const email= row.contact.email!==null ? row.contact.email :'No Email';
          const phone= row.contact.phone!==null ? row.contact.phone :'No Phone';
          const address= row.contact.address!==null || row.contact.address!=='undefined' ? row.contact.address  :'No Address';

          
          dataRow.push('*Email: '+email.toString()+' | *phone: '+phone+' | *address: '+address);

        } else {
          dataRow.push(row[column].toString());
        }
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
  getProjectCharter() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get("project");
      this.projectCharterService
        .findProjectCharterById(this.id)
        .subscribe((charter) => {
          this.projectCharter = charter;
        });
    });
  }
 
   generatePdf() {
    const problematic = this.projectcharter.problematic || "No Data Found";
    const projectName = this.projectcharter.title;
    const createdDate = this.projectcharter.dateSubmited;
    const productDescription = this.projectcharter.projectDescription;
    const delivery = this.projectcharter.deliveryUnits || [];;
    const tableSuccessCriteria = this.projectcharter.successCriteria|| [];
    const highRisk = this.projectcharter.highRisk || [];
    const keyStakeholder = this.projectcharter.keyStakeholder || [];;
    const are = this.projectcharter.are || [];;
    let responsibilityTASKCustomer=[];
   let responsibilityResourceCustomer=[];
    if(this?.projectcharter?.responsibilityCustomer!==null)
     {responsibilityTASKCustomer = this?.projectcharter?.responsibilityCustomer?.filter(responsibility=>responsibility.responsibilityCategory==='TASK');
     responsibilityResourceCustomer = this?.projectcharter?.responsibilityCustomer?.filter(responsibility=>responsibility.responsibilityCategory==='RESOURCES_STAFFING');
    }
    const budget = this.projectcharter.budget || [];;

    const tableRisk = this.table(
      highRisk,
      ["name", "description"],
      ["Risk", "Possible impacts on the project"],
      [100, 400]
    );
    const tablestakeholder = this.table(
      keyStakeholder,
      ["name", "description"],
      ["name", "Role"],
      [100, 400]
    );

    const tableGoal = this.table(
      this.projectcharter.goal|| [],
      ["name", "description"],
      ["Goal", "Description"],
      [100, 400]
    );
    
    const tableMileStone = this.table(
      this.projectcharter.mileStones|| [],
      ["name", "description"],
      ["MileStones", "Description"],
      [100, 400]
    );
    const tableDelivery = this.table(
      delivery,
      ["name", "description"],
      ["Delivery unit", "Description/Comment"],
      [100, 400]
    );
    const tableAre = this.table(
      are,
      ["category", "item"],
      ["Category", "Item"],
      [100, 400]
    );
    const tableResponsibilityTaskCustomer = this.table(
      responsibilityTASKCustomer,
      ['item', 'comment','contact'],
      ['item',  'comment','contact'],
      [100, 280,140]
    );
    const tableResponsibilityResourceCustomer = this.table(
      responsibilityResourceCustomer,
      ['item', 'comment','contact'],
      ['item',  'comment','contact'],
      [100, 280,140]
      );
      const tableBudget = this.table(
        budget,
        ["area", "amount"],
        ["Area", "Amount"],
        [300, 200]
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
                "Ipacr Consult",
                "",
                
                "Résidence la Baie du lac, Lot 344," +
                  " Cité les Pins, angle Boulevard du Lac Nord," +
                  " Lac 2, Tunis, Tunisie",
                  
              ],
            ],
          },
        },
        {
          text: "Project Charter®",
          style: "header",
        },
        {
          text: projectName,
          style: "header",
          marginBottom: 100
        },

        // to treat a paragraph as a bulleted list, set an array of items under the ul key

        { text: "Project Name: " + projectName, style: "info"  },
        { text: "title: Project Charter", style: "info" },
        { text: "Author : ", style: "info" },
        { text: "Date created: " + createdDate, style: "info" },
        { text: "Content:  ", style: "subheader",marginBottom: 50,marginTop: 30
      },

        {
          text:
            "1	Background/description of problem	\n" +
            "2	Goals	\n" +
            "2.1	Goals	\n" +
            "2.2	Scheduling goal\n" +
            "3	Project product description\n" +
            "4	Delivery units\n" +
            "4.1	Delivery units / services	\n" +
            "5	Project success criteria	\n" +
            "6	Risks	\n" +
            "7	Assumptions, restrictions and external dependencies	\n" +
            "8	Responsibility of the customer\n" +
            "8.1	Tasks	\n" +
            "8.2	Resources and staffing\n	" +
            "9	Project category	\n" +
            "10	Project budget (overview)\n	" +
            "11	Project startup	\n" +
            "12	Project end	\n" +
            "12.1	Signatures for release ",
          style: "content",
        },
        {
          text: "1.Background/Project purpose or justification",
          style: "subheader",
        },
        problematic.name,
        problematic.description,
        {
          text: "2.Goals",
          style: "subheader",
        },
        {
          text: "2.1.Goals",
          style: "subsubheader",
        },

        tableGoal,

        {
          text: "2.2 Scheduling goals/milestones",
          style: "subsubheader",
        },

        tableMileStone,

       
        {
          text: "3. Project product description",
          style: "subheader",
        },
        productDescription,
        {
          text: "4 Delivery units",
          style: "subsubheader",
        },

        tableDelivery,
        {
          text: "5 Project success criteria",
          style: "subsubheader",
        },
        {
          layout: "",
          table: {
            style: "table",
            headerRows: 1,
            widths: [500],
            body: [
              ["Project success criteria"],
              ...tableSuccessCriteria.map((suucess) => [suucess]),
            ],
          },
        },
        {
          text: "6 High-level risks",
          style: "subsubheader",
        },
        tableRisk,
        {
          text: "7 Key Stakeholders",
          style: "subsubheader",
        },
        tablestakeholder,
        {
          text: "8 Assumptions, restrictions and external dependencies",
          style: "subsubheader",
        },
        tableAre,
        {
          text: "9 Responsibility of the customer",
          style: "subsubheader",
        },
        {
          text: ".    9.1 Tasks",
          style: "subsubheader",
        },
        tableResponsibilityTaskCustomer,
        {
          text: ".    9.2 Resources and staffing ",
          style: "subsubheader",
        },
        tableResponsibilityResourceCustomer,
        {
          text: "10 Project category",
          style: "subsubheader",
        },
        {
          text: "11 Project budget (overview)",
          style: "subsubheader",
        },
        tableBudget,
        {
          text: "12 Project Startup",
          style: "subsubheader",
        },
        {
          layout: "lightHorizontalLines", // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [60, 150, 150,150],
            heights: 50,
            body: [
              [
                "",
                "Representative of steering committee", 
                "Customer",
                "Project manager",
                  
              ],
              [
                "Signature",
                "",
                
                "",
                "",
                  
              ],
              [
                "Name",
                "",
                
                "",
                "",
                  
              ],
              [
                "Date",
                "",
                
                "",
                "",
                  
              ],
            ],
          },
        },
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
