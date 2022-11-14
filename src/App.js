const MissionUtils = require("@woowacourse/mission-utils");
const { MESSAGE } = require("./lib/constants");
const User = require("./User");
const Lotto = require("./Lotto");

class App {
  constructor() {
    this.user = new User();
  }

  play() {
    this.purchase();
  }

  exit() {
    MissionUtils.Console.close();
  }

  purchase() {
    this.user.readAmount(MESSAGE.AMOUNT, (amount) => {
      this.user.lottoList = Lotto.purchase(amount);
      this.printMessage("");
      this.printPurchaseResult();
    });
  }

  printPurchaseResult() {
    this.printMessage(MESSAGE.PURCHASE(this.user.lottoList.length));

    this.user.lottoList.forEach((lotto) => {
      this.printMessage(JSON.stringify(lotto.numbers).replaceAll(",", ", "));
    });
  }

  printMessage(message) {
    MissionUtils.Console.print(message);
  }
}

const app = new App();
app.play();

module.exports = App;
