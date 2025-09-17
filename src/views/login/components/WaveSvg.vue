<template>
  <div class="svg">
    <svg
      class="waves"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="0"
          fill="rgba(255,255,255,0.8"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="1"
          fill="rgba(255,255,255,0.7"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="2"
          fill="rgba(255,255,255,0.6)"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="3"
          fill="rgba(255,255,255,0.5)"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="4"
          fill="rgba(255,255,255,0.4)"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="5"
          fill="rgba(255,255,255,0.3)"
        />
        <use
          xlink:href="#gentle-wave"
          x="48"
          y="6"
          fill="rgba(255,255,255,0.2)"
        />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #05bd8e;
}

.waves {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px;
  /** Fix for safari gap */
  min-height: 200px;
  max-height: 300px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/** Animation */
.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

.parallax > use:nth-child(5) {
  animation-delay: -6s;
  animation-duration: 25s;
}

.parallax > use:nth-child(6) {
  animation-delay: -7s;
  animation-duration: 30s;
}

.parallax > use:nth-child(7) {
  animation-delay: -8s;
  animation-duration: 3s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}

/** Shrinking for mobile */
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }

  .content {
    height: 30vh;
  }
}
</style>
