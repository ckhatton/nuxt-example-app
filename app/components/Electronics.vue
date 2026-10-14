<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-4">
    <h2 class="text-2xl">Electronics ⚡</h2>
    <p class="my-4">
      A few calculators I use when building circuits. The maths lives in its
      own tested module, and the components just display it.
    </p>

    <h3 class="text-xl mt-6 mb-2">Resistor colour code</h3>
    <p class="mb-4">Pick the colour of each band on a 4-band resistor.</p>
    <svg class="resistor mb-4" viewBox="0 0 320 70" role="img" :aria-label="`Resistor: ${resistorLabel}`">
      <line x1="0" y1="35" x2="320" y2="35" stroke="#9aa5b1" stroke-width="4" />
      <rect x="70" y="12" width="180" height="46" rx="18" fill="#e8d4a8" stroke="#c9b27f" stroke-width="2" />
      <rect
        v-for="(band, index) in bands"
        :key="index"
        :x="bandX[index]"
        y="12"
        width="14"
        height="46"
        :fill="colour(band.value).hex"
      />
    </svg>
    <div v-for="band in bands" :key="band.label" class="mb-3">
      <p class="text-sm mb-1">
        {{ band.label }}: <span class="font-semibold">{{ band.value }}</span>
      </p>
      <div class="flex flex-wrap gap-1">
        <button
          v-for="option in band.options"
          :key="option.name"
          type="button"
          class="swatch"
          :class="{ selected: option.name === band.value }"
          :style="{ backgroundColor: option.hex }"
          :title="option.name"
          :aria-label="`${band.label}: ${option.name}`"
          :aria-pressed="option.name === band.value"
          @click="band.value = option.name"
        />
      </div>
    </div>
    <p class="text-lg">
      Value: <span class="font-semibold resistor-value">{{ resistorLabel }}</span>
    </p>

    <h3 class="text-xl mt-8 mb-2">Ohm's law</h3>
    <p class="mb-4">Fill in any two values to work out the third, and the power.</p>
    <div class="grid sm:grid-cols-3 gap-4 mb-4">
      <label class="block">
        <span class="text-sm">Voltage (V)</span>
        <input v-model.number="ohm.voltage" type="number" step="any" class="ohm-voltage border-b-2 p-2 w-full" >
      </label>
      <label class="block">
        <span class="text-sm">Current (A)</span>
        <input v-model.number="ohm.current" type="number" step="any" class="ohm-current border-b-2 p-2 w-full" >
      </label>
      <label class="block">
        <span class="text-sm">Resistance (Ω)</span>
        <input v-model.number="ohm.resistance" type="number" step="any" class="ohm-resistance border-b-2 p-2 w-full" >
      </label>
    </div>
    <p class="text-lg ohm-result">
      <template v-if="ohmResult">
        {{ round(ohmResult.voltage) }} V, {{ round(ohmResult.current) }} A,
        {{ formatOhms(ohmResult.resistance) }}; power {{ round(ohmResult.power) }} W
      </template>
      <template v-else>Enter exactly two values.</template>
    </p>

    <h3 class="text-xl mt-8 mb-2">LED resistor</h3>
    <p class="mb-4">The series resistor an LED needs, rounded up to a standard (E12) value.</p>
    <div class="grid sm:grid-cols-3 gap-4 mb-4">
      <label class="block">
        <span class="text-sm">Supply (V)</span>
        <input v-model.number="led.supply" type="number" step="any" class="led-supply border-b-2 p-2 w-full" >
      </label>
      <label class="block">
        <span class="text-sm">LED forward voltage (V)</span>
        <input v-model.number="led.forward" type="number" step="any" class="led-forward border-b-2 p-2 w-full" >
      </label>
      <label class="block">
        <span class="text-sm">LED current (mA)</span>
        <input v-model.number="led.current" type="number" step="any" class="led-current border-b-2 p-2 w-full" >
      </label>
    </div>
    <p class="text-lg led-result">
      <template v-if="ledResult">
        Use a <span class="font-semibold">{{ formatOhms(ledResult.standard) }}</span> resistor
        (exactly {{ formatOhms(ledResult.exact) }}), giving {{ round(ledResult.current) }} mA and
        {{ round(ledResult.power) }} W.
      </template>
      <template v-else>The supply must be higher than the LED's forward voltage.</template>
    </p>
  </div>
</template>

<script>
import { BAND_COLOURS, formatOhms, ledResistor, ohmsLaw, resistorValue } from '~/utils/electronics';

const digits = BAND_COLOURS.filter((option) => option.digit !== undefined);

export default {
  name: 'Electronics',

  data() {
    return {
      bands: [
        { label: '1st digit', value: 'Yellow', options: digits },
        { label: '2nd digit', value: 'Violet', options: digits },
        { label: 'Multiplier', value: 'Red', options: BAND_COLOURS },
        {
          label: 'Tolerance',
          value: 'Gold',
          options: BAND_COLOURS.filter((option) => option.tolerance !== undefined),
        },
      ],
      bandX: [96, 126, 156, 214],
      ohm: { voltage: 9, current: '', resistance: 1000 },
      led: { supply: 5, forward: 2, current: 20 },
    };
  },

  computed: {
    resistorLabel() {
      const [first, second, multiplier, tolerance] = this.bands.map((band) => band.value);
      const ohms = resistorValue(first, second, multiplier);
      return `${formatOhms(ohms)} ±${this.colour(tolerance).tolerance}%`;
    },

    ohmResult() {
      return ohmsLaw({
        voltage: this.number(this.ohm.voltage),
        current: this.number(this.ohm.current),
        resistance: this.number(this.ohm.resistance),
      });
    },

    ledResult() {
      return ledResistor({
        supply: this.number(this.led.supply),
        forward: this.number(this.led.forward),
        current: this.number(this.led.current),
      });
    },
  },

  methods: {
    formatOhms,

    colour(name) {
      return BAND_COLOURS.find((option) => option.name === name);
    },

    // Three significant figures for display, e.g. 17.9487 → 17.9
    round(value) {
      return Number.parseFloat(value.toPrecision(3));
    },

    // Empty inputs give '' rather than a number
    number(value) {
      return typeof value === 'number' ? value : Number.NaN;
    },
  },
};
</script>

<style scoped>
.resistor {
  width: 100%;
  max-width: 24rem;
}

.swatch {
  width: 1.75rem;
  height: 1.75rem;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
}

.swatch.selected {
  outline: 3px solid #225378;
  outline-offset: 1px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
