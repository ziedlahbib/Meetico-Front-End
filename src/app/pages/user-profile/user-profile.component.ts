import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  focus: boolean;
  user: User;
  age: number;
  address: string[];
  disabled = true;
  constructor(private tokenService: TokenService, private userService: UserService) { }
  ngOnInit() {
    this.user = this.tokenService.getUser();
    this.address = this.tokenService.getUser().address.split(", ", 3);
  }
  uploadPicture(event) {
    let formData = new FormData();
    this.user.picture = event.target.files.item(0);
    formData.append('file', this.user.picture);
    this.userService.assignPictureToUser(this.user.userId, formData).subscribe(
      user => {
        this.tokenService.saveUser(user);
        window.location.reload();
      }
    );
  }
  editProfile() {
   this.disabled = false;
  }
  updateProfile() {
    this.userService.updateProfile(this.user.userId, this.user).subscribe(
      user => {
        this.tokenService.saveUser(user);
        window.location.reload();
      }
    );
  }
}
