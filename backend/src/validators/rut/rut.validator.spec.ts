import { RutValidator } from "./rut.validator";

describe('RUT Validator', () => {
  it('should validate a valid RUT', () => {
    const validator = new RutValidator();
    expect(validator.validate('12.345.678-5')).toBe(true);
  });

  it('should invalidate an invalid RUT', () => {
    const validator = new RutValidator();
    expect(validator.validate('12.345.678-K')).toBe(false);
  });
});