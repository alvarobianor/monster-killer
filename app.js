new Vue({
  el: "#app",
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    sword: "Targarian",
    logs: [],
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
      this.logs = [];
    },
    attack() {
      let min = 5,
        max = 10;
      if (this.sword === "Artix Blade") {
        min = 10;
        max = 15;
      }
      const damage = this.hurt(min, max);
      this.monsterLife = Math.max(this.monsterLife - damage, 0);
      this.generateLogsDamage("player", damage);
      this.monsterAttack();
    },
    monsterAttack() {
      const damage = this.hurt(7, 12);
      this.playerLife = Math.max(this.playerLife - damage, 0);
      this.generateLogsDamage("monster", damage);
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
    },
    heal() {
      const heal = parseInt(this.randomValue(10, 15));
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.generateLogsHeal(heal);
      this.monsterAttack();
    },
    generateLogsDamage(type, damage) {
      const playerDamage = `${type} uses your ${this.sword} and causes ${damage} of damage`;
      const monsterDamage = `${type} uses ROAAAR and causes ${damage} of damage`;
      if (type === "player")
        this.logs.unshift({ text: playerDamage, cls: type });
      else this.logs.unshift({ text: monsterDamage, cls: "monster" });
      console.log(this.logs);
    },
    generateLogsHeal(heal) {
      this.logs.unshift({
        text: `Player uses one potion and heals ${heal} of HP`,
        cls: "player",
      });
    },
  },
  watch: {
    hasResult(result) {
      if (result) this.running = false;
    },
  },
});
