export class EmployeeModel{
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    address: string;
    PinCode: string;
    contactNo: string;
    constructor()
    {
        this.address='';
        this.city='';
        this.emailId='';
        this.empId=0;
        this.name='';
        this.state='';
        this.PinCode='';
        this.contactNo='';
    }
}