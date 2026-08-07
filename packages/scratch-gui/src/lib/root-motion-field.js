const SVG_NS = 'http://www.w3.org/2000/svg';
const PANEL_WIDTH = 280;
const PANEL_HEIGHT = 164;
const TRACK_LEFT = 24;
const TRACK_RIGHT = 256;
const TRACK_Y = 142;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const quantize = (value, min, max, step) => {
    const safeStep = Number(step) > 0 ? Number(step) : 1;
    const rounded = (Math.round((Number(value) - min) / safeStep) * safeStep) + min;
    const decimals = (String(safeStep).split('.')[1] || '').length;
    return Number(clamp(rounded, min, max).toFixed(decimals));
};

const normalizeDirectValue = (value, min, max) => {
    const normalized = typeof value === 'string' ? value.replace(',', '.').trim() : value;
    if (normalized === '' || normalized === '-' || normalized === '.' || normalized === '-.') return null;
    const number = Number(normalized);
    if (!Number.isFinite(number)) return null;
    return clamp(number, min, max);
};

const valueFromLinearPosition = (clientX, left, width, min, max, step) => {
    const ratio = clamp((clientX - left) / Math.max(1, width), 0, 1);
    return quantize(min + ((max - min) * ratio), min, max, step);
};

const valueFromAnglePosition = (clientX, clientY, centerX, centerY, min, max, step) => {
    const degrees = Math.atan2(clientX - centerX, centerY - clientY) * 180 / Math.PI;
    return quantize(degrees, min, max, step);
};

const createSvgElement = (name, attributes = {}) => {
    const element = document.createElementNS(SVG_NS, name);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    return element;
};

const appendSvg = (parent, name, attributes) => {
    const element = createSvgElement(name, attributes);
    parent.appendChild(element);
    return element;
};

const polarPoint = (cx, cy, radius, degrees) => {
    const radians = degrees * Math.PI / 180;
    return [cx + (Math.sin(radians) * radius), cy - (Math.cos(radians) * radius)];
};

const arcPath = (cx, cy, radius, degrees) => {
    const bounded = clamp(degrees, -359.9, 359.9);
    const [endX, endY] = polarPoint(cx, cy, radius, bounded);
    const largeArc = Math.abs(bounded) > 180 ? 1 : 0;
    const sweep = bounded >= 0 ? 1 : 0;
    return `M ${cx} ${cy - radius} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${endX} ${endY}`;
};

const drawRobot = (svg, x, y, rotation = 0, selectedSide = null) => {
    const group = appendSvg(svg, 'g', {transform: `translate(${x} ${y}) rotate(${rotation})`});
    appendSvg(group, 'polygon', {
        'points': '0,-29 25,-14 25,14 0,29 -25,14 -25,-14',
        'fill': '#ffffff',
        'stroke': '#263238',
        'stroke-width': 3
    });
    appendSvg(group, 'line', {'x1': 0, 'y1': -21, 'x2': 0, 'y2': 20, 'stroke': '#263238', 'stroke-width': 5});
    appendSvg(group, 'line', {'x1': -18, 'y1': 0, 'x2': 18, 'y2': 0, 'stroke': '#263238', 'stroke-width': 5});
    appendSvg(group, 'circle', {cx: 0, cy: 0, r: 6, fill: '#2e9b57'});
    appendSvg(group, 'rect', {x: -5, y: -26, width: 10, height: 7, rx: 3, fill: '#f3dc36'});
    appendSvg(group, 'rect', {
        x: -29,
        y: -13,
        width: 7,
        height: 26,
        rx: 3,
        fill: selectedSide === 'left' ? '#ff8a3d' : '#90a4ae'
    });
    appendSvg(group, 'rect', {
        x: 22,
        y: -13,
        width: 7,
        height: 26,
        rx: 3,
        fill: selectedSide === 'right' ? '#ff8a3d' : '#90a4ae'
    });
    return group;
};

const drawArrow = (svg, x1, y1, x2, y2, colour = '#0f7f69') => {
    appendSvg(svg, 'line', {
        x1, y1, x2, y2, 'stroke': colour, 'stroke-width': 5, 'stroke-linecap': 'round'
    });
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const size = 9;
    const points = [
        [x2, y2],
        [x2 - (size * Math.cos(angle - 0.55)), y2 - (size * Math.sin(angle - 0.55))],
        [x2 - (size * Math.cos(angle + 0.55)), y2 - (size * Math.sin(angle + 0.55))]
    ].map(point => point.join(',')).join(' ');
    appendSvg(svg, 'polygon', {points, fill: colour});
};

const drawLinearTrack = (svg, value, options) => {
    appendSvg(svg, 'line', {
        'x1': TRACK_LEFT,
        'y1': TRACK_Y,
        'x2': TRACK_RIGHT,
        'y2': TRACK_Y,
        'stroke': '#b0bec5',
        'stroke-width': 8,
        'stroke-linecap': 'round'
    });
    const zeroRatio = clamp((0 - options.min) / (options.max - options.min), 0, 1);
    const zeroX = TRACK_LEFT + ((TRACK_RIGHT - TRACK_LEFT) * zeroRatio);
    appendSvg(svg, 'line', {
        'x1': zeroX,
        'y1': TRACK_Y - 10,
        'x2': zeroX,
        'y2': TRACK_Y + 10,
        'stroke': '#607d8b',
        'stroke-width': 2
    });
    const ratio = (value - options.min) / (options.max - options.min);
    const handleX = TRACK_LEFT + ((TRACK_RIGHT - TRACK_LEFT) * ratio);
    appendSvg(svg, 'circle', {
        'cx': handleX, 'cy': TRACK_Y, 'r': 12, 'fill': '#ff8a3d', 'stroke': '#ffffff', 'stroke-width': 3
    });
};

const drawMotor = (svg, value, options) => {
    drawRobot(svg, 140, 54, 0, options.side);
    const direction = value >= 0 ? -1 : 1;
    const wheelX = options.side === 'left' ? 105 : 175;
    drawArrow(svg, wheelX, 80, wheelX, 80 + (direction * (16 + (Math.abs(value) * 0.2))), '#ff6d00');
};

const drawDistance = (svg, value, options) => {
    const ratio = (value - options.min) / (options.max - options.min);
    const robotX = 45 + (190 * ratio);
    drawArrow(svg, 44, 76, 236, 76);
    drawRobot(svg, robotX, 76, 90);
};

const drawTurn = (svg, value) => {
    appendSvg(svg, 'circle', {'cx': 140, 'cy': 74, 'r': 53, 'fill': '#eef8f5', 'stroke': '#9ccfc3', 'stroke-width': 3});
    appendSvg(svg, 'path', {
        'd': arcPath(140, 74, 45, value),
        'fill': 'none',
        'stroke': '#0f7f69',
        'stroke-width': 6,
        'stroke-linecap': 'round'
    });
    drawRobot(svg, 140, 74, value);
};

const drawRadius = (svg, value) => {
    const magnitude = Math.max(20, Math.min(100, Math.abs(value) / 5));
    const side = value >= 0 ? 1 : -1;
    const startX = 140;
    const endX = startX + (side * magnitude);
    appendSvg(svg, 'path', {
        'd': `M ${startX} 105 Q ${endX} 52 ${startX} 18`,
        'fill': 'none',
        'stroke': '#0f7f69',
        'stroke-width': 6,
        'stroke-linecap': 'round'
    });
    drawRobot(svg, 140, 104, 0);
};

const drawArc = (svg, value) => {
    const bounded = clamp(value, -359.9, 359.9);
    appendSvg(svg, 'circle', {'cx': 140, 'cy': 70, 'r': 47, 'fill': '#eef8f5', 'stroke': '#d5ebe6', 'stroke-width': 2});
    appendSvg(svg, 'path', {
        'd': arcPath(140, 70, 47, bounded),
        'fill': 'none',
        'stroke': '#0f7f69',
        'stroke-width': 7,
        'stroke-linecap': 'round'
    });
    const [robotX, robotY] = polarPoint(140, 70, 47, bounded);
    drawRobot(svg, robotX, robotY, bounded);
};

const drawGraphic = (svg, value, options) => {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    appendSvg(svg, 'rect', {x: 0, y: 0, width: PANEL_WIDTH, height: PANEL_HEIGHT, rx: 12, fill: '#f8fbfa'});
    switch (options.mode) {
    case 'motor':
        drawMotor(svg, value, options);
        break;
    case 'distance':
        drawDistance(svg, value, options);
        break;
    case 'turn':
        drawTurn(svg, value);
        break;
    case 'radius':
        drawRadius(svg, value);
        break;
    case 'arc':
        drawArc(svg, value);
        break;
    }
    if (options.mode !== 'turn') drawLinearTrack(svg, value, options);
};

const localizedLabel = options => {
    const locale = (document.documentElement.lang || navigator.language || 'en').toLowerCase();
    const language = locale.startsWith('ja') ? 'ja' : 'en';
    return (options.labels && (options.labels[language] || options.labels.en)) || '';
};

const localizedText = (english, japanese) => {
    const locale = (document.documentElement.lang || navigator.language || 'en').toLowerCase();
    return locale.startsWith('ja') ? japanese : english;
};

const createRootMotionFieldImplementation = (ScratchBlocks, options) => {
    const min = Number(options.min);
    const max = Number(options.max);
    const step = Number(options.step) || 1;

    /**
     * Root motion picker field.
     * @param {number|string} value - Initial numeric value.
     */
    const RootMotionField = function (value) {
        // Keep drag gestures snapped to `step`, but allow precise decimal values
        // when the learner types a number directly.
        ScratchBlocks.FieldNumber.call(this, value, min, max);
        this.rootMotionOptions_ = options;
        this.rootMotionSvg_ = null;
        this.rootMotionValue_ = null;
    };
    RootMotionField.prototype = Object.create(ScratchBlocks.FieldNumber.prototype);
    RootMotionField.prototype.constructor = RootMotionField;

    RootMotionField.fromJson = json => new RootMotionField(json.value || json.text || 0);

    RootMotionField.prototype.showEditor_ = function () {
        ScratchBlocks.FieldNumber.prototype.showEditor_.call(this);
        ScratchBlocks.DropDownDiv.hideWithoutAnimation();
        ScratchBlocks.DropDownDiv.clearContent();

        const content = ScratchBlocks.DropDownDiv.getContentDiv();
        content.style.width = `${PANEL_WIDTH}px`;
        content.style.padding = '10px';
        content.style.boxSizing = 'content-box';
        content.style.userSelect = 'none';
        content.setAttribute('role', 'dialog');
        content.setAttribute('aria-label', localizedLabel(options));

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        header.style.font = '600 14px sans-serif';
        header.style.color = '#263238';
        header.style.marginBottom = '6px';
        const title = document.createElement('span');
        title.textContent = localizedLabel(options);
        const inputControls = document.createElement('div');
        inputControls.style.display = 'flex';
        inputControls.style.alignItems = 'center';
        inputControls.style.gap = '5px';
        this.rootMotionValue_ = document.createElement('input');
        this.rootMotionValue_.type = 'text';
        this.rootMotionValue_.inputMode = 'decimal';
        this.rootMotionValue_.pattern = '-?[0-9]*([.,][0-9]*)?';
        this.rootMotionValue_.enterKeyHint = 'done';
        this.rootMotionValue_.autocomplete = 'off';
        this.rootMotionValue_.setAttribute('aria-label', localizedText('Enter an exact value', '正確な数値を入力'));
        this.rootMotionValue_.style.width = '72px';
        this.rootMotionValue_.style.boxSizing = 'border-box';
        this.rootMotionValue_.style.padding = '5px 7px';
        this.rootMotionValue_.style.border = '2px solid #0f7f69';
        this.rootMotionValue_.style.borderRadius = '8px';
        this.rootMotionValue_.style.background = '#ffffff';
        this.rootMotionValue_.style.color = '#263238';
        this.rootMotionValue_.style.font = '600 15px sans-serif';
        this.rootMotionValue_.style.textAlign = 'right';
        const unit = document.createElement('span');
        unit.textContent = options.unit || '';
        unit.style.minWidth = '20px';
        const keypadToggle = document.createElement('button');
        keypadToggle.type = 'button';
        keypadToggle.textContent = '⌨';
        keypadToggle.title = localizedText('Show on-screen keypad', '画面内テンキーを表示');
        keypadToggle.setAttribute('aria-label', keypadToggle.title);
        keypadToggle.style.padding = '4px 7px';
        keypadToggle.style.border = '1px solid #607d8b';
        keypadToggle.style.borderRadius = '7px';
        keypadToggle.style.background = '#ffffff';
        keypadToggle.style.cursor = 'pointer';
        header.appendChild(title);
        inputControls.appendChild(this.rootMotionValue_);
        inputControls.appendChild(unit);
        if (options.keypad !== false) inputControls.appendChild(keypadToggle);
        header.appendChild(inputControls);
        content.appendChild(header);

        this.rootMotionSvg_ = createSvgElement('svg', {
            viewBox: `0 0 ${PANEL_WIDTH} ${PANEL_HEIGHT}`,
            width: PANEL_WIDTH,
            height: PANEL_HEIGHT,
            style: 'display:block;touch-action:none;cursor:pointer'
        });
        content.appendChild(this.rootMotionSvg_);

        const keypad = document.createElement('div');
        keypad.hidden = true;
        keypad.style.display = 'none';
        keypad.style.gridTemplateColumns = 'repeat(3, 1fr)';
        keypad.style.gap = '6px';
        keypad.style.marginTop = '8px';
        keypad.setAttribute('role', 'group');
        keypad.setAttribute('aria-label', localizedText('Numeric keypad', '数値テンキー'));
        content.appendChild(keypad);

        const updateDisplay = (value, updateInput = true) => {
            const nextValue = normalizeDirectValue(value, min, max);
            if (nextValue === null) return;
            this.setValue(String(nextValue));
            if (ScratchBlocks.FieldTextInput.htmlInput_) {
                ScratchBlocks.FieldTextInput.htmlInput_.value = String(nextValue);
            }
            if (updateInput) this.rootMotionValue_.value = String(nextValue);
            drawGraphic(this.rootMotionSvg_, nextValue, options);
        };

        const commitDirectInput = () => {
            const nextValue = normalizeDirectValue(this.rootMotionValue_.value, min, max);
            updateDisplay(nextValue === null ? this.getValue() : nextValue);
        };

        this.rootMotionValue_.addEventListener('input', () => {
            const nextValue = normalizeDirectValue(this.rootMotionValue_.value, min, max);
            if (nextValue !== null) updateDisplay(nextValue, false);
        });
        this.rootMotionValue_.addEventListener('change', commitDirectInput);
        this.rootMotionValue_.addEventListener('blur', commitDirectInput);
        this.rootMotionValue_.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                commitDirectInput();
                this.rootMotionValue_.blur();
            } else if (event.key === 'Escape') {
                event.preventDefault();
                updateDisplay(this.getValue());
                this.rootMotionValue_.blur();
            }
        });

        const dispatchKeypadInput = () => {
            this.rootMotionValue_.dispatchEvent(new Event('input', {bubbles: true}));
            this.rootMotionValue_.focus({preventScroll: true});
        };

        const handleKeypad = key => {
            const input = this.rootMotionValue_;
            const start = input.selectionStart === null ? input.value.length : input.selectionStart;
            const end = input.selectionEnd === null ? start : input.selectionEnd;
            if (key === 'done') {
                commitDirectInput();
                keypad.hidden = true;
                keypad.style.display = 'none';
                input.blur();
                return;
            }
            if (key === 'backspace') {
                if (start !== end) input.setRangeText('', start, end, 'end');
                else if (start > 0) input.setRangeText('', start - 1, start, 'end');
            } else if (key === 'sign') {
                input.value = input.value.startsWith('-') ? input.value.slice(1) : `-${input.value}`;
                input.setSelectionRange(input.value.length, input.value.length);
            } else if (key === '.') {
                if (!input.value.includes('.') && !input.value.includes(',')) {
                    input.setRangeText('.', start, end, 'end');
                }
            } else {
                input.setRangeText(key, start, end, 'end');
            }
            dispatchKeypadInput();
        };

        const keypadKeys = [
            ['7', '7'], ['8', '8'], ['9', '9'],
            ['4', '4'], ['5', '5'], ['6', '6'],
            ['1', '1'], ['2', '2'], ['3', '3'],
            ['±', 'sign'], ['0', '0'], ['.', '.'],
            ['⌫', 'backspace'], [localizedText('Done', '完了'), 'done']
        ];
        keypadKeys.forEach(([label, key]) => {
            if (key === 'sign' && min >= 0) return;
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = label;
            button.style.minHeight = '36px';
            button.style.border = '1px solid #78909c';
            button.style.borderRadius = '7px';
            button.style.background = key === 'done' ? '#0f7f69' : '#ffffff';
            button.style.color = key === 'done' ? '#ffffff' : '#263238';
            button.style.font = '600 15px sans-serif';
            button.style.cursor = 'pointer';
            if (key === 'done') button.style.gridColumn = 'span 2';
            button.addEventListener('pointerdown', event => event.preventDefault());
            button.addEventListener('click', () => handleKeypad(key));
            keypad.appendChild(button);
        });

        keypadToggle.addEventListener('click', () => {
            keypad.hidden = !keypad.hidden;
            keypad.style.display = keypad.hidden ? 'none' : 'grid';
            keypadToggle.setAttribute('aria-expanded', String(!keypad.hidden));
        });

        const updateFromPointer = event => {
            event.preventDefault();
            const box = this.rootMotionSvg_.getBoundingClientRect();
            let value;
            if (options.mode === 'turn') {
                value = valueFromAnglePosition(
                    event.clientX, event.clientY,
                    box.left + (box.width / 2), box.top + ((74 / PANEL_HEIGHT) * box.height),
                    min, max, step
                );
            } else {
                const left = box.left + ((TRACK_LEFT / PANEL_WIDTH) * box.width);
                const width = ((TRACK_RIGHT - TRACK_LEFT) / PANEL_WIDTH) * box.width;
                value = valueFromLinearPosition(event.clientX, left, width, min, max, step);
            }
            updateDisplay(value);
        };

        this.rootMotionSvg_.addEventListener('pointerdown', event => {
            this.rootMotionSvg_.setPointerCapture(event.pointerId);
            updateFromPointer(event);
        });
        this.rootMotionSvg_.addEventListener('pointermove', event => {
            if (this.rootMotionSvg_.hasPointerCapture(event.pointerId)) updateFromPointer(event);
        });

        const source = this.sourceBlock_.parentBlock_ || this.sourceBlock_;
        ScratchBlocks.DropDownDiv.setColour(source.getColour(), this.sourceBlock_.getColourTertiary());
        ScratchBlocks.DropDownDiv.setCategory(source.getCategory());
        ScratchBlocks.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);
        updateDisplay(Number(this.getValue()));
    };

    return RootMotionField;
};

const registerRootMotionField = (ScratchBlocks, name, implementation) => {
    if (!implementation || implementation.type !== 'root-motion-picker') return false;
    ScratchBlocks.Field.register(name, createRootMotionFieldImplementation(ScratchBlocks, implementation));
    return true;
};

export {
    clamp,
    createRootMotionFieldImplementation,
    normalizeDirectValue,
    quantize,
    registerRootMotionField,
    valueFromAnglePosition,
    valueFromLinearPosition
};
