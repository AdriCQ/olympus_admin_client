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
}