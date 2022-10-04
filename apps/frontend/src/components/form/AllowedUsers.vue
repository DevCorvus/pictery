<script setup lang="ts">
import { emailSchema } from '@common/schemas';
import { onMounted, onUnmounted, ref, watch } from 'vue';

import SomethingWentWrong from '@components/SomethingWentWrong.vue';
import SpinnerCircle from '@components/SpinnerCircle.vue';
import { galleryAllowedUsers } from '@services/gallery';
import { getEmail } from '@services/user';

const props = defineProps<{
  galleryId?: string;
}>();

const emit = defineEmits<{
  (e: 'load', data: string[]): void;
  (e: 'change', data: string[]): void;
  (e: 'error'): void;
}>();

const allowedUsers = ref<string[]>([]);

watch(allowedUsers, () => {
  emit('change', allowedUsers.value);
});

const isLoading = ref(false);
const showInput = ref(false);

const myEmail = ref<string | null>(null);
const email = ref('');

const invalidEmailError = ref<null | string>(null);

function addAllowedUser() {
  if (myEmail.value) {
    invalidEmailError.value = null;

    const { success } = emailSchema.safeParse(email.value);

    if (success) {
      if (email.value === myEmail.value) {
        invalidEmailError.value = 'You cannot add your email';
      } else if (allowedUsers.value.includes(email.value)) {
        invalidEmailError.value = 'Email already in the list';
      } else {
        allowedUsers.value = [...allowedUsers.value, email.value];
        email.value = '';
        showInput.value = false;
      }
    } else {
      invalidEmailError.value = 'Invalid email';
    }
  }
}

function removeAllowedUser(emailToRemove: string) {
  allowedUsers.value = allowedUsers.value.filter((email) => {
    return email !== emailToRemove;
  });
}

function cancel() {
  invalidEmailError.value = null;
  email.value = '';
  showInput.value = false;
}

const somethingWentWrongError = ref(false);

onMounted(async () => {
  try {
    somethingWentWrongError.value = false;
    isLoading.value = true;

    const email = await getEmail();
    myEmail.value = email;

    if (props.galleryId) {
      const data = await galleryAllowedUsers(props.galleryId);
      allowedUsers.value = data;
      emit('load', data);
    }
  } catch (error) {
    somethingWentWrongError.value = true;
    emit('error');
  } finally {
    isLoading.value = false;
  }
});

onUnmounted(() => {
  emit('change', []);
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="email" class="label">
      Allowed users <span class="text-sm">(optional)</span>
    </label>
    <SpinnerCircle v-if="isLoading" class="w-6 h-6" />
    <span v-else-if="somethingWentWrongError" class="error">
      Couldn't load previous allowed users
    </span>
    <template v-else>
      <ul
        v-if="allowedUsers.length > 0"
        class="flex flex-col gap-1 p-2 overflow-auto input"
      >
        <li v-for="userEmail in allowedUsers" :key="userEmail">
          <button
            type="button"
            :title="`Remove ${userEmail} from the list`"
            class="transition hover:text-red-500 focus:text-red-500"
            @click="removeAllowedUser(userEmail)"
          >
            {{ userEmail }}
          </button>
        </li>
      </ul>
      <div v-if="showInput" class="flex flex-col gap-2 mt-2">
        <input
          id="email"
          v-model="email"
          type="text"
          placeholder="New allowed user"
          class="p-2 input"
        >
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-2">
            <button
              type="button"
              class="px-2 py-1 transition rounded-md bg-sky-100 dark:bg-sky-900 dark:hover:bg-sky-500 dark:focus:bg-sky-500 text-sky-500 hover:text-white focus:text-white hover:bg-sky-400 focus:bg-sky-400"
              @click="addAllowedUser"
            >
              Add
            </button>
            <button
              data-test="cancelNewAllowedUser"
              type="button"
              class="btn-form-cancel"
              @click="cancel"
            >
              Cancel
            </button>
          </div>
          <span v-if="invalidEmailError" class="error">
            {{ invalidEmailError }}
          </span>
        </div>
      </div>
      <div v-else>
        <button
          data-test="newAllowedUser"
          type="button"
          class="px-2 py-1 transition rounded-md bg-sky-100 dark:bg-sky-900 dark:hover:bg-sky-500 dark:focus:bg-sky-500 text-sky-500 hover:text-white focus:text-white hover:bg-sky-400 focus:bg-sky-400"
          @click="showInput = true"
        >
          New
        </button>
      </div>
    </template>
  </div>
  <SomethingWentWrong :show="somethingWentWrongError" />
</template>
