import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Account } from '../../../../admin/interfaces/account.interface';
import { AlertService } from '../../../../core/services/alert.service';
import { CloudinaryService } from '../../../../core/services/cloudinary.service';
import { AuthService } from '../../../../core/services/auth.service';
import { AccountService } from '../../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements AfterViewInit {
  readonly defaultPhotoUrl =
    'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg';
  account: Account = this.authService.authAccount;
  @ViewChild('photo') photo!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly accountService: AccountService
  ) {}

  get photoStyle() {
    const src = this.account.photo || this.defaultPhotoUrl;
    return {
      'background-image': `url(${src})`,
    };
  }

  get fullName() {
    if (!this.account) return;
    const { name, surname } = this.account;
    return `${name} ${surname}`;
  }

  ngAfterViewInit(): void {
    this.setListenersForHoverPhoto();
  }

  setListenersForHoverPhoto() {
    this.photo.nativeElement.addEventListener('mouseenter', () => {
      this.photo.nativeElement.innerText = 'CAMBIAR FOTO';
    });
    this.photo.nativeElement.addEventListener('mouseout', () => {
      this.photo.nativeElement.innerText = '';
    });
  }

  uploadAccountPhoto() {
    const { files } = this.fileInput.nativeElement;
    if (!files?.length) return;
    Swal.fire({
      title: 'Subiendo...',
      text: 'Por favor, espere...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const file = files[0];
    this.cloudinaryService.uploadFile(file).subscribe({
      next: (url) => {
        firstValueFrom(this.accountService.updateAccount({ photo: url })).then(
          () => {
            Swal.close();
            this.account.photo = url;
            this.alertService.success({
              title: 'Foto de perfil actualizada con éxito',
            });
          }
        );
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          this.alertService.error(uploadPhotoErrors[err.status]);
        }
      },
    });
  }

  removeAccountPhoto() {
    firstValueFrom(this.accountService.updateAccount({ photo: '' })).then(
      () => {
        this.account.photo = '';
        this.alertService.success({ title: 'Foto de perfil eliminada' });
      }
    );
  }
}

const uploadPhotoErrors = {
  400: {
    title: 'Error al subir foto',
    text: 'No se pudo subir la foto seleccionada, asegúrate que sea de formato JPG o PNG',
  },
};
