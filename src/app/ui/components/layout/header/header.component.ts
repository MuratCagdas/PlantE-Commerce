import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor (
    public identityservice: IdentityService
  ) {
    identityservice.TokenCheck();
  }
  ngOnInit(): void {
    this.identityservice.identityCheck();
  }

  logout() {
    this.identityservice.LogOut();
  }
}
