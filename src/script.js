import { TallerModel } from './model/tallerModel.js';
import { TallerView } from './view/tallerView.js';
import { TallerController } from './controller/tallerController.js';

//Para que funcione correctamente es mejor usar la extension liveServer para evitar errores de deteccion de archivos

document.addEventListener('DOMContentLoaded', () => {
  const model = new TallerModel();
  const view = new TallerView();
  const controller = new TallerController(model, view);
  controller.refrescarTabla();
});
