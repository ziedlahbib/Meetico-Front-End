import { Component, OnInit, Inject, Input, Type } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { User } from "src/app/_models/user";
import { TokenService } from "src/app/_services/token.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>`;
  connectedUser: User;
  index: number = 1;
  users: User[];
  focus: boolean;
  input: string;
  age: number;
  me: boolean;
  followed: boolean;
  completion
  constructor(private tokenService: TokenService, private userService: UserService, private matDialog: MatDialog, private modalService: NgbModal) { }
  ngOnInit() {
    this.connectedUser = this.tokenService.getUser();
    this.userService.retrieveAllUsers().subscribe(users => this.users = users);
  }
  getAge(date: Date): number {
    return moment().diff(date, 'years');
  }
  openDialog(selectedUser: User) {
    this.age = this.getAge(selectedUser.birthday);
    if (this.connectedUser.userId == selectedUser.userId) this.me = !this.me;
    for (let i = 0; i < selectedUser.followers.length; i++) {
      if (this.connectedUser.userId == selectedUser.followers[i].userId) this.followed = !this.followed;
    }
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      connectedUser: this.connectedUser,
      selectedUser: selectedUser,
      age: this.age,
      me: this.me,
      followed: this.followed
    };
    dialogConfig.position = {
      top: '50px',
      left: '50px'
    };
    let dialogRef = this.matDialog.open(UserDetailsDialog, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data.me) this.me = !this.me;
        if (data.followed) this.followed = !this.followed;
        if (data.clicked) window.location.reload();
      }
    );
  }
  removeUser(selectedUser) {
    this.userService.removeUser(selectedUser.userId).subscribe(selectedUser => window.location.reload());
  }
  searchForUsers(event) {
    this.userService.searchForUsers(event.target.value).subscribe(users => this.users = users);
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  open(name: string) {
    this.modalService.open(MODALS[name]);
  }
}

@Component({
  selector: 'app-user-details-dialog',
  template: `<div class="col-xl-4" style="margin-left: 30em;">
  <div class="card card-profile shadow">
      <div class="row   justify-content-center">
          <div class="col-lg-3 order-lg-2">
              <label class="card-profile-image btn btn-bwm">
                  <img src="{{ selectedUser.picture ? selectedUser.picture : 'assets/upload/default.jpg'}}"
                      class="rounded-circle" style="margin-left: 5px;">
              </label>
          </div>
      </div>
      <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div class="d-flex justify-content-between">
              <a [hidden]="followed? true : false || me? true : false" class="btn btn-sm btn-info" (click)="followUser(selectedUser)">Follow</a>
              <a [hidden]="followed? false : true" class="btn btn-sm btn-danger" (click)="unfollowUser(selectedUser)">Unfollow</a>
              <a [hidden]="me? true : false" class="btn btn-sm btn-success">Message</a>
          </div>
      </div>
      <div class="card-body pt-0 pt-md-4">
          <div class="row">
              <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                          <span class="heading">22</span>
                          <span class="description">Friends</span>
                      </div>
                      <div>
                          <span class="heading">10</span>
                          <span class="description">Photos</span>
                      </div>
                      <div>
                          <span class="heading">89</span>
                          <span class="description">Comments</span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="text-center">
              <h3>
                  {{ selectedUser.firstName + ' ' + selectedUser.lastName }}
                  <span class="font-weight-light">, {{ age }}</span>
              </h3>
              <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{ selectedUser.address }}
              </div>
              <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
              </div>
              <div>
                  <i class="ni education_hat mr-2"></i>University of Computer Science
              </div>
              <hr class="my-4" />
              <p>***************************************************</p>
              <button class="mat-raised-button bg-warning" (click)="closeDialog()">Close</button>
          </div>
      </div>
  </div>
</div>`
})

export class UserDetailsDialog implements OnInit {
  connectedUser: User;
  selectedUser: User;
  age: number;
  me: boolean;
  followed: boolean;
  clicked: boolean;
  constructor(private dialogRef: MatDialogRef<UserDetailsDialog>, @Inject(MAT_DIALOG_DATA) data, private userService: UserService, private formBuilder: FormBuilder) {
    this.connectedUser = data.connectedUser;
    this.selectedUser = data.selectedUser;
    this.age = data.age;
    this.me = data.me;
    this.followed = data.followed;
  }
  ngOnInit(): void {
    document.getElementById(this.dialogRef.id).style.cssText = `background: transparent; box-shadow: none; overflow: visible !important;`;
  }
  followUser(selectedUser: User): void {
    this.userService.followUser(this.connectedUser.userId, selectedUser.userId).subscribe(
      data => {
        this.followed = !this.followed;
        this.clicked = !this.clicked;
      }
    );
  }
  unfollowUser(selectedUser: User): void {
    this.userService.unfollowUser(this.connectedUser.userId, selectedUser.userId).subscribe(
      data => {
        this.followed = !this.followed;
        this.clicked = !this.clicked;
      }
    );
  }
  closeDialog() {
    this.dialogRef.close(
      this.formBuilder.group(
        {
          me: this.me,
          followed: this.followed,
          clicked: this.clicked
        }
      ).value
    )
  }
}

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="btn-close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
  
};
