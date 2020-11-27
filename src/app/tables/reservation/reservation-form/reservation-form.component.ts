import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reservation, Table } from 'src/app/shared/models/table.model';
import * as moment from 'moment';
import { DomainHelperService } from 'src/app/services/domain-helper.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ReservationState } from '../reservation-state';
import { addReservationToTable, cancelReservation, enterAddReservation } from '../reservation.action';


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
  success = false;
  messageTimeout: any;

  constructor(
    private fb: FormBuilder,
    private dh: DomainHelperService,
    private router: Router,
    private store: Store<ReservationState>
  ) {
    this.table = window.history.state.table;
    if (!this.table) {
      window.history.back();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.store.dispatch(enterAddReservation({ table: this.table }));
    this.store.pipe(select((state: any) => state.reservation)).subscribe((res) => {
      if (res && !res.table && !res.reservation) {
        this.router.navigate(['tables']);
      }
    });
  }

  initForm = () => {
    this.reservationFormGroup = this.fb.group({
      startTime: [null, Validators.required],
      date: [null, Validators.required],
      endTime: [null, Validators.required]
    }, { validators: [this.timeValidator.bind(this), this.crossReservationValidator.bind(this)] });
  }

  submitBooking = () => {
    if (this.reservationFormGroup.valid) {
      const reservation = new Reservation()
      reservation.start = moment(this.reservationFormGroup.value.date)
        .add(this.dh.getHours(this.reservationFormGroup.value.startTime), 'hours')
        .add(this.dh.getMinutes(this.reservationFormGroup.value.startTime), 'minute').toDate().getTime();

      reservation.end = moment(this.reservationFormGroup.value.date)
        .add(this.dh.getHours(this.reservationFormGroup.value.endTime), 'hours')
        .add(this.dh.getMinutes(this.reservationFormGroup.value.endTime), 'minute').toDate().getTime();
      this.store.dispatch(addReservationToTable({ table: this.table, reservation }));
    }
    this.submitForm = true;
  }

  /**
   * Validator for time
   * @param formGroup 
   */
  timeValidator = (formGroup: FormGroup) => {
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
  crossReservationValidator = (formGroup: FormGroup) => {
    if (!this.table || !this.table.reservations) {
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



  removeInvalidTimeError = (formGroup: FormGroup) => {
    if (formGroup.errors && formGroup.errors.invalidTime) {
      delete formGroup.errors.invalidTime;
    }
    if (!formGroup.errors || Object.keys(formGroup).length === 0) {
      return null;
    }
  }

  generateInvalidTimeError = (formGroup: FormGroup) => {
    const errors = formGroup.errors ? formGroup.errors : {};
    errors.invalidTime = true;
    return errors;
  }

  generateNotEmptyError = (formGroup: FormGroup) => {
    const errors = formGroup.errors ? formGroup.errors : {};
    errors.notEmpty = true;
    return errors;
  }

  removeNotEmptyError = (formGroup: FormGroup) => {
    if (formGroup.errors && formGroup.errors.notEmpty) {
      delete formGroup.errors.notEmpty;
    }
    if (!formGroup.errors || Object.keys(formGroup).length === 0) {
      return null;
    }
  }

  cancelBooking = () => {
    this.store.dispatch(cancelReservation());
  }
}
