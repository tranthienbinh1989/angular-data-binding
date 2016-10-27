import { Component, Input } from '@angular/core';
import { Product }    from '../product/product';
import { Router } from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import { ProductService } from '../product/product.service';
import { IAlert } from '../ialert';

@Component({
  moduleId: module.id,
  selector: 'product-form',
  templateUrl: 'product-form.component.html'
})
export class ProductFormComponent {
  @Input()
  public alerts: Array<IAlert> = []; 

  title = "Add new product";
  filesToUpload: Array<File>;
  edit: boolean;
  updateSuccess:boolean;
  constructor(
      private productService: ProductService,
      private router: Router,
      private route: ActivatedRoute,
  ) {
        this.filesToUpload = [];
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.edit = false;
      this.updateSuccess = false;
      if (id) {
           this.title = "Product detail";
           this.edit = true;
           this.productService.getProduct(id)
                .then(product => this.model = product);
      }
    });
  }

  fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  model = new Product();
  onSubmit(form: any) {
      if(!this.edit) {
        this.makeFileRequest("http://localhost:3000/api/products/upload", this.filesToUpload, "POST").then((result: any) => {
            console.log(result);
            let link = ['/products', result._id];
            this.router.navigate(link);
        }, (error) => {
            console.error(error);
        });
      } else {
          this.makeFileRequest("http://localhost:3000/api/products/" + this.model._id, this.filesToUpload, "PUT").then((result: any) => {
                console.log(result);
                this.model = result;
                this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Update successful',
                });
            }, (error) => {
                console.error(error);
            });
      }

  }

  active = true;  
  newProduct() {
    this.model = new Product();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }

  makeFileRequest(url: string, files: Array<File>, method: string) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            formData.append("name", this.model.name);
            formData.append("price", this.model.price ? this.model.price : 0);
            formData.append("description", this.model.description ? this.model.description : '');
            var xhr = new XMLHttpRequest();
            if (files.length > 0) {
                formData.append("image", files[0], files[0].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open(method, url, true);
            xhr.send(formData);
        });
    }
    
    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
