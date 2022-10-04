<script setup lang="ts">
import { Profile } from '@common/interfaces/profile.interface';
import { useDateFormat } from '@vueuse/core';
import { computed } from 'vue';



import UserIcon from '@svg/UserIcon.vue';

const props = defineProps<{
  profile: Profile;
}>();

const quotes = [
  'Life isn\'t about finding yourself. Life is about creating yourself',
  'Start where you are. Use what you have. Do what you can',
  'Aim for the moon. If you miss, you may hit a star',
  'It always seems impossible until it\'s done',
  'What you do today can improve all your tomorrows',
  'There is only one corner of the universe you can be certain of improving, and that\'s your own self',
  'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time',
  'It does not matter how slowly you go as long as you do not stop',
  'The secret of getting ahead is getting started',
  'No bird soars too high if he soars with his own wings',
  'The past cannot be changed. The future is yet in your power',
  'In order to succeed, we must first believe that we can',
  'What you get by achieving your goals is not as important as what you become by achieving your goals',
  'Be kind whenever possible. It is always possible',
  'Problems are not stop signs, they are guidelines',
  'Change your life today. Don\'t gamble on the future, act now, without delay',
  'You can\'t cross the sea merely by standing and staring at the water',
  'You are never too old to set another goal or to dream a new dream',
  'Perseverance is not a long race; it is many short races one after the other',
  'Hitch your wagon to a star',
  'Always do your best. What you plant now, you will harvest later',
  'Don\'t watch the clock; do what it does. Keep going',
  'Set your goals high, and don\'t stop till you get there',
  'We may encounter many defeats but we must not be defeated',
  'Keep your eyes on the stars, and your feet on the ground',
  'Knowing is not enough; we must apply. Willing is not enough; we must do',
  'If you fell down yesterday, stand up today',
  'With the new day comes new strength and new thoughts',
  'A somebody was once a nobody who wanted to and did',
  'Act as if what you do makes a difference. It does',
  'Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better',
  'Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence',
  'Good, better, best. Never let it rest. \'Til your good is better and your better is best',
  'Life is 10% what happens to you and 90% how you react to it',
  'When something is important enough, you do it even if the odds are not in your favor',
];

const quote = computed(() => quotes[Math.floor(Math.random() * quotes.length)]);

const createdAtFormatted = useDateFormat(props.profile.createdAt, 'YYYY-MM-DD');
</script>

<template>
  <div class="w-full pb-10 mx-auto md:w-1/2">
    <div
      class="flex flex-col gap-6 p-10 bg-white border-t-4 rounded-md shadow-md dark:bg-slate-700 border-t-sky-400"
    >
      <header class="text-2xl text-slate-500 dark:text-slate-400">
        <h1>Profile</h1>
      </header>
      <div
        class="relative flex flex-col items-center justify-center h-auto rounded-md shadow-md text-slate-100 bg-slate-700 dark:bg-slate-100"
      >
        <p
          class="px-10 py-16 text-lg text-center dark:text-slate-900 lg:text-xl xl:text-2xl"
        >
          {{ quote }} ❤️
        </p>
        <UserIcon
          class="absolute bottom-0 w-24 -mb-10 rounded-full bg-slate-700"
        />
      </div>
      <div class="flex flex-col gap-2 mt-6 text-center">
        <h2 class="text-2xl">
          {{ profile.name }}
        </h2>
        <p class="text-slate-400">
          <strong>{{ profile.pictures }}</strong> pictures in
          <strong>{{ profile.galleries }}</strong> galleries
        </p>
      </div>
      <p class="text-sm text-center text-slate-400">
        Member since {{ createdAtFormatted }}
      </p>
    </div>
  </div>
</template>
