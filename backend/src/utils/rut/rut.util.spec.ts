import { validateAndFormatRut } from './rut.util';

describe('RUT Utilities', () => {
    it('should validate and format a valid RUT', () => {
        const result = validateAndFormatRut('12.345.678-5');
        expect(result).toBe('123456785');
    });

    it('should return false for an invalid RUT', () => {
        const result = validateAndFormatRut('12.345.678-K');
        expect(result).toBe(false);
    });

    it('should return false for a RUT that does not match the pattern', () => {
        const result = validateAndFormatRut('12345xx678');
        expect(result).toBe(false);
    });

    it('should return a formatted RUT with a check digit of 0', () => {
        const result = validateAndFormatRut('64.683.216-0');
        expect(result).toBe('646832160');
    });

    it('should return a formatted RUT with a check digit of K', () => {
        const result = validateAndFormatRut('16.577.549-K');
        expect(result).toBe('16577549K');
    });
});