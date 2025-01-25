<template>
  <div ref="datePicker" class="date-picker">
    <div @click.stop="showDatePicker = true">
      <label
        :for="id || name"
        class="block text-xs font-medium leading-6 text-on-surface"
        >{{ label }}</label
      >
      <div class="relative rounded-md">
        <div
          v-if="prefix"
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <span class="text-gray-500 label-sm">{{ prefix }}</span>
        </div>
        <input
          :id="id || name"
          ref="datePickerInput"
          v-model="displayDate"
          :type="type"
          :name="name"
          class="cursor-default bg-surface  block w-full rounded-md py-1.5 px-3  border placeholder:text-gray-400 text-on-surface body-sm"
          :class="{
            'pl-7': prefix,
            'pr-12': suffix,
            'border-red-300 dark:border-red-500': error,
            'border-outline-variant': !error,
          }"
          placeholder="DD.MM.YYYY"
          maxlength="10"
          @input="cleanupDate($event.target.value)"
          @keydown.space="showDatePicker = !showDatePicker"
          @keydown.enter="showDatePicker = false"
          @focus="showDatePicker = true"
        >
        <div
          v-if="dateRangeStart || dateRangeEnd"
          class="absolute inset-y-0 right-0 flex items-center pr-3"
          @click="clearInput"
        >
          <Icon name="mdi:close" size="18" class="cursor-pointer" />
        </div>
        <template v-else>
          <div
            v-if="suffix || $slots.suffix"
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <slot name="suffix">
              <span class="text-gray-500 sm:text-sm">{{ suffix }}</span>
            </slot>
          </div>
        </template>
      </div>
      <p v-if="error" class="mt-1 label-small text-red-500 dark:text-red-400">
        {{ error }}
      </p>
    </div>
    <Transition name="fade">

    <div
      v-if="showDatePicker"
      class="datepicker-wrapper absolute mt-2 bg-surface-container rounded-md shadow-lg flex w-fit z-10"
      @mousedown.prevent
    >
      <div class="month-container">
        <!-- Current Month -->
        <div class="month text-on-surface flex flex-col gap-2">
          <div
            class="flex justify-between items-center border-b border-outline p-2 text-on-surface"
          >
            <button
              class="rounded-full w-6 h-6 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary"
              @click="prevMonth"
            >
              <Icon name="mdi:chevron-left" size="18" />
            </button>
            <span class="text-sm">{{
              formatDate(currentDate, "MMMM yyyy")
            }}</span>
            <button
              class="rounded-full w-6 h-6 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary"
              @click="nextMonth"
            >
              <Icon name="mdi:chevron-right" size="18" />
            </button>
          </div>
          <div class="weekdays-grid text-primary">
            <div v-for="day in weekdays" :key="day" class="text-center text-xs">
              {{ day }}
            </div>
          </div>
          <div class="days-grid px-2 pb-2">
            <div
              v-for="(day, index) in daysInCurrentMonthWithPadding"
              :key="index"
              class="day text-center text-xs text-on-surface flex items-center justify-center"
              :class="{
                'font-semibold': isToday(day.date),
                'padding-day': day.isPadding,
                selected: isSelected(day.date) && !day.isPadding,

                'rounded-l-full': isStartOfWeek(day.date),
                'rounded-r-full': isEndOfWeek(day.date),
                'rounded-full': isSelected(day.date),
              }"
              @click="!day.isPadding && selectDate(day.date)"
            >
              <span
                :class="{
                  '!font-bold body-md text-primary absolute':
                    isToday(day.date) &&
                    !day.isPadding &&
                    !isSelected(day.date),
                }"
              >
                {{ day.date.getDate() }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  id?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type?: string;
  error?: string;
}>();

// Utility to get all days in a month, including padding days
const getDaysInMonthWithPadding = (
  date: Date
): { date: Date; isPadding: boolean }[] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const days = [];
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Get the first and last days of the week for padding
  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // 0 is Sunday, 6 is Saturday
  const endDayOfWeek = (lastDayOfMonth.getDay() + 6) % 7; // 0 is Sunday, 6 is Saturday

  // Add padding days from previous month
  if (startDayOfWeek > 0) {
    const previousMonthLastDay = new Date(year, month, 0);
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const paddingDate = new Date(
        previousMonthLastDay.getFullYear(),
        previousMonthLastDay.getMonth(),
        previousMonthLastDay.getDate() - i
      );
      days.push({ date: paddingDate, isPadding: true });
    }
  }

  // Add days of the current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push({ date: new Date(year, month, i), isPadding: false });
  }

  // Add padding days for next month
  if (endDayOfWeek < 6) {
    for (let i = 1; i <= 6 - endDayOfWeek; i++) {
      const paddingDate = new Date(year, month + 1, i);
      days.push({ date: paddingDate, isPadding: true });
    }
  }

  return days;
};

const normalizeDate = (date: Date, locale = "en-CA") => {
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

function isValidDate(dateString) {
  // Regular expression to check the format DD.MM.YYYY
  const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

  // Test if the input matches the format
  if (!regex.test(dateString)) {
    return false;
  }

  // Split the date into components (day, month, year)
  const [day, month, year] = dateString.split(".").map(Number);

  // Create a JavaScript Date object (months are zero-based in JS, so subtract 1 from the month)
  const date = new Date(year, month - 1, day);

  // Check if the Date object is valid
  return !(
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  );
}

const cleanupDate = (date: string) => {
  // Remove all non-numeric characters except dots
  let cleaned = date.replace(/[^0-9.]/g, "");

  // Automatically add dots at the right positions
  if (cleaned.length > 2 && cleaned[2] !== ".") {
    cleaned = cleaned.slice(0, 2) + "." + cleaned.slice(2);
  }
  if (cleaned.length > 5 && cleaned[5] !== ".") {
    cleaned = cleaned.slice(0, 5) + "." + cleaned.slice(5);
  }

  // Set the formatted value back to the input
  displayDate.value = cleaned.substring(0, 10); // Max length DD.MM.YYYY

  if (cleaned === "") {
    model.value = "";
    return;
  }

  if (isValidDate(cleaned.substring(0, 10))) {
    /*     model.value = normalizeDate(date);
  displayDate.value = normalizeDate(date, "de-DE");
  selectedDate.value = date; */
    const _date = new Date(
      cleaned.substring(0, 10).split(".").reverse().join("-")
    );
    model.value = normalizeDate(_date);
    selectDate(_date, false);
  }
};

// Utility to format dates
const formatDate = (date: Date, format: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  if (format === "MMMM yyyy") {
    options.month = "long";
    options.year = "numeric";
  }
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

// Functions to check start and end of the week
const isStartOfWeek = (date: Date) => {
  return date.getDay() === 1;
};

const isEndOfWeek = (date: Date) => {
  return date.getDay() === 0;
};

// Reactive states
const datePicker = ref<HTMLElement | null>(null);
const showDatePicker = ref(false);
const currentDate = ref(new Date());
const nextMonthDate = ref(
  new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
);
const selectedDate = ref<Date | null>(null);
const model = defineModel<string>({
  default: "",
  get: (value) => {
    return normalizeDate(new Date(value), "de-DE");
  },
  set: (value) => {
    return normalizeDate(new Date(value));
  },
});
const displayDate = ref(model.value || "");

// Weekday labels, starting with Monday
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Derived states for days in current and next month with padding
const daysInCurrentMonthWithPadding = ref(
  getDaysInMonthWithPadding(currentDate.value)
);
const daysInNextMonthWithPadding = ref(
  getDaysInMonthWithPadding(nextMonthDate.value)
);

// Function to change to the previous month
const prevMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
  nextMonthDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
  daysInCurrentMonthWithPadding.value = getDaysInMonthWithPadding(
    currentDate.value
  );
  daysInNextMonthWithPadding.value = getDaysInMonthWithPadding(
    nextMonthDate.value
  );
};

// Function to change to the next month
const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
  nextMonthDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
  daysInCurrentMonthWithPadding.value = getDaysInMonthWithPadding(
    currentDate.value
  );
  daysInNextMonthWithPadding.value = getDaysInMonthWithPadding(
    nextMonthDate.value
  );
};

// Function to handle date selection
const selectDate = (date: Date, closeDatePicker = true) => {
  model.value = normalizeDate(date);
  displayDate.value = normalizeDate(date, "de-DE");
  selectedDate.value = date;
  if (closeDatePicker) showDatePicker.value = false;
};

// Helper functions to determine if a day is selected or within the selected range
const isSelected = (date: Date) => {
  return selectedDate.value && date.getTime() === selectedDate.value.getTime();
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Handle date picker closing on blur
// onClickOutside(datePicker, () => {
//   showDatePicker.value = false;
// });

// Clear input field and reset date range
const clearInput = () => {
  displayDate.value = "";
  model.value = "";
};

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.9);
}


.date-picker {
  position: relative;
}

.datepicker-wrapper {
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  @apply border border-outline-variant
}

.month-container {
  display: flex;
}

.month {
  width: 240px;
}

.weekdays-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 10px;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  width: 32px;
  height: 32px;
}

.day.selected {
  @apply bg-blue-500/10 text-on-primary;
  isolation: isolate;
  position: relative;

}

.day.selected::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  z-index: -1;
  width: 32px;
  height: 32px;
  @apply bg-primary

}

.day.start-of-week {
  border-left: 2px solid #007bff;
}

.day.end-of-week {
  border-right: 2px solid #007bff;
}

.padding-day {
  opacity: 1;
  background-color: transparent;
  user-select: none;
  @apply text-tertiary-light

}

.day:hover:not(.padding-day):not(.selected) {
  cursor: pointer;
  border-radius: 9999px;
  @apply bg-surface-container-highest
}
</style>
