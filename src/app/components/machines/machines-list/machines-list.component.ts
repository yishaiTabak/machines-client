import { Component, OnInit } from '@angular/core';
import { ListViewDataResult } from '@progress/kendo-angular-listview';
import { State } from '@progress/kendo-data-query';
import { MachinesService } from '../../../services/machines.service';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrl: './machines-list.component.css'
})
export class MachinesListComponent implements OnInit {
  view!: ListViewDataResult;
  loading:boolean = true
  state!:State
  sizes:number[] = [6,8,10]

  constructor(private machinesService:MachinesService, public dialog: MatDialog){
    this.machinesService.resetState.subscribe(()=>{
      this.state = {
      skip: 0,
      take: 8,
    }
      this.loadMachines(this.state)
    })
  }

  ngOnInit(): void {
    this.machinesService.machinesData.subscribe((data:GridDataResult)=>{
      this.view = data as ListViewDataResult
    })
  }

  public handlePageChange(event: PageChangeEvent): void {
    this.state = event as State

    this.loadMachines(this.state)
  }

  loadMachines(state:State){
    this.loading = true
    this.machinesService.setMachines(state).pipe(take(1)).subscribe(()=>{
      this.loading = false
    })
  }
}
