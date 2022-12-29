import { EtuneAutomations } from "./_EtuneAutomations.mjs";
import { Settings } from "./_Settings.mjs";

export class TriggerPush {
  static async pushActorChange(actor5e) {
    const serverUrl = game.settings.get(
      EtuneAutomations.ID,
      Settings.SETTINGS.SERVER_URL
    );

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      actor_json: JSON.stringify(actor5e),
      level: actor5e.system.details.level,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(`${serverUrl}/actor/${actor5e.name}`, requestOptions);
  }
}

Hooks.on("updateActor", TriggerPush.pushActorChange);
