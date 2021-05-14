import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient) { }

  URL_API = "http://localhost:4000/api/employees";


  getEmployees(){
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee:Employee){
    return this.http.post<Employee>(this.URL_API, employee)
  }

  deleteEmployee(id:String){
    return this.http.delete<Number>(`${this.URL_API}/${id}`)
  }

  editEmployee(employee:Employee){
    return this.http.put<Employee>(`${this.URL_API}/${employee._id}`, employee)
  }


}
