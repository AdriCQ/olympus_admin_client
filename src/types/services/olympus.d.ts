import { DBModel } from 'src/types';
export namespace IOlympusService
{
  interface CheckForUpdatesResponse
  {
    info: {
      version: number;
      roadmap: string[];
      created_at: string;
      updated_at: string;
    };
    download_url: string;
  }
  /**
   * Application
   */
  interface Application extends DBModel
  {
    title: string;
    owner_id: number;
    version: number;
    min_required_version: number;
    update_required: boolean;
    roadmap: string[];
    daily_visits: number;
  }
}