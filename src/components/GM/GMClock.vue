<script>
import ClockCard from "./ClockCard.vue";
export default {
  data() {
    return {};
  },
  components: {
    ClockCard,
  },
};
</script>

<template>
  <div class="flex flex-col px-[40px] pt-[16px]">
    <div class="flex justify-center items-center space-x-8 self-end">
      <div
        class="border-[1px] border-grey uppercase text-[16px] py-[8px] px-[12px] cursor-pointer"
      >
        Roll all
      </div>
      <div
        class="border-[1px] border-grey uppercase text-[16px] py-[8px] px-[12px] cursor-pointer"
      >
        add clock
      </div>
      <div
        class="w-[30px] h-[31px] bg-[url('/setting.svg')] bg-cover bg-no-repeat cursor-pointer"
      ></div>
    </div>
    <div class="w-full mt-[24px]">
      <ClockCard />
    </div>
  </div>
</template>
