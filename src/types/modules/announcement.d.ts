export namespace IAnnouncement
{
  interface Announcement extends CreateRequest
  {
    id: number;
    active: boolean;
    created_at?: string;
    updated_at?: string;
  }

  interface CreateRequest
  {
    type: Type;
    title?: string;
    text?: string;
    link?: string;
    icon?: string;
    html?: string;
  }

  interface UpdateRequest extends CreateRequest
  {
    announcement_id: number;
    active?: boolean;
  }

  type Type = 'info';
}