import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '@core/services/interfaces';
import { TasksService } from '@core/services/tasks.service';
import { Subject, takeUntil } from 'rxjs';
import { TASK_TYPES } from 'src/app/pages/dashboard/constants';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public counter = '';
  public taskTypes = TASK_TYPES;

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<CreateTaskModalComponent>,
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(64),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(256),
      ]),
      type: new FormControl(TASK_TYPES[0].type, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.form.controls['description'].setValue(this.data.task.description);
      this.form.controls['title'].setValue(this.data.task.title);
      this.form.controls['type'].setValue(this.data.task.type);
    }
    this.counter = `${this.form.controls['title'].value.length}/64`;
    this.form.controls['title'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value: string) => {
        this.counter = `${value.length}/64`;
      });
  }

  public submit(): void {
    if (this.form.valid) {
      if (this.data.flag === 'create') {
        const task: Task = {
          id: Math.random().toString(16).slice(2),
          description: this.form.controls['description'].value,
          title: this.form.controls['title'].value,
          type: this.form.controls['type'].value,
        };
        this.tasksService.addTask(task);
      }

      if (this.data.flag === 'edit') {
        const task: Task = {
          id: this.data.task.id,
          description: this.form.controls['description'].value,
          title: this.form.controls['title'].value,
          type: this.form.controls['type'].value,
        };
        this.tasksService.updateTasks(task);
      }
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public getErrorMessage(control: AbstractControl, symbol?: string): string {
    if (control.hasError('required')) {
      return '???????? ?????????????????????? ?? ????????????????????';
    }
    if (control.hasError('minlength')) {
      return '?????????????? ???????????? 1 ????????????';
    }
    if (control.hasError('maxlength')) {
      return `???? ???????????? ${symbol} ????????????????`;
    }
    return '';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
