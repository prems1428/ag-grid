import { Component } from '@angular/core';
import { ColDef, Column, ColumnApi, CsvExportParams, ExcelExportParams, GridApi, GridOptions, GridReadyEvent, SideBarDef } from 'ag-grid-community';
import { ShareService } from '../share.service';
import { IOlympicData } from '../interface';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-row-group',
  templateUrl: './row-group.component.html',
  styleUrls: ['./row-group.component.scss']
})
export class RowGroupComponent {
  rowData : any =[];
  columnDef : ColDef[] = [
    {field : 'athlete' },//, rowGroupIndex : 1 , hide : true
    {field : 'age'},
    {field : 'country' },//,  rowGroupIndex : 0, hide : true
    {field : 'year'},
    {field : 'date'},
    {field : 'sport'},
    {field : 'gold'},
    {field : 'silver'},
    {field : 'bronze'},
    {field : 'total'}
   ];
  gridApi !: GridApi<IOlympicData>;
  columnApi !: ColumnApi ;

  colNames : any ;
  isShow = false;
  exportType : 'csv' | 'xlsx' | 'pdf' ='csv' ;
  text : any ;

  defaultDef : ColDef= {
    sortable: true,
    resizable: true,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true
  }
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';
  public pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' = 'always';
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns'],
  };

  constructor(private rowService : ShareService){ }
  
  gridReady(params : GridReadyEvent<IOlympicData>){
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.rowService.getData().subscribe(data=>{
      this.rowData = data ;
      console.log(this.rowData)
     });
  }
  onYearFirst(){
    this.columnApi.moveColumn('year', 0);
  }
  onYearLast(){
    this.columnApi.moveColumn('year',9);
  }
  onSwapFirstTwo(){
    this.columnApi.moveColumnByIndex(0,1);
    console.log("swap");
    
  }
  onPrintColumn(){
    this.isShow = true;
     const col = this.columnApi.getAllGridColumns();
     console.log("columns",col);
     const colToNameFunc = (col: Column, index: number) =>
     index + ' = ' + col.getId();
     this.colNames = col.map(colToNameFunc).join(', ');
     console.log('columns are: ' + this.colNames);
  }

  exClude(){
    this.gridApi.setColumnDefs(this.colDefsMedalsExcluded);
  }
  inClude(){
    this.gridApi.setColumnDefs(this.columnDefsMedalsIncluded)
  }

   columnDefsMedalsIncluded: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  colDefsMedalsExcluded: ColDef[] = [
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
  ];

  setHeaderNames(){
    const columnDef = this.columnDefsMedalsIncluded;
    columnDef.forEach(function(colDef,index){
      colDef.headerName = "C" + index ;
    });
    this.gridApi.setColumnDefs(columnDef);
  }
  removeHeaderNames(){
    const columnDef = this.columnDefsMedalsIncluded;
    columnDef.forEach(function(colDef,index){
      colDef.headerName = undefined ;
    });
    this.gridApi.setColumnDefs(columnDef);
  }
  setValueFormatters(){
    const columnDef = this.columnDefsMedalsIncluded;
    columnDef.forEach(function(colDef,index){
      colDef.valueFormatter = function (params) {
        return '[ ' + params.value + ' ]';
      };
    });
    this.gridApi.setColumnDefs(columnDef);
  }
  removeValueFormatters(){
    const columnDef = this.columnDefsMedalsIncluded;
    columnDef.forEach(function(colDef,index){
      colDef.valueFormatter = undefined;
    });
    this.gridApi.setColumnDefs(columnDef);
  }
  onRowGroupOn(){
    const columnDef = this.columnDefsMedalsIncluded;
    columnDef.forEach((ColDef)=>{
      if (ColDef.field === 'country') {
        ColDef.rowGroup = true;
      }
    });
    this.gridApi.setColumnDefs(columnDef);
  }
  onRowGroupOff(){
    const columnDef = this.columnDefsMedalsIncluded;
    columnDef.forEach((ColDef)=>{
      if (ColDef.field === 'country') {
        ColDef.rowGroup = false;
      }
    });
    this.gridApi.setColumnDefs(columnDef);
  }
  onSort(){
    this.gridApi.setColumnDefs(this.columnDefsMedalsIncluded);
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
 onSearch(){
  setTimeout(()=>{
    if(this.gridApi){
      this.gridApi.setQuickFilter(this.text);
    }
  },500);
}
onClear(){
  this.gridApi.deselectAll();
}
}
