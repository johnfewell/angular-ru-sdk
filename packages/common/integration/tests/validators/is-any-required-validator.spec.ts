import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { isAnyRequiredValidator } from '../../../../common/validators/src/any-is-required.validator';

describe('[TEST]: Ordered interval validator', () => {
    const controlA: string = 'aaa';
    const controlB: string = 'bbb';
    const controlC: string = 'ccc';
    let form: FormGroup;
    beforeEach(() => {
        form = new FormGroup(
            {
                aaa: new FormControl(),
                bbb: new FormControl(),
                ccc: new FormControl()
            },
            [isAnyRequiredValidator([controlA, controlB, controlC])]
        );
    });

    it('should return error if control is not part of FormGroup', () => {
        const control: AbstractControl = new FormControl();
        const validator: ValidatorFn = isAnyRequiredValidator([controlA, controlB, controlC]);
        expect(() => validator(control).toThrow(new Error('AnyIsRequiredValidator must be used on form group')));
    });

    it('should return error if all controls with no values', () => {
        expect(form.errors).toEqual({ isAnyRequiredValidator: true });
    });

    it('should be valid if there is only one value with type number', () => {
        form.controls[controlA].setValue(13);
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is only one value with type string', () => {
        form.controls[controlB].setValue('awesome');
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is only one value with type Object', () => {
        form.controls[controlC].setValue({});
        expect(form.valid).toEqual(true);
    });

    it('should be valid if there is more than one value', () => {
        form.controls[controlA].setValue(13);
        form.controls[controlB].setValue('awesome');
        form.controls[controlC].setValue({});
        expect(form.valid).toEqual(true);
    });
});
