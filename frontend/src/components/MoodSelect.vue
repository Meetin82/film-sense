<template>
  <div class="flex justify-center gap-4 mt-6">
    <button
        v-for="mood in ['sad', 'happy', 'thrill', 'scare', 'inspire']"
        :key="mood"
        @click="onMoodChange(mood)"
        :class="[
        'px-6 py-2 rounded-lg text-white font-semibold transition-colors',
        selectedMood === mood ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
      ]"
    >
      {{ moodLabels[mood] }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMood: '',
      moodLabels: {
        sad: 'Хочу погрустить',
        happy: 'Хочу посмеяться',
        thrill: 'Хочу напряжения',
        scare: 'Хочу попугаться',
        inspire: 'Хочу вдохновения',
      },
    };
  },
  methods: {
    onMoodChange(mood) {
      this.selectedMood = mood;
      this.$emit('moodSelected', mood);
    },
  },
};
</script>
