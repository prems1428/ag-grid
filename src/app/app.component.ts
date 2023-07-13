import { Component } from '@angular/core';
import { ColDef, CsvExportParams, ExcelExportParams, GridApi, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { ShareService } from './share.service';
import { Data } from './interface';
import { MyCellComponent } from './my-cell/my-cell.component';
import 'ag-grid-enterprise';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'Test';
   
  row : any = [];
  col !: ColDef[];
  text : any ;
  gridApi !: GridApi<Data>;
  default : ColDef ={
    sortable : true ,
    filter  : true,
    editable:true
  }
  pagination = true;
  pagesize = 10;
  exportType : 'csv' | 'xlsx' | 'pdf' ='csv' ;
  components ={
    'myCell' : MyCellComponent
  }

 constructor(private service : ShareService){
  
   this.col =[{field : 'athlete' , cellRenderer : MyCellComponent,
                cellRendererParams:{
                  buttonText : "Athelete"
                }},  //rowGroup:true,hide:true
               {field : 'age' , cellRenderer : 'myCell',
               },
               {field : 'country',
              cellRenderer : (params : ICellRendererParams)=>{
                return `<b> !! ${params.value} </b>`
              } },
               { field: 'sport'},
             ];
  }

  gridReady(params : GridReadyEvent<Data>){
    this.gridApi = params.api ;
    this.service.getData().subscribe(data=>{
      this.row = data ;
      console.log(this.row)
     });
    this.gridApi.sizeColumnsToFit();
  }
  onSearch(){
    setTimeout(()=>{
      if(this.gridApi){
        this.gridApi.setQuickFilter(this.text);
      }
    },1000);
   
  }
  onClear(){
    this.gridApi.deselectAll();
  }
  onDownload(){
     if(this.gridApi){
      switch(this.exportType){
        case 'csv':
          this.exportCSV();
          break;
        case 'xlsx':
          this.exportXlsx();
          break;
        case 'pdf':
          this.exportPDF();
          break;
      }
     }
  }

  exportCSV(){
     const data : CsvExportParams ={
      suppressQuotes : false
     }
     this.gridApi.exportDataAsCsv(data);
  }
  exportXlsx(){
     const data : ExcelExportParams ={
       sheetName : "TableData"
     }
     this.gridApi.exportDataAsExcel(data);
  }
  exportPDF(){
    
    
  }
 
}


