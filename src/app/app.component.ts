import { Component, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule,Validators,FormBuilder } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup;
  employeeObj: EmployeeModel =new EmployeeModel();
  employeeList: EmployeeModel[]=[];
  showUpdateButton = false;
  constructor(private http: HttpClient) {
    this.employeeForm = new FormGroup({
      empId: new FormControl(''),
      PinCode: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      emailId: new FormControl(''),
      name: new FormControl(''),
      state: new FormControl(''),
      contactNo: new FormControl(''),
    });
    // Removed localStorage usage
    // const oldData = localStorage.getItem("EmpData");
    // if (oldData != null) {
    //   const parseData = JSON.parse(oldData);
    //   this.employeeList = parseData;
    // }
  }
  ngOnInit() {
    this.getEmployees();
  }

 getEmployees() {
  debugger;
  this.http.get<any>('https://localhost:7139/api/Employee').subscribe({
    next: (data) => {
      if (Array.isArray(data)) {
        this.employeeList = data;
      } else if (data) {
        this.employeeList = [data];
      } else {
        this.employeeList = [];
      }
      console.log('Employee list:', this.employeeList);
    },
    error: () => {
      alert('Failed to fetch employee data!');
    }
  });
}

  createForm() {
    this.employeeForm.reset({
      empId: '',
      PinCode: '',
      address: '',
      city: '',
      emailId: '',
      name: '',
      state: '',
      contactNo: ''
    });
  }
  onsave() {
    debugger;
    const employeeData = this.employeeForm.value;
    employeeData.empId =  0; // Ensure empId is set
    this.http.post('https://localhost:7139/api/Employee', employeeData).subscribe({
      next: (response) => {
        // Optionally update local list/UI after successful API call
        let newempId = 1;
        if (this.employeeList.length > 0) {
          const maxId = Math.max(...this.employeeList.map(emp => Number(emp.empId) || 0));
          newempId = maxId + 1;
        }
        this.employeeForm.get('empId')?.setValue(newempId);
        this.employeeList.unshift(this.employeeForm.value);
        this.createForm();
        this.showUpdateButton = false;
        this.getEmployees();
        alert('Employee created successfully!');
      },
      error: (err) => {
        alert('Failed to create employee!');
      }
    });
  }
  onEdit(item: EmployeeModel) {
    debugger;
    this.employeeForm.patchValue({
      empId: item.empId,
      PinCode: item.PinCode,
      address: item.address,
      city: item.city,
      emailId: item.emailId,
      name: item.name,
      state: item.state,
      contactNo: item.contactNo
    });
    this.showUpdateButton = true;
  }
  onUpdate() {
    debugger;
    const empId = this.employeeForm.get('empId')?.value;
    const employee = this.employeeForm.value;
    this.http.put(`https://localhost:7139/api/Employee/${empId}`, employee).subscribe({
      next: () => {
        const record = this.employeeList.find(m => m.empId == empId);
        if (record != undefined) {
          record.address = this.employeeForm.get('address')?.value;
          record.name = this.employeeForm.get('name')?.value;
          record.contactNo = this.employeeForm.get('contactNo')?.value;
          record.PinCode = this.employeeForm.get('PinCode')?.value;
          record.city = this.employeeForm.get('city')?.value;
          record.emailId = this.employeeForm.get('emailId')?.value;
          record.state = this.employeeForm.get('state')?.value;
        }
        this.createForm();
        this.showUpdateButton = false;
        alert('Employee updated successfully!');
      },
      error: () => {
        alert('Failed to update employee!');
      }
    });
  }
  onDelete(id: number) {
    debugger;
    const isDelete = confirm("are you sure you want to delete?");
    if (isDelete) {
      this.http.delete(`https://localhost:7139/api/Employee/${id}`).subscribe({
        next: () => {
          const index = this.employeeList.findIndex(m => m.empId == id);
          this.employeeList.splice(index, 1);
          alert('Employee deleted successfully!');
        },
        error: () => {
          alert('Failed to delete employee!');
        }
      });
    }
  }
  trackByIndex(index: number, item: any): number {
    debugger;
  return index+1;
}
}
