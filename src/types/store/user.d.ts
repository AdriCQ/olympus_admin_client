export namespace IUserStore
{
  interface User
  {
    id: number;
    name: string;
    // first_name: string;
    // last_name: string;
    mobile_phone: string;
    address: string;
    created_at?: string;
    updated_at?: string;
  }
}