import { Vue, Component, Watch } from 'vue-property-decorator';
import { UserStore } from 'src/store/modules';
import { IRoute } from 'src/types';

@Component
export class AppMixin extends Vue
{
  get isLogged ()
  {
    return UserStore.isLogged;
  }

  get userName ()
  {
    return UserStore.userName;
  }

  @Watch('isLogged')
  onLoggedChange (_logged: boolean)
  {
    if (!_logged)
    {
      void this.$router.push({
        name: 'auth.login'
      })
    }
  }

  goTo (_route: IRoute)
  {
    if (this.$route.name !== _route.name)
    {
      void this.$router.push(_route);
    }
  }

  scrollTop ()
  {
    document.scrollingElement?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}