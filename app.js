new Vue({
  el: "#app",
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
  },
  computed: {
    hasResult() {
      return this.playerLife === 0 || this.monsterLife === 0;
    },
  },
  methods: {
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
    },
    attack() {
      this.monsterLife = Math.max(
        this.monsterLife - this.hurt(5, 10, false),
        0
      );
      this.playerLife = Math.max(this.playerLife - this.hurt(7, 12, false), 0);
    },
    especialAttack() {
      this.monsterLife = Math.max(this.monsterLife - this.hurt(5, 10, true), 0);
      this.playerLife = Math.max(this.playerLife - this.hurt(7, 12, false), 0);
    },
    hurt(min, max, isEspecial) {
      const especial = isEspecial ? 5 : 0;

      return this.randomValue(min + especial, max + especial);
    },
    randomValue(min, max) {
      return (Math.random() * (max - min) + min).toFixed(0);
    },
  },
  watch: {
    hasResult(result) {
      if (result) this.running = false;
    },
  },
});
