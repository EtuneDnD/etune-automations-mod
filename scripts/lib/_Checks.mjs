export class Checks {
  static _checkActorNameExists(actor5e) {
    if (
      game.actors.find(
        (e) => e.name.toLowerCase() === actor5e.name.toLowerCase()
      ) !== undefined
    ) {
      ui.notifications.info(
        `El nombre ${actor5e.name.toUpperCase()} ya está elegido por otro usuario`
      );
      return false;
    }
    if (!/^[a-zA-Z]+$/.test(actor5e.name) || actor5e.name.icludes(" ")) {
      ui.notifications.info(
        `Elige un nombre que solo contenga una palabra y letras`
      );
      return false;
    }
    if (actor5e.name.length > 100) {
      ui.notifications.info(`Elige un nombre más corto.`);
      return false;
    }
  }
}

Hooks.on("preCreateActor", Checks._checkActorNameExists);
