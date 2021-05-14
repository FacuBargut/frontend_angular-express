import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';

import { Employee } from '../../models/employee';

import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  URL_API = 'http:localhost/api/employees'

  constructor(
    private employeService:EmployeeService,
  ) { }

  employees: Employee[] = [];
  selectedEmployee: Employee = {
    name: '',
    position: '',
    office: '',
    salary: 0,
  };

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    console.log(this.employeService.getEmployees().subscribe(
      res =>{
        this.employees = res;
      },
      err =>{
        console.log(err);
      }
    ));
  }

  addEmployee(form:NgForm){
    if(form.value._id){
      this.employeService.editEmployee(this.selectedEmployee).subscribe(
        res =>{
          this.getEmployees();
          form.reset();
        },
        err =>{
          console.log(err)
        }
      )
    }else{
      this.employeService.createEmployee(this.selectedEmployee).subscribe(
        res =>{
          this.getEmployees();
          form.reset();
        },
        err =>{
          console.log(err)
        }
      )
    }
  }
  
  deleteEmployee(id:string){
    const res = confirm("Desea eliminar el empleado?")
    if(res){
      this.employeService.deleteEmployee(id).subscribe(
        res=>{
          this.getEmployees();
        },
        err=>{console.log(err)}
      )
    }else{
      console.log("No se elimina")
    }
  }

  editEmployee(employee:Employee){
    this.selectedEmployee = employee;
    
  }

  resetForm(form:NgForm){
    form.reset();
  }

}
