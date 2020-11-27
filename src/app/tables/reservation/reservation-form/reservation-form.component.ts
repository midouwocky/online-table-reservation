import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'src/app/shared/models/table.model';
import * as moment from 'moment';
import { DomainHelperService } from 'src/app/services/domain-helper.service';


@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationFormComponent implements OnInit {

  table: Table;

  reservationFormGroup: FormGroup;
  submitForm: boolean;

  constructor(
    private fb: FormBuilder,
    private dh: DomainHelperService
  ) {
    this.table = window.history.state.table;
    if (!this.table) {
      window.history.back();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reservationFormGroup = this.fb.group({
      startTime: [null, Validators.required],
      date: [null, Validators.required],
      endTime: [null, Validators.required]
    }, { validators: [this.timeValidator.bind(this), this.crossReservationValidator.bind(this)] });
  }

  submitBooking() {
    if (this.reservationFormGroup.valid) {

    }
    this.submitForm = true;
  }

  /**
   * Validator for time
   * @param formGroup 
   */
  timeValidator(formGroup: FormGroup) {
    if (formGroup.value.date && formGroup.value.startTime && formGroup.value.endTime) {
      const startDate = moment(formGroup.value.date)
        .add(this.dh.getHours(formGroup.value.startTime), 'hours')
        .add(this.dh.getMinutes(formGroup.value.startTime), 'minute');

      const endDate = moment(formGroup.value.date)
        .add(this.dh.getHours(formGroup.value.endTime), 'hours')
        .add(this.dh.getMinutes(formGroup.value.endTime), 'minute');

      if (endDate.isBefore(startDate)) {
        return this.generateInvalidTimeError(formGroup);
      } else {
        return this.removeInvalidTimeError(formGroup);
      }
    }
  }

  /**
   * validator for an existing reservation that cross the new one
   * @param formGroup form group
   */
  crossReservationValidator(formGroup: FormGroup) {
    if (!this.table.reservations) {
      return this.removeNotEmptyError(formGroup);
    }
    if (formGroup.value.date && formGroup.value.startTime && formGroup.value.endTime) {
      const startDate = moment(formGroup.value.date)
        .add(this.dh.getHours(formGroup.value.startTime), 'hours')
        .add(this.dh.getMinutes(formGroup.value.startTime), 'minute').toDate().getTime();

      const endDate = moment(formGroup.value.date)
        .add(this.dh.getHours(formGroup.value.endTime), 'hours')
        .add(this.dh.getMinutes(formGroup.value.endTime), 'minute').toDate().getTime();
      const reservationsCrossPeriod = this.table.reservations.filter(reservation =>
        reservation.end > startDate && endDate > reservation.start
      );
      if (reservationsCrossPeriod.length > 0) {
        return this.generateNotEmptyError(formGroup);
      } else {
        return this.removeNotEmptyError(formGroup);
      }
    }
  }



  removeInvalidTimeError(formControl: FormGroup) {
    if (formControl.errors && formControl.errors.invalidTime) {
      delete formControl.errors.invalidTime;
    }
    if (!formControl.errors || Object.keys(formControl).length === 0) {
      return null;
    }
  }

  generateInvalidTimeError(formControl: FormGroup) {
    const errors = formControl.errors ? formControl.errors : {};
    errors.invalidTime = true;
    return errors;
  }

  generateNotEmptyError(formControl: FormGroup) {
    const errors = formControl.errors ? formControl.errors : {};
    errors.notEmpty = true;
    return errors;
  }

  removeNotEmptyError(formControl: FormGroup) {
    if (formControl.errors && formControl.errors.notEmpty) {
      delete formControl.errors.notEmpty;
    }
    if (!formControl.errors || Object.keys(formControl).length === 0) {
      return null;
    }
  }
}
