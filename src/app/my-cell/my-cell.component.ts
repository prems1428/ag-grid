import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface myCellParams{
  buttonText ? : string;
}

@Component({
  selector: 'app-my-cell',
  templateUrl: './my-cell.component.html',
  styleUrls: ['./my-cell.component.scss']
})
export class MyCellComponent implements ICellRendererAngularComp {
 
  value : any ;
  buttonText : string = "Default" ;
 
  agInit(params: ICellRendererParams<any, any, any> & myCellParams): void {
    this.value = params.value ;
    this.buttonText = params.buttonText ?? 'Default';
    }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true ;
  }
  onBtnClick(){
    alert(`The ${this.buttonText} Value is ` +this.value);
  }

}
