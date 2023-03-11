import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupplierService} from "../../../services/supplier/supplier.service";
import {Router} from "@angular/router";
import countries from '../../../countries.json';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {Location} from "@angular/common";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'ngx-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  
  supplierForm: FormGroup;
  countries: any [] = [];
  newSupplier;
  positions = NbGlobalPhysicalPosition;
  selectedCountry: String;
  downloadURL: Observable<string>;
  supplierImage = '';
  selectedCurrency;
  userConnected;

  constructor(private supplierService: SupplierService, private formBuilder: FormBuilder,
              private toastrService: NbToastrService, private location: Location,
              private dialogService: NbDialogService, private router: Router,
              private storage: AngularFireStorage) { 
    this.supplierForm = formBuilder.group({
      supplierFirstName: ['', Validators.required],
      supplierLastName: ['', Validators.required],
      supplierEmail: ['', Validators.required],
      supplierPhone: ['', Validators.required],
      supplierCompany: ['', Validators.required],
      supplierCountry: ['', Validators.required],
      supplierCurrency: ['', Validators.required],
      supplierImage: ['']
    })
  }
  
  open2Supp(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog);
  }
  
  goToPreviousRoute(): void {
    this.location.back();
  }
  
  showToast(message, position, status) {
    this.toastrService.show(status || 'Success', message, { position, status });
  }
  
  changeCountry(selectedCountry) {
    this.selectedCountry = selectedCountry;
  }

  selectCurrency(selectedCurrency): void {
    this.selectedCurrency = selectedCurrency;
  }
  
  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `suppliers/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`suppliers/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.supplierImage = url;
            }
            this.supplierForm.value.supplierImage = this.supplierImage;
          });
        })
      )
      .subscribe(url => {
        if (url) {

        }
      });
  }
  
  createNewSupplier(ref): void {
    this.newSupplier = {
      supplierFirstName: this.supplierForm.value.supplierFirstName,
      supplierLastName: this.supplierForm.value.supplierLastName,
      supplierEmail: this.supplierForm.value.supplierEmail,
      supplierPhone: this.supplierForm.value.supplierPhone,
      supplierCompany: this.supplierForm.value.supplierCompany,
      supplierCountry: this.selectedCountry,
      supplierCurrency: this.selectedCurrency,
      supplierImage: this.supplierImage,
      addedBy: this.userConnected
    };
    if (this.supplierImage === '') {
      this.newSupplier.supplierImage = 'https://ucarecdn.com/0529d401-4ffe-473a-a435-bdd9637940f0/default_avatar.png';
    }
    this.supplierService.addNewSupplier(this.newSupplier).subscribe(
      (supplier) => {
        if (supplier === null) {
          this.showToast('Supplier Already Exists' , this.positions.TOP_RIGHT, 'danger');
          ref.close();
        } else {
          ref.close();
          this.showToast('Supplier Created Successfully' , this.positions.TOP_RIGHT, 'success');
          this.supplierForm.reset();
          this.router.navigateByUrl('/pim/suppliers');
        }
      }, error => {
        this.showToast(error , this.positions.TOP_RIGHT, 'danger');
        ref.close();
      }
    )
  }

  ngOnInit(): void {
    this.countries = countries;
    this.userConnected = JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
