import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from 'src/model/account';
import { AuthenticationService } from 'src/services/authentication.service';
import { ProgressWebsocketService } from 'src/services/progress.websocket.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'clinicappfront';
  public progress: any = {};
  

  constructor(private router : Router) { }

  ngOnInit(): void {
   /* const id_token = localStorage.getItem('currentUser');
   if (id_token === null || id_token === undefined) {
    this.router.navigateByUrl('');
   } else {
    this.router.navigateByUrl('/acceuil');
   } */
   this.router.navigateByUrl('/acceuil');
   this.initProgressWebSocket();
  }


  /**
   * Subscribe to the client broker.
   * Return the current status of the batch.
   */
   private initProgressWebSocket = () => {
    /*const obs = this.progressWebsocketService.getObservable();

    obs.subscribe({
      next: this.onNewProgressMsg,
      error: err => {
        console.log(err);
      }
    });*/
  }

  /**
   * Apply result of the java server notification to the view.
   */
  private onNewProgressMsg = receivedMsg => {
    if (receivedMsg.type === 'SUCCESS') {
      this.progress = receivedMsg.message;
    }
  }
}
