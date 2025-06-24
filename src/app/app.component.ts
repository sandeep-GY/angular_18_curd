import { Component, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup=new FormGroup({});
  employeeObj: EmployeeModel =new EmployeeModel();
  employeeList: EmployeeModel[]=[];
  Contructor()
  {
    debugger;
    this.createForm();
    const oldData=localStorage.getItem("EmpData");
    if(oldData!=null)
      {
        const parseData=JSON.parse(oldData);
        this.employeeList=parseData
      }
  }
  createForm()
  {
    debugger;
    this.employeeForm=new FormGroup({
      empid:new FormControl(this.employeeObj.empId),
      PinCode:new FormControl(this.employeeObj.PinCode),
      address:new FormControl(this.employeeObj.address),
      city:new FormControl(this.employeeObj.city),
      emailId:new FormControl(this.employeeObj.emailId),
      name:new FormControl(this.employeeObj.name),
      state:new FormControl(this.employeeObj.state),
      contactNo:new FormControl(this.employeeObj.contactNo),
    })
  }
  onsave()
  {
    debugger;
    const oldData=localStorage.getItem("EmpData");
    if(oldData!=null)
      {
          const parseData= JSON.parse(oldData);
          this.employeeForm.controls['empid'].setValue(parseData.length+ 1);
          this.employeeList.unshift(this.employeeForm.value);
      }  
      else{
         this.employeeList.unshift(this.employeeForm.value);
        
      }
       localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
        this.employeeObj=new EmployeeModel();
        this.createForm();
  }
  onEdit(item:EmployeeModel)
  {
    debugger;
   this.employeeObj=item;
   this.createForm()
  }
  onUpdate()
  {
    debugger;
    const record=this.employeeList.find(m=>m.empId==this.employeeForm.controls['empid'].value);
    if(record!=undefined)
    {
          record.address=this.employeeForm.controls['empid'].value;
          record.name=this.employeeForm.controls['name'].value;
          record.contactNo=this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    this.employeeObj=new EmployeeModel();
    this.createForm();
  }
  onDelete(id:number)
  {
    debugger;
    const isDelete= confirm("are you sure you want to delete?");
    if(isDelete)
    {
      const index= this.employeeList.findIndex(m=>m.empId==id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData",JSON.stringify(this.employeeList));
    }
  }
  trackByIndex(index: number, item: any): number {
    debugger;
  return index;
}
}
