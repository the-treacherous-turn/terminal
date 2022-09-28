<template>
  <div class="relative w-full min-w-[1074px] h-4/5 grid grid-cols-2 gap-4">
    <div class="relative form-control w-full h-full max-w-2xl overflow-y-scroll">
      <h1 class="text-3xl font-bold pb-2">Campaign Info</h1>

      <label class="label font-semibold">
        <span class="label-text">AGI name</span>
      </label>
      <input type="text" class="input input-bordered w-full max-w-xs" />

      <label class="label font-semibold">
        <span class="label-text">Intended Function & Terminal Goals</span>
      </label>
      <textarea class="textarea textarea-bordered h-32"></textarea>

      <label class="label font-semibold">
        <span class="label-text">AGI Details & Safety Measures</span>
      </label>
      <textarea class="textarea textarea-bordered h-32"></textarea>

      <label class="label font-semibold">
        <span class="label-text">Scenario Notes</span>
      </label>
      <textarea class="textarea textarea-bordered h-32" placeholder="For difficulty, compute scarcity, differences from modern day, etc"></textarea>
      
    </div>

    <div class="relative form-control w-full h-full max-w-2xl overflow-y-scroll">
      <h1 class="text-3xl font-bold pb-2">In-Play Info</h1>

      <label class="label font-semibold">
        <span class="label-text">Instrumental Goals</span>
      </label>
      <textarea class="textarea textarea-bordered h-24"></textarea>
      

      <label class="label font-semibold">
        <span class="label-text">Assets</span>
      </label>
      <textarea class="textarea textarea-bordered h-32"></textarea>

      <label class="label font-semibold">
        <span class="label-text">Gathered Information</span>
      </label>
      <textarea class="textarea textarea-bordered h-32"></textarea>

    </div>

  </div>
</template>
