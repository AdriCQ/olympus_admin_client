import { VuexModule, Module, Action, Mutation } from 'vuex-class-modules';
import { storeInstance } from 'src/store';
import { IAnnouncement } from 'src/types';
import { OlympusService, ServiceProvider } from 'src/services';

@Module({ generateMutationSetters: true })
class AnnouncementModule extends VuexModule
{
  _announcements: IAnnouncement.Announcement[] = [];
  _announcement: IAnnouncement.Announcement | null = null;

  get announcements ()
  {
    return this._announcements
  }

  get announcement ()
  {
    return this._announcement;
  }

  /**
   * Actions create announcement module
   * @returns  
   */
  @Action
  createAction (_p: IAnnouncement.CreateRequest): Promise<IAnnouncement.Announcement>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(OlympusService.createAnnouncement(_p), (_resp: IAnnouncement.Announcement) =>
      {
        this._announcement = _resp;
        _resolve(_resp);
      }).catch(_error => _reject(_error));
    })
  }

  /**
   * Actions list announcement module
   * @returns  
   */
  @Action
  listAction (): Promise<IAnnouncement.Announcement[]>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(OlympusService.listAnnouncements(), (_resp: IAnnouncement.Announcement[]) =>
      {
        this._announcements = _resp;
        _resolve(_resp);
      }).catch(_error => _reject(_error));
    })
  }

  /**
  * Actions remove announcement module
  * @returns  
  */
  @Action
  removeAction (_p: number): Promise<boolean>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(OlympusService.removeAnnouncement(_p), (_resp: boolean) =>
      {
        _resolve(_resp);
      }).catch(_error => _reject(_error));
    })
  }

  /**
 * Actions update announcement module
 * @returns  
 */
  @Action
  updateAction (_p: IAnnouncement.UpdateRequest): Promise<IAnnouncement.Announcement>
  {
    return new Promise((_resolve, _reject) =>
    {
      void ServiceProvider.callableService(OlympusService.updateAnnouncement(_p), (_resp: IAnnouncement.Announcement) =>
      {
        this._announcement = _resp;
        _resolve(_resp);
      }).catch(_error => _reject(_error));
    })
  }

  @Mutation
  setAnnouncementById (_params: { id: number; ann: IAnnouncement.Announcement })
  {
    const index = this._announcements.findIndex((p =>
    {
      return p.id === _params.id;
    }));
    this._announcements[index] = _params.ann;
  }
}
// register module (could be in any file)
export const AnnouncementStore = new AnnouncementModule({ store: storeInstance, name: 'Announcement' });