import { EtuneAutomations } from "./_EtuneAutomations.mjs";
import { Settings } from "./_Settings.mjs";

export class Rewards {
  static async getRewards(actorSheet5eCharacter) {
    const serverUrl = game.settings.get(
      EtuneAutomations.ID,
      Settings.SETTINGS.SERVER_URL
    );

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    let response = undefined;

    try {
      response = await fetch(
        `${serverUrl}/rewards?character_name=${actorSheet5eCharacter.actor.name}`,
        requestOptions
      );
    } catch (error) {
      ui.notifications.error(
        "Parece que hay un problema con el servidor, contacta con un Administrador de Etune."
      );
    }

    let responseJson = await response.json();

    if (responseJson.status != "no_rewards") {
      const systemData = actorSheet5eCharacter.actor.system;

      let totalXP = systemData.details.xp.value + responseJson.acp_acc;
      let totalTCPs = systemData.currency.tcp + responseJson.tcp_acc;
      let totalCopper = systemData.currency.cp + responseJson.money_acc;

      await actorSheet5eCharacter.actor.update({
        "system.details.xp.value": totalXP,
      });
      await actorSheet5eCharacter.actor.update({
        "system.currency.tcp": totalTCPs,
      });
      await actorSheet5eCharacter.actor.update({
        "system.currency.cp": totalCopper,
      });

      ui.notifications.info(
        `Has obtenido | XP: ${reward.ACPs} | TCPs: ${reward.TCPs} | CPs: ${reward.money}`
      );
    } else {
      ui.notifications.info("No hay recompensas esperándote :(");
    }
  }

  static async _injectRewards(actorSheet5eCharacter, buttons) {
    buttons.unshift({
      label: "Rewards",
      class: "text1",
      icon: "fas fa-gift",
      onclick: async () => {
        await Rewards.getRewards(actorSheet5eCharacter);
      },
    });
  }
}

Hooks.on("getActorSheet5eCharacterHeaderButtons", Rewards._injectRewards);
