import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created by <b><a href="https://ipactconsult.com/" target="_blank">IPACT Consult inc.</a></b> 2022
    </span>
    <div class="socials">
      <a href="https://gitlab.com/m7532/manazello-admin" target="_blank" class="ion ion-social-github"></a>
    <!--  <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>-->
    </div>
  `,
})
export class FooterComponent {
}
