import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';

declare var iziToast;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']

})
export class AccountComponent implements OnInit {

  user: User;
  isLoading = true;

  constructor(
    public auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.auth.currentUser).subscribe(
      data => this.user = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  save(user: User): void {
    this.userService.editUser(user).subscribe(
      res => {
        iziToast.success({ message: 'Account settings saved.' });
        this.auth.currentUser = user;
        this.auth.isAdmin = user.role === 'admin';
      },
      error => console.log(error)
    );
  }

}
