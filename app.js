new Vue({
  el: "#app",
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    sword: "basic",
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
      let min = 5,
        max = 10;
      if (this.sword === "up") {
        min = 10;
        max = 15;
      }
      this.monsterLife = Math.max(this.monsterLife - this.hurt(min, max), 0);
      this.monsterAttack();
    },
    monsterAttack() {
      this.playerLife = Math.max(this.playerLife - this.hurt(7, 12), 0);
    },
    // especialAttack() {
    //   this.monsterLife = Math.max(this.monsterLife - this.hurt(5, 10, true), 0);
    //   this.playerLife = Math.max(this.playerLife - this.hurt(7, 12, false), 0);
    // },
    hurt(min, max) {
      return this.randomValue(min, max);
    },
    randomValue(min, max) {
      return (Math.random() * (max - min) + min).toFixed(0);
    },
    changeSword(value) {
      this.sword = value;
      console.log(this.sword);
    },
    heal() {
      this.playerLife += parseInt(this.randomValue(10, 15));
      if (this.playerLife > 100) this.playerLife = 100;
      this.monsterAttack();
    },
  },
  watch: {
    hasResult(result) {
      if (result) this.running = false;
    },
  },
});
