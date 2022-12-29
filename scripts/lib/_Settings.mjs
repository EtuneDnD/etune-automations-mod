import { EtuneAutomations } from "./_EtuneAutomations.mjs";
export class Settings {
  static SETTINGS = {
    SERVER_URL: "server-url",
  };

  static initialize() {
    game.settings.register(EtuneAutomations.ID, Settings.SETTINGS.SERVER_URL, {
      name: "Rest Server Url",
      default: "http://etune-bot.duckdns.org:8000",
      // default: "http://localhost:8000",
      type: String,
      scope: "world",
      config: true,
      hint: "Rest Server Url that will be used to perform automations tasks.",
    });
  }
}

Hooks.once("init", Settings.initialize);
