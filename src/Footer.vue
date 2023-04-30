<template>
<footer class="items-center footer text-neutral-content h-1/10">
  <div class="items-center grid-flow-col">
    <img src="/logo.png" width="50" height="50" alt="logo">
    <p>
      <span>The Treacherous Turn © 2023. </span>
      <span>
        <a class="link text-neutral-content hover:text-white" href="https://github.com/AI-Safety-Camp-Tabletop-RPG/companion-app/issues/new?labels=bug&title=New+bug+report&body=Describe+the+problem." target="_blank">Submit bug</a> / 
        <a class="link text-neutral-content hover:text-white" href="https://github.com/AI-Safety-Camp-Tabletop-RPG/companion-app/issues/new?labels=bug&title=Feature+request" target="_blank">Request feature</a>
      </span>
    </p>
  </div>
  <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <a href="https://itch.io/profile/thetreacherousturn" target="_blank" rel="noopener noreferrer" class="text-3xl text-neutral-content hover:text-white">
      <font-awesome-icon :icon="['fab', 'itch-io']" />
    </a>
    <a href="https://www.twitch.tv/thetreacherousturn" target="_blank" rel="noopener noreferrer" class="text-3xl text-neutral-content hover:text-white">
      <font-awesome-icon :icon="['fab', 'twitch']" />
    </a>
    <a href="https://www.reddit.com/r/thetreacherousturn/" target="_blank" rel="noopener noreferrer" class="text-3xl text-neutral-content hover:text-white">
      <font-awesome-icon :icon="['fab', 'reddit']" />
    </a>
    <a href="https://twitter.com/treacherousturn" target="_blank" rel="noopener noreferrer" class="text-3xl text-neutral-content hover:text-white">
      <font-awesome-icon :icon="['fab', 'twitter']" />
    </a>
  </div>
</footer>
</template>