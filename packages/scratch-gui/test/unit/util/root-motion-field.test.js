import {
    quantize,
    registerRootMotionField,
    valueFromAnglePosition,
    valueFromLinearPosition
} from '../../../src/lib/root-motion-field';

describe('Root motion picker', () => {
    test('maps horizontal drag positions into constrained motion values', () => {
        expect(valueFromLinearPosition(10, 10, 200, -100, 100, 1)).toBe(-100);
        expect(valueFromLinearPosition(110, 10, 200, -100, 100, 1)).toBe(0);
        expect(valueFromLinearPosition(210, 10, 200, -100, 100, 1)).toBe(100);
        expect(valueFromLinearPosition(310, 10, 200, -100, 100, 1)).toBe(100);
    });

    test('snaps distances and angles to classroom-friendly increments', () => {
        expect(quantize(94, -500, 500, 10)).toBe(90);
        expect(quantize(-96, -500, 500, 10)).toBe(-100);
        expect(quantize(183, -180, 180, 5)).toBe(180);
    });

    test('maps circular drag positions to signed clockwise angles', () => {
        expect(valueFromAnglePosition(100, 0, 100, 100, -180, 180, 5)).toBe(0);
        expect(valueFromAnglePosition(200, 100, 100, 100, -180, 180, 5)).toBe(90);
        expect(valueFromAnglePosition(0, 100, 100, 100, -180, 180, 5)).toBe(-90);
        expect(valueFromAnglePosition(100, 200, 100, 100, -180, 180, 5)).toBe(180);
    });

    test('registers only declarative Root motion picker fields', () => {
        const register = jest.fn();
        const ScratchBlocks = {Field: {register}};

        expect(registerRootMotionField(ScratchBlocks, 'field_other', {type: 'other'})).toBe(false);
        expect(register).not.toHaveBeenCalled();
    });
});
