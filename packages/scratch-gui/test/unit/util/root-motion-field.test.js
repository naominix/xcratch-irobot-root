import {
    localizedLabel,
    localizedText,
    normalizeDirectValue,
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

    test('keeps precise direct input while constraining it to a safe range', () => {
        expect(normalizeDirectValue('126.2', -500, 500)).toBe(126.2);
        expect(normalizeDirectValue('-68,5', -180, 180)).toBe(-68.5);
        expect(normalizeDirectValue('900', -500, 500)).toBe(500);
        expect(normalizeDirectValue('-', -500, 500)).toBeNull();
        expect(normalizeDirectValue('not a number', -500, 500)).toBeNull();
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

    test('uses dedicated hiragana labels for the ja-Hira locale', () => {
        const previousLanguage = document.documentElement.lang;
        document.documentElement.lang = 'ja-Hira';
        try {
            expect(localizedLabel({
                labels: {en: 'Turn angle', ja: '回転する角度', 'ja-Hira': 'まわるかくど'}
            })).toBe('まわるかくど');
            expect(localizedText('Done', '完了', 'かんりょう')).toBe('かんりょう');
        } finally {
            document.documentElement.lang = previousLanguage;
        }
    });

    test('uses the current Scratch locale instead of a stale browser language', () => {
        const previousLanguage = document.documentElement.lang;
        document.documentElement.lang = 'ja';
        let locale = 'en';
        const options = {
            getLocale: () => locale,
            labels: {en: 'Travel distance', ja: '移動する距離', 'ja-Hira': 'すすむきょり'}
        };
        try {
            expect(localizedLabel(options)).toBe('Travel distance');
            expect(localizedText('Done', '完了', 'かんりょう', options)).toBe('Done');

            locale = 'ja-Hira';
            expect(localizedLabel(options)).toBe('すすむきょり');
            expect(localizedText('Done', '完了', 'かんりょう', options)).toBe('かんりょう');
        } finally {
            document.documentElement.lang = previousLanguage;
        }
    });

    test('reads the locale getter again whenever the picker is opened', () => {
        let scratchBlocksLocale = 'ja';
        const options = {
            getLocale: () => scratchBlocksLocale,
            labels: {en: 'Travel distance', ja: '移動する距離', 'ja-Hira': 'すすむきょり'}
        };

        expect(localizedLabel(options)).toBe('移動する距離');
        scratchBlocksLocale = 'en';
        expect(localizedLabel(options)).toBe('Travel distance');
        scratchBlocksLocale = 'ja-Hira';
        expect(localizedLabel(options)).toBe('すすむきょり');
    });
});
